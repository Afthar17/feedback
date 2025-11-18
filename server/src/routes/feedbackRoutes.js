import express from "express";
import {
  addFeedback,
  getAllFeedbacks,
  getFeedback,
} from "../controllers/feedbackController.js";
import { hasRole, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/getfeedbacks/latest", protect, getFeedback);
router.get("/getfeedbacks", protect, hasRole(["admin"]), getAllFeedbacks);
router.post("/addfeedbacks", protect, addFeedback);

export default router;
