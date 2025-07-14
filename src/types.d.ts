import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export interface CustomJwtPayload extends jwt.JwtPayload {
  id: string;
}
