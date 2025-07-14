import { NextFunction } from "express";
import express,{Request,Response} from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from "../routes/config";

interface customjwt{
    id: string
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token missing or invalid" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as customjwt;
    req.userId = decoded.id;
    next();
  } catch (err) {
    console.error("JWT error:", err);
    return res.status(401).json({ message: "Token verification failed" });
  }
};
