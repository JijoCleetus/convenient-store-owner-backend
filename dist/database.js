import { PrismaClient } from "@prisma/client";
let prisma;
/**
 * Get or create a singleton instance of PrismaClient
 */
export const getPrismaClient = () => {
    if (!prisma) {
        prisma = new PrismaClient({
            log: process.env.NODE_ENV === "development"
                ? ["query", "error", "warn"]
                : ["error"],
        });
    }
    return prisma;
};
/**
 * Initialize database connection
 */
export const connectDatabase = async () => {
    const client = getPrismaClient();
    try {
        await client.$connect();
        console.log("✓ Database connected successfully");
    }
    catch (error) {
        console.error("✗ Database connection failed:", error);
        throw error;
    }
};
/**
 * Disconnect from database
 */
export const disconnectDatabase = async () => {
    const client = getPrismaClient();
    try {
        await client.$disconnect();
        console.log("✓ Database disconnected");
    }
    catch (error) {
        console.error("✗ Database disconnection failed:", error);
        throw error;
    }
};
/**
 * Test database connection
 */
export const testDatabaseConnection = async () => {
    const client = getPrismaClient();
    try {
        await client.$queryRaw `SELECT 1`;
        console.log("✓ Database connection test passed");
        return true;
    }
    catch (error) {
        console.error("✗ Database connection test failed:", error);
        return false;
    }
};
export default getPrismaClient;
//# sourceMappingURL=database.js.map