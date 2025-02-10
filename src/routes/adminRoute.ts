import express from "express";
import { allReqs, allUsers, deleteUserById } from "../controllers/adminController";

const router = express.Router();

router.get("/users", allUsers);
router.delete("/users/:id", deleteUserById);
router.get("/allReqests", allReqs);

export default router;
