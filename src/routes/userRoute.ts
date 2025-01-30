import express, { Request, Response } from "express";
import{login, register} from "../controllers/userController"
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

router.post("/register", register);
router.post("/login", login);


export default router;