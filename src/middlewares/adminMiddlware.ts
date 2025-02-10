import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

export const adminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  console.log("adminMiddleware")
  try {
    const token = req.cookies.token;
    console.log("admin token:",token);
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };
      console.log("decoded:",decoded);
      req.user = decoded;
      console.log(decoded);

      if (req.user.role !== "Admin" || req.user.role === undefined) {
        res.status(403).json({ message: "Access denied. Admins only." });
        return;
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
    return;
  }
  next();
};

export const checkUserOrAdminAccess = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    } else {
      const {id}= req.params
      console.log("id:",req.params)

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };
      req.user = decoded;
      if (req.user.role !== "Admin" && req.user.id !== id) {
        res.status(403).json({ message: "Access denied. Admins only." });
        return;
      }
    }
  } catch (error) {
    res.status(400).json({ message: "Invalid token." });
    return;
  }
  next();
};

export default adminMiddleware;
