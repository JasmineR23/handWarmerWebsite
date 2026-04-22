import prisma from "../config/db.js";
import { validateSupplier } from "../utils/validate.js";

// -----------------------------------------------------
//  GET ALL SUPPLIERS
// -----------------------------------------------------
export const getAllSuppliers = async (req, res, next) => {
  try {
    const suppliers = await prisma.supplier.findMany({
      include: {
        yarns: true,
        hooks: true,
        tools: true,
      },
    });

    res.json(suppliers);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  GET SINGLE SUPPLIER BY ID
// -----------------------------------------------------
export const getSupplierById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const supplier = await prisma.supplier.findUnique({
      where: { id: Number(id) },
      include: {
        yarns: true,
        hooks: true,
        tools: true,
      },
    });

    if (!supplier) {
      return res.status(404).json({ error: "Supplier not found" });
    }

    res.json(supplier);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  CREATE SUPPLIER
// -----------------------------------------------------
export const createSupplier = async (req, res, next) => {
  try {
    const data = req.body;

    // VALIDATION
    const errors = validateSupplier(data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const newSupplier = await prisma.supplier.create({
      data,
    });

    res.status(201).json(newSupplier);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  UPDATE SUPPLIER
// -----------------------------------------------------
export const updateSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    // VALIDATION
    const errors = validateSupplier(data);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const updatedSupplier = await prisma.supplier.update({
      where: { id: Number(id) },
      data,
    });

    res.json(updatedSupplier);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  DELETE SUPPLIER
// -----------------------------------------------------
export const deleteSupplier = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedSupplier = await prisma.supplier.delete({
      where: { id: Number(id) },
    });

    res.json({
      message: "Supplier deleted",
      deletedSupplier,
    });
  } catch (error) {
    next(error);
  }
};
