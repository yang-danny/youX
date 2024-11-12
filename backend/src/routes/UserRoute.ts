
import express from "express";
import userController  from "../controller/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";
import {protect} from "../middlewares/authMmiddleware";
const router = express.Router();

// router.post("/register", userController.signup);
router.post("/signup", userController.signup);
router.post("/login", userController.login);
router.get("/users", protect, userController.getUsers);
router.get("/:id", protect, userController.getUserDetails);
router.put("/update/:id", protect, userController.updateUser)
router.delete("/:id", protect, userController.deleteUser);
export default router;