import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../db/models/user";

dotenv.config();

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "1h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 21600000,
    });
    res.json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePicture,
      userName,
      password,
    } = req.body;

     if (!firstName || !lastName || !email || !phoneNumber || !userName || !password) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const existingUser = await User.findOne(
      { email },
      { userName },
      { phoneNumber }
    );
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePicture: profilePicture || "",
      role: "View",
      userName,
      password: hashedPassword,
      JoiningDate: new Date(),
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "6h" }
    );
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 21600000,
    });
    res.json({ message: "User registered successfully", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const editUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      profilePicture,
      userName,
    } = req.body;
    const existingUser = await User.findOne({
      $or: [{ email }, { userName }, { phoneNumber }],
    });

    if (existingUser && existingUser._id.toString() !== id) {
      res.status(400).json({
        message:
          "User with this email, username, or phone number already exists.",
      });
      return;
    }
    const user = await User.findById(id);

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;
    user.profilePicture = profilePicture || user.profilePicture;
    user.userName = userName || user.userName;

    await user.save();
    
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
