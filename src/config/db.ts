import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import "dotenv/config";

// instance of PrismaClient
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
/**
 * Shared Prisma Client instance using the PostgreSQL adapter.
 * All DB access should go through this client.
 */
export const prisma = new PrismaClient({ adapter });
