import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";
import { PrismaClient } from "../generated/prisma";

// instance of PrismaClient
const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
/**
 * Shared Prisma Client instance using the PostgreSQL adapter.
 * All DB access should go through this client.
 */
const prisma = new PrismaClient({ adapter });

export { prisma };
