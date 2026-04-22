import express from "express";
import { upload } from "../middleware/upload.js";
import {
  createHandWarmer,
  getAllHandWarmers,
  getHandWarmerById,
  deleteHandWarmer
} from "../controllers/handWarmerController.js";

const router = express.Router();

// Create hand warmer (with image upload)
router.post("/", upload.single("image"), createHandWarmer);

// Get all hand warmers
router.get("/", getAllHandWarmers);

// Get one hand warmer
router.get("/:id", getHandWarmerById);

// Delete hand warmer
router.delete("/:id", deleteHandWarmer);

export default router;
