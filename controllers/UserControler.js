const UserModel = require("../models/User");
const factory = require("./HandlersFactory");
const { sendVerificationCodeEmail } = require("../utils/emailService");
const bcrypt = require("bcryptjs");

// Function to generate a random reset token
function generateResetToken() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// Forget Password
exports.forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email });

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
    const user = await UserModel.findOne({ resetToken: token });

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

exports.updateuserbyid = factory.updateOne(UserModel);
exports.deleteuser = factory.deleteOne(UserModel);
exports.getUsersbyid = factory.getOne(UserModel);
exports.createUser = factory.createOne(UserModel);
exports.getUsers = factory.getAll(UserModel);
