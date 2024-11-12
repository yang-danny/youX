import express from "express";
import applicationController from "../controller/ApplicationController";
import {isAuthenticated} from "../middlewares/isAuthenticated";
import {protect} from "../middlewares/authMmiddleware";

const router = express.Router();

router.post("/create",protect, applicationController.create);
router.get("/", protect, applicationController.getAllApplications)
router.get("/user/:id", protect,applicationController.getUserApplications)
router.delete("/:id",protect,applicationController.deleteApplication)
router.get("/:id", protect, applicationController.getApplicationDetails)
router.put("/:id", protect,applicationController.updateApplicationDetails)
export default router;