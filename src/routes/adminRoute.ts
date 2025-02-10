import express from "express";
import { allReqs, allUsers, changeRoleResponse, deleteUserById } from "../controllers/adminController";

const router = express.Router();

router.get("/users", allUsers);
router.delete("/users/:id", deleteUserById);
router.get("/allReqests", allReqs);
router.put("/changeRoleResponse/:id", changeRoleResponse);

export default router;
