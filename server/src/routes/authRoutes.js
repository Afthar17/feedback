import express from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  checkAuth,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/authcheck", protect, checkAuth);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);

export default router;
