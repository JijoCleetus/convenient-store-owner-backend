import { PrismaClient } from "@prisma/client";
/**
 * Get or create a singleton instance of PrismaClient
 */
export declare const getPrismaClient: () => PrismaClient;
/**
 * Initialize database connection
 */
export declare const connectDatabase: () => Promise<void>;
/**
 * Disconnect from database
 */
export declare const disconnectDatabase: () => Promise<void>;
/**
 * Test database connection
 */
export declare const testDatabaseConnection: () => Promise<boolean>;
export default getPrismaClient;
//# sourceMappingURL=database.d.ts.map