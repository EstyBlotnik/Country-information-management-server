import { Request, Response } from "express";
import User from "../db/models/user";
export const allUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    console.log(users);
    res.json({ users }); 
  } catch (error) {
    console.error(error);
    res.json({ message: "Server error" });
  }
};
