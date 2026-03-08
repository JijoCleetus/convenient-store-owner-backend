import { Express } from "express";
export declare const initDatabase: () => Promise<void>;
export declare const setupMiddleware: (app: Express) => void;
export declare const setupHealthCheck: (app: Express) => void;
export declare const setupErrorHandling: (app: Express) => void;
export declare const gracefulShutdown: () => Promise<void>;
//# sourceMappingURL=bootstrap.d.ts.map