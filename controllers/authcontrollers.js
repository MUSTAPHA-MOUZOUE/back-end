const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendVerificationCodeEmail } = require("../utils/emailService");

// Function to generate a random reset token
function generateResetToken() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashPassword = await bcrypt.hash(password, 10);
    const msg = "";

    function getRole() {
      if (email === process.env.ADMIN_EMAIL) {
        return "admin";
      } else if (email === process.env.MODERATOR_EMAIL) {
        return "moderator";
      } else {
        return "user";
      }
    }

    const newUser = await User.create({
      username: username,
      email: email,
      password: hashPassword,
      role: getRole(),
    });

    await sendVerificationCodeEmail(email, msg);

    res
      .status(200)
      .json({ message: "Successfully registered user", user: newUser });
  } catch (error) {
    console.error("Error in register user:", error);
    res.status(500).json({ message: "Error in server" });
  }
};

exports.signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const verificationCode = Math.floor(
      100000 + Math.random() * 900000
    ).toString();
    const msg = `Your verification code is: ${verificationCode}`;
    console.log("Email received for sign-in:", email);

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res
        .status(404)
        .json({ message: "Incorrect email and password combination" });
    }

    await sendVerificationCodeEmail(email, msg);
    user.verificationCode = verificationCode;
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "24h",
      }
    );

    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: token,
      verificationCode: verificationCode,
    });
  } catch (error) {
    console.error("Error in sign-in:", error);
    res.status(500).json({ message: "Error in server" });
  }
};

// Forget Password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "Email not found" });
    }

    const resetToken = generateResetToken();
    user.resetToken = resetToken;
    await user.save();

    const resetLink = `${process.env.BASE_URL}/reset-password?token=${resetToken}`;
    const msg = `Click the following link to reset your password: ${resetLink}`;
    await sendVerificationCodeEmail(email, msg);

    res.status(200).json({ message: "Password reset link sent to your email" });
  } catch (error) {
    console.error("Error in forget password:", error);
    res.status(500).json({ message: "Error in server" });
  }
};

// Reset Password
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({ resetToken: token });

    if (!user) {
      return res.status(400).json({ message: "Invalid reset token" });
    }

    const hashPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashPassword;
    user.resetToken = null;
    await user.save();

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error in reset password:", error);
    res.status(500).json({ message: "Error in server" });
  }
};

exports.logout = (req, res) => {
  res.status(200).json({ message: "Logout successful" });
};

exports.verify = async (req, res) => {
  try {
    const { email, verificationCode } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.verificationCode !== verificationCode) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    res.status(200).json({ message: "Verification successful" });
  } catch (error) {
    console.error("Error in verification:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
