import express from "express";
import applicationController from "../controller/ApplicationController";
import {isAuthenticated} from "../middlewares/isAuthenticated";
const router = express.Router();

// router.post("/create", isAuthenticated, applicationController.create);
router.post("/create", applicationController.create);
router.get("/", applicationController.getAllApplications)
router.get("/user/:id", applicationController.getUserApplications)
router.delete("/:id",applicationController.deleteApplication)
router.get("/:id", applicationController.getApplicationDetails)
router.put("/:id", applicationController.updateApplicationDetails)
export default router;