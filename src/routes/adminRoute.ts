import express from "express";
import adminMiddleware from "../middlewares/adminMiddlware";
import { allUsers } from "../controllers/adminController";

const router = express.Router();

// נתיב שמותר רק למנהלים
router.get("/users", adminMiddleware, allUsers);

export default router;
