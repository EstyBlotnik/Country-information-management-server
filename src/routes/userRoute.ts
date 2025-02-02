import express, { Request, Response } from "express";
import {
  editUser,
  getUser,
  login,
  register,
} from "../controllers/userController";
import dotenv from "dotenv";
import passwordResetRoute from "./passwordRoute";
import { checkUserOrAdminAccess } from "../middlewares/adminMiddlware";

dotenv.config();

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.use("/password", passwordResetRoute);
router.get("/:id", checkUserOrAdminAccess, getUser);
router.put("/:id", checkUserOrAdminAccess, editUser);

export default router;
