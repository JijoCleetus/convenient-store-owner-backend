import { Express, Request, Response, NextFunction } from "express";
import { connectDatabase, disconnectDatabase } from "./database.js";

export const initDatabase = async (): Promise<void> => {
  try {
    await connectDatabase();
  } catch (error) {
    console.error("✗ Failed to initialize database:", error);
    process.exit(1);
  }
};

export const setupMiddleware = (app: Express): void => {
  // Request logging
  app.use((req: Request, res: Response, next: NextFunction) => {
    const start = Date.now();
    res.on("finish", () => {
      const duration = Date.now() - start;
      console.log(`${req.method} ${req.path} ${res.statusCode} ${duration}ms`);
    });
    next();
  });
};

export const setupHealthCheck = (app: Express): void => {
  app.get("/api/health", (req: Request, res: Response) => {
    console.log("Health check requested", req);
    res.json({
      status: "healthy",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    });
  });
};

export const setupErrorHandling = (app: Express): void => {
  // 404 handler
  app.use((req: Request, res: Response) => {
    res.status(404).json({
      error: "Not Found",
      path: req.path,
      method: req.method,
    });
  });

  // Global error handler
  app.use((err: any, req: Request, res: Response) => {
    console.error("Error:", req);
    res.status(err.status || 500).json({
      error: err.message || "Internal Server Error",
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
    });
  });
};

export const gracefulShutdown = async (): Promise<void> => {
  console.log("Shutting down gracefully...");
  await disconnectDatabase();
  console.log("Server shutdown complete");
  process.exit(0);
};
