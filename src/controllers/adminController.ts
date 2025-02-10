import { Request, Response } from "express";
import User from "../db/models/user";
import jwt from "jsonwebtoken";
import AuthorizationRequest from "../db/models/authorizationRequest";

export const allUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    console.log(users);
    res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("deleteUserById");
  try {
    const { id } = req.params;
    const token = req.cookies.token;
    console.log("admin token:", token);
    if (!token) {
      res.status(401).json({ message: "Access denied. No token provided." });
      return;
    } else {
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
        role: string;
      };
      console.log("decoded:", decoded);
      if (decoded.id === id) {
        res.status(403).json({
          message: "Access denied. You can't delete your own account.",
        });
        return;
      }
    }
    const deletedUser = await User.findByIdAndDelete(id);
    console.log(id, deletedUser);
    if (!deletedUser) {
      res.status(404).json({ message: "User not found." });
    } else {
      res.status(204).json(deletedUser);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const changeRoleResponse = async (
  req: Request,
  res: Response
): Promise<void> => {
  console.log("changeRoleResponse");
  try {
    const { id } = req.params;
    const { approved } = req.body;
    console.log(req.body);
    if (!id) {
      res.status(400).json({ message: "Missing reqest." });
      return;
    }
    const reqest = await AuthorizationRequest.findById(id);
    if (!reqest) {
      res.status(404).json({ message: "Request not found." });
      return;
    }
    const user = await User.findById(reqest.userId);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    if (approved === true) {
      user.role = reqest.requestedRole;
      reqest.status = "Approved";
    } else {
      reqest.status = "Denied";
    }
    user.closedRequests.push(reqest._id);
    user.openRequest = undefined;
    await user.save();
    reqest.responseDate=new Date();
    await reqest.save();
    res.status(200).json({ user, reqest });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const allReqs = async (req:Request, res:Response): Promise<void> => {
  try {
    const reqests = await AuthorizationRequest.find();
    console.log(reqests);
    res.status(200).json({ reqests });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
}