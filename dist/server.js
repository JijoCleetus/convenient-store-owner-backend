import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import { initDatabase, setupMiddleware, setupHealthCheck, setupErrorHandling, gracefulShutdown, } from "./bootstrap.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js";
dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;
// Initialize middleware
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Setup custom middleware
setupMiddleware(app);
// Setup health check
setupHealthCheck(app);
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
// Sample API routes (to be replaced with proper route files)
app.get("/api/items", (_, res) => {
    const items = [
        { id: 1, name: "Laptop", category: "Electronics", price: 999, stock: 25 },
        {
            id: 2,
            name: "Coffee Maker",
            category: "Appliances",
            price: 79,
            stock: 45,
        },
        { id: 3, name: "Desk Chair", category: "Furniture", price: 249, stock: 12 },
    ];
    res.json(items);
});
app.get("/api/offers", (_, res) => {
    const offers = [
        {
            id: 1,
            name: "Summer Sale",
            discount: 20,
            active: true,
            startDate: "2026-03-01",
            endDate: "2026-03-31",
        },
        {
            id: 2,
            name: "Weekend Deal",
            discount: 15,
            active: true,
            startDate: "2026-03-06",
            endDate: "2026-03-08",
        },
    ];
    res.json(offers);
});
// Setup error handling and 404
setupErrorHandling(app);
// Start server
const startServer = async () => {
    try {
        // Initialize database
        await initDatabase();
        // Start listening
        app.listen(PORT, () => {
            console.log(`✓ Server running on http://localhost:${PORT}`);
            console.log(`✓ Environment: ${process.env.NODE_ENV || "development"}`);
        });
    }
    catch (error) {
        console.error("✗ Failed to start server:", error);
        process.exit(1);
    }
};
startServer();
// Handle graceful shutdown
process.on("SIGINT", gracefulShutdown);
process.on("SIGTERM", gracefulShutdown);
//# sourceMappingURL=server.js.map