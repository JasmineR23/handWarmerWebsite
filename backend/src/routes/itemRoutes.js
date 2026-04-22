import express from "express";
import {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
} from "../controllers/itemController.js";

const router = express.Router();

// -----------------------------------------------------
//  GET ALL ITEMS (Yarn + Hooks + Tools)
//  GET /items
// -----------------------------------------------------
router.get("/", getAllItems);

// -----------------------------------------------------
//  GET SINGLE ITEM
//  GET /items/:type/:id
//  type = yarn | hook | tool
// -----------------------------------------------------
router.get("/:type/:id", getItemById);

// -----------------------------------------------------
//  CREATE ITEM
//  POST /items
//  Body must include: { type: "yarn" | "hook" | "tool", ...fields }
// -----------------------------------------------------
router.post("/", createItem);

// -----------------------------------------------------
//  UPDATE ITEM
//  PUT /items/:type/:id
// -----------------------------------------------------
router.put("/:type/:id", updateItem);

// -----------------------------------------------------
//  DELETE ITEM
//  DELETE /items/:type/:id
// -----------------------------------------------------
router.delete("/:type/:id", deleteItem);

export default router;
