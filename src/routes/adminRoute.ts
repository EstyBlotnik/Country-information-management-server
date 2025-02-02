import express from "express";
import { allUsers } from "../controllers/adminController";

const router = express.Router();

router.get("/users", allUsers);

export default router;
