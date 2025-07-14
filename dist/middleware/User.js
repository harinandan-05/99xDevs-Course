"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../routes/config");
const authMiddleware = function (req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Auth Header:", authHeader); // 👈 Check what's being received
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        console.log("Invalid or missing token");
        res.status(401).json({ message: "token invalid or not available" });
        return;
    }
    const token = authHeader.split(" ")[1];
    console.log("Token received:", token);
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config_1.JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.userId = decoded.id;
        next();
    }
    catch (e) {
        console.log("JWT Error:", e); // 👈 See what error is thrown
        res.status(401).json({ msg: "error in validation" });
    }
};
exports.authMiddleware = authMiddleware;
