
import express from "express";
import userController  from "../controller/UserController";
import { isAuthenticated } from "../middlewares/isAuthenticated";

const router = express.Router();

router.post("/signup", userController.signup);
router.post("/login", userController.login)

export default router;