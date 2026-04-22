import app from "./app.js";
import "dotenv/config";
import handWarmerRoutes from "./routes/handWarmerRoutes.js";
import express from "express";

// Serve uploaded images
app.use("/uploads", express.static("uploads"));

// Add your new hand warmer routes
app.use("/handwarmers", handWarmerRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
