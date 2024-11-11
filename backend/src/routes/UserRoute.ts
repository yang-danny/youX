
import express from "express";
import userController  from "../controller/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/users", userController.getUsers);
router.get("/:id", userController.getUserDetails);
router.put("/update/:id", userController.updateUser)
router.delete("/:id", userController.deleteUser);
export default router;