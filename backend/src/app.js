import express from "express";
import cors from "cors";
import itemRoutes from "./routes/itemRoutes.js";
import supplierRoutes from "./routes/supplierRoutes.js";
import movementRoutes from "./routes/movementRoutes.js";
import errorHandler from "./middleware/errorHandler.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/items", itemRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/movements", movementRoutes);

// Error handler (must be last)
app.use(errorHandler);

export default app;
