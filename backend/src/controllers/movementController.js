import prisma from "../config/db.js";
import { validateMovement } from "../utils/validate.js";

// -----------------------------------------------------
//  GET ALL STOCK MOVEMENTS
// -----------------------------------------------------
export const getAllMovements = async (req, res, next) => {
  try {
    const movements = await prisma.stockMovement.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        yarn: true,
        hook: true,
        tool: true,
      },
    });

    res.json(movements);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  CREATE STOCK MOVEMENT (IN / OUT)
// -----------------------------------------------------
export const createMovement = async (req, res, next) => {
  try {
    const { type, itemType, itemId, quantity, note } = req.body;

    // -----------------------------
    // VALIDATION
    // -----------------------------
    const errors = validateMovement(req.body);
    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    const id = Number(itemId);
    const qty = Number(quantity);

    // -----------------------------
    // 1. Adjust inventory
    // -----------------------------
    let updatedItem;

    if (itemType === "yarn") {
      const item = await prisma.yarn.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "Yarn not found" });

      const newQty = type === "IN" ? item.quantity + qty : item.quantity - qty;
      if (newQty < 0) return res.status(400).json({ error: "Insufficient yarn stock" });

      updatedItem = await prisma.yarn.update({
        where: { id },
        data: { quantity: newQty },
      });
    }

    if (itemType === "hook") {
      const item = await prisma.hook.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "Hook not found" });

      const newQty = type === "IN" ? item.quantity + qty : item.quantity - qty;
      if (newQty < 0) return res.status(400).json({ error: "Insufficient hook stock" });

      updatedItem = await prisma.hook.update({
        where: { id },
        data: { quantity: newQty },
      });
    }

    if (itemType === "tool") {
      const item = await prisma.tool.findUnique({ where: { id } });
      if (!item) return res.status(404).json({ error: "Tool not found" });

      const newQty = type === "IN" ? item.quantity + qty : item.quantity - qty;
      if (newQty < 0) return res.status(400).json({ error: "Insufficient tool stock" });

      updatedItem = await prisma.tool.update({
        where: { id },
        data: { quantity: newQty },
      });
    }

    // -----------------------------
    // 2. Log the movement
    // -----------------------------
    const movement = await prisma.stockMovement.create({
      data: {
        type,
        quantity: qty,
        note,
        yarnId: itemType === "yarn" ? id : null,
        hookId: itemType === "hook" ? id : null,
        toolId: itemType === "tool" ? id : null,
      },
    });

    res.status(201).json({
      message: "Stock movement recorded",
      movement,
      updatedItem,
    });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  GET MOVEMENT BY ID
// -----------------------------------------------------
export const getMovementById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const movement = await prisma.stockMovement.findUnique({
      where: { id: Number(id) },
      include: {
        yarn: true,
        hook: true,
        tool: true,
      },
    });

    if (!movement) {
      return res.status(404).json({ error: "Movement not found" });
    }

    res.json(movement);
  } catch (error) {
    next(error);
  }
};
