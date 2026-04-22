import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// Debug logs
console.log("🟣 USING DB FILE:", import.meta.url);
console.log("🟣 DATABASE_URL:", process.env.DATABASE_URL);

// Create Prisma client (NO adapter)
const prisma = new PrismaClient();

export default prisma;
