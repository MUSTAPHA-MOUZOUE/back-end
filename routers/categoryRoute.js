const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryControllers");
const { auth,isAdmin,isModerator } = require("../middlewares/Authmiddlewares");

router.post("/",auth,isAdmin,isModerator, categoryController.CreateCategories);

router.get("/",auth,isAdmin,isModerator, categoryController.getCategories);

router.get("/:id",auth,isAdmin,isModerator, categoryController.getCategoryById);

router.put("/:id",auth,isAdmin,isModerator,categoryController.updateCategory);

router.delete("/:id",auth,isAdmin,isModerator, categoryController.deleteCategory);
//router.post('/logout', auth,role({role : ["admin" | "moderator"] }), logout);
//router.post('/logout',  auth,isAdmin, logout);

module.exports = router;
