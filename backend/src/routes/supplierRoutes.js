import express from "express";
import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../controllers/supplierController.js";

const router = express.Router();

// -----------------------------------------------------
//  GET ALL SUPPLIERS
//  GET /suppliers
// -----------------------------------------------------
router.get("/", getAllSuppliers);

// -----------------------------------------------------
//  GET SINGLE SUPPLIER
//  GET /suppliers/:id
// -----------------------------------------------------
router.get("/:id", getSupplierById);

// -----------------------------------------------------
//  CREATE SUPPLIER
//  POST /suppliers
// -----------------------------------------------------
router.post("/", createSupplier);

// -----------------------------------------------------
//  UPDATE SUPPLIER
//  PUT /suppliers/:id
// -----------------------------------------------------
router.put("/:id", updateSupplier);

// -----------------------------------------------------
//  DELETE SUPPLIER
//  DELETE /suppliers/:id
// -----------------------------------------------------
router.delete("/:id", deleteSupplier);

export default router;
