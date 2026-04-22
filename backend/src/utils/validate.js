// Utility validation functions for the crochet inventory system

// -----------------------------
//  YARN VALIDATION
// -----------------------------
export const validateYarn = (data) => {
  const errors = [];

  if (!data.name) errors.push("Yarn name is required");
  if (!data.color) errors.push("Yarn color is required");
  if (!data.weight) errors.push("Yarn weight is required");

  if (data.yardage && data.yardage < 0) {
    errors.push("Yardage must be a positive number");
  }

  if (data.quantity && data.quantity < 0) {
    errors.push("Quantity cannot be negative");
  }

  return errors;
};

// -----------------------------
//  HOOK VALIDATION
// -----------------------------
export const validateHook = (data) => {
  const errors = [];

  if (!data.size) errors.push("Hook size is required");

  if (data.quantity && data.quantity < 0) {
    errors.push("Quantity cannot be negative");
  }

  return errors;
};

// -----------------------------
//  TOOL VALIDATION
// -----------------------------
export const validateTool = (data) => {
  const errors = [];

  if (!data.name) errors.push("Tool name is required");

  if (data.quantity && data.quantity < 0) {
    errors.push("Quantity cannot be negative");
  }

  return errors;
};

// -----------------------------
//  SUPPLIER VALIDATION
// -----------------------------
export const validateSupplier = (data) => {
  const errors = [];

  if (!data.name) errors.push("Supplier name is required");

  if (data.email && !data.email.includes("@")) {
    errors.push("Invalid email format");
  }

  return errors;
};

// -----------------------------
//  STOCK MOVEMENT VALIDATION
// -----------------------------
export const validateMovement = (data) => {
  const errors = [];

  if (!["IN", "OUT"].includes(data.type)) {
    errors.push("Movement type must be IN or OUT");
  }

  if (!["yarn", "hook", "tool"].includes(data.itemType)) {
    errors.push("Item type must be yarn, hook, or tool");
  }

  if (!data.itemId) errors.push("Item ID is required");

  if (!data.quantity || data.quantity <= 0) {
    errors.push("Quantity must be greater than zero");
  }

  return errors;
};
