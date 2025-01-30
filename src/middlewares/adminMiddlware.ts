import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";


dotenv.config();

interface AuthenticatedRequest extends Request {
  user?: { id: string; role: string };
}

const adminMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = req.cookies.token;
    console.log(token);
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    } else {
      console.log(token);
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };

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

export default adminMiddleware;
