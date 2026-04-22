import express from "express";
import {
  getAllMovements,
  getMovementById,
  createMovement,
} from "../controllers/movementController.js";

const router = express.Router();

// -----------------------------------------------------
//  GET ALL MOVEMENTS
//  GET /movements
// -----------------------------------------------------
router.get("/", getAllMovements);

// -----------------------------------------------------
//  GET MOVEMENT BY ID
//  GET /movements/:id
// -----------------------------------------------------
router.get("/:id", getMovementById);

// -----------------------------------------------------
//  CREATE MOVEMENT (IN / OUT)
//  POST /movements
// -----------------------------------------------------
router.post("/", createMovement);

export default router;
