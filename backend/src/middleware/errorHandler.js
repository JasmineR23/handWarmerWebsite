// Global Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error("🔥 ERROR:", err);

  // Prisma known errors (optional but helpful)
  if (err.code === "P2002") {
    return res.status(400).json({
      error: "Duplicate value. A record with this field already exists.",
    });
  }

  if (err.code === "P2025") {
    return res.status(404).json({
      error: "Record not found.",
    });
  }

  // Default fallback
  res.status(err.statusCode || 500).json({
    error: err.message || "Internal Server Error",
  });
};

export default errorHandler;
