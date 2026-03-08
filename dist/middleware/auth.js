import jwt from "jsonwebtoken";
export const authMiddleware = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res
                .status(401)
                .json({ error: "Missing or invalid authorization header" });
            return;
        }
        const token = authHeader.substring(7); // Remove "Bearer " prefix
        const jwtSecret = process.env.JWT_SECRET;
        if (!jwtSecret) {
            console.error("JWT_SECRET not configured");
            res.status(500).json({ error: "Internal server error" });
            return;
        }
        // Verify token
        const decoded = jwt.verify(token, jwtSecret);
        // Attach user to request
        req.user = {
            id: decoded.id,
            email: decoded.email,
        };
        next();
    }
    catch (error) {
        if (error instanceof jwt.TokenExpiredError) {
            res.status(401).json({ error: "Token has expired" });
        }
        else if (error instanceof jwt.JsonWebTokenError) {
            res.status(401).json({ error: "Invalid token" });
        }
        else {
            console.error("Auth middleware error:", error);
            res.status(500).json({ error: "Internal server error" });
        }
    }
};
export default authMiddleware;
//# sourceMappingURL=auth.js.map