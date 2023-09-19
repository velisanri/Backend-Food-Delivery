const userController = require("../controller/userController");
const router = require("express").Router();

router.post("/register",userController.register);
router.post("/login",userController.login);
router.post("/logout",userController.logout);

router.post("/",userController.addUser);
router.get("/",userController.getAllUsers);

router.get("/:id",userController.getSingleUser);
router.put("/:id",userController.updateUser);
router.delete("/:id",userController.deleteUser);

module.exports=router;