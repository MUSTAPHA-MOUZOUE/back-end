const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const registerUser = await User.create({
      name: name,
      email: email,
      password: hashPassword,
    });
    res.status(200).send("succsufly registerUser");
  } catch (error) {
    console.log("error in register user :", error);
    res.status(500).json({ message: "error in server" });
  }
};
exports.signInUser = async (req, res) => {
  const { email, password } = req.body;
  console.log("Email received for sign-in:", email);

  try {
    const user = await User.findOne({ email });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json("email not found");
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    //console.log('Stored hashed password:', user.password);
    //console.log('Password comparison result:', passwordValid);
    if (!passwordValid) {
      return res.status(404).json("Incorrect email and password combination");
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).send({
      id: user._id,
      name: user.name,
      email: user.email,
      token: token,
    });
    return;
  } catch (error) {
    console.log("Error in sign-in:", error);
    res.status(500).json({ message: "Error in server" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};
