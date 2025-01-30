import { Request, Response } from "express";
import Country from "../db/models/contry";

export const createCountry = async (req: Request, res: Response): Promise<void> => {
  const { name, flag, population, region } = req.body;
  try {
    if (!name) {
      res.status(400).json({ message: "Invalid name format" });
    } else {
      const existingCountry = await Country.findOne({ name: name });
      if (existingCountry) {
        res.status(401).json({ message: "Country already exists" });
      } else {
        const newCountry = new Country({
          name,
          flag,
          population,
          region,
        });
        await newCountry.save();
        res.status(201).json(newCountry);
      }
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(402).json({ message: err.message });
    } else {
      res.status(403).json({ message: "An unknown error occurred." });
    }
  }
};
