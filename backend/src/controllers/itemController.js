import prisma from "../config/db.js";
import {
  validateYarn,
  validateHook,
  validateTool,
} from "../utils/validate.js";

// -----------------------------------------------------
//  GET ALL ITEMS (Yarn + Hooks + Tools)
// -----------------------------------------------------
export const getAllItems = async (req, res, next) => {
  try {
    const yarns = await prisma.yarn.findMany();
    const hooks = await prisma.hook.findMany();
    const tools = await prisma.tool.findMany();

    res.json({ yarns, hooks, tools });
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  GET ITEM BY TYPE + ID
// -----------------------------------------------------
export const getItemById = async (req, res, next) => {
  try {
    const { type, id } = req.params;

    let item;
    if (type === "yarn") item = await prisma.yarn.findUnique({ where: { id: Number(id) } });
    else if (type === "hook") item = await prisma.hook.findUnique({ where: { id: Number(id) } });
    else if (type === "tool") item = await prisma.tool.findUnique({ where: { id: Number(id) } });
    else return res.status(400).json({ error: "Invalid item type" });

    if (!item) return res.status(404).json({ error: "Item not found" });

    res.json(item);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  CREATE ITEM (Yarn | Hook | Tool)
// -----------------------------------------------------
export const createItem = async (req, res, next) => {
  try {
    const { type, ...data } = req.body;

    // -----------------------------
    // VALIDATION
    // -----------------------------
    let errors = [];
    if (type === "yarn") errors = validateYarn(data);
    else if (type === "hook") errors = validateHook(data);
    else if (type === "tool") errors = validateTool(data);
    else return res.status(400).json({ error: "Invalid item type" });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // -----------------------------
    // CREATE ITEM
    // -----------------------------
    let newItem;
    if (type === "yarn") newItem = await prisma.yarn.create({ data });
    else if (type === "hook") newItem = await prisma.hook.create({ data });
    else if (type === "tool") newItem = await prisma.tool.create({ data });

    res.status(201).json(newItem);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  UPDATE ITEM
// -----------------------------------------------------
export const updateItem = async (req, res, next) => {
  try {
    const { type, id } = req.params;
    const data = req.body;

    // -----------------------------
    // VALIDATION
    // -----------------------------
    let errors = [];
    if (type === "yarn") errors = validateYarn(data);
    else if (type === "hook") errors = validateHook(data);
    else if (type === "tool") errors = validateTool(data);
    else return res.status(400).json({ error: "Invalid item type" });

    if (errors.length > 0) {
      return res.status(400).json({ errors });
    }

    // -----------------------------
    // UPDATE ITEM
    // -----------------------------
    let updatedItem;
    if (type === "yarn") {
      updatedItem = await prisma.yarn.update({
        where: { id: Number(id) },
        data,
      });
    } else if (type === "hook") {
      updatedItem = await prisma.hook.update({
        where: { id: Number(id) },
        data,
      });
    } else if (type === "tool") {
      updatedItem = await prisma.tool.update({
        where: { id: Number(id) },
        data,
      });
    }

    res.json(updatedItem);
  } catch (error) {
    next(error);
  }
};

// -----------------------------------------------------
//  DELETE ITEM
// -----------------------------------------------------
export const deleteItem = async (req, res, next) => {
  try {
    const { type, id } = req.params;

    let deletedItem;
    if (type === "yarn") {
      deletedItem = await prisma.yarn.delete({ where: { id: Number(id) } });
    } else if (type === "hook") {
      deletedItem = await prisma.hook.delete({ where: { id: Number(id) } });
    } else if (type === "tool") {
      deletedItem = await prisma.tool.delete({ where: { id: Number(id) } });
    } else {
      return res.status(400).json({ error: "Invalid item type" });
    }

    res.json({ message: "Item deleted", deletedItem });
  } catch (error) {
    next(error);
  }
};
