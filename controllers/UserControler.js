const UserModel = require("../models/User");
const factory =require("./HandlersFactory")
exports.createUser = async (req, res) => {
  try {
    const newUser = await UserModel.create(req.body);
    res.status(200).json(newUser);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getUsers = async (req, res) => {
  try {
    const Users = await UserModel.find({});
    res.status(200).json(Users);
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getUsersbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findById(id);
    //console.log(user)
    res.status(200).json(user);
  } catch (error) {
    console.log("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.updateuserbyid = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(id, req.body);
    if (!user) {
      return res
        .status(404)
        .json({ message: `cannot find any product with ID ${id}` });
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error update user :", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
// exports.deleteuser = async (req, res) => {
//   try {
//     const { id } = req.params;
//     const user = await UserModel.findByIdAndDelete(id, req.body);
//     res.status(200).json(user);
//   } catch (error) {
//     console.log("Error Update user :", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// };

exports.deleteuser=factory.deleteOne(UserModel);

