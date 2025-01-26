import express, { Request, Response } from "express";
import Country from "../db/models/contry";
import axios from "axios";

const router = express.Router();

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { name, flag, population, region } = req.body;
  try {
    if (!name || !name.common) {
      res.status(400).json({ message: "Invalid name format" });
    } else {
      const existingCountry = await Country.findOne({ name: name.common });
      if (existingCountry) {
        res.status(401).json({ message: "Country already exists" });
      } else {
        const newCountry = new Country({
          name: name.common,
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
      res.status(400).json({ message: "err.message" });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
});

router.get("/", async (req: Request, res: Response): Promise<void> => {
  try {
    const countries = await Country.find();
    res.json(countries);
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
});

router.put("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, flag, population, region } = req.body;
  if (!name || !flag || !population || !region) {
    res.status(400).json({ message: "Invalid data format" });
  } else {
    try {
      const countryById = await Country.findById(id);
      if (!countryById) {
        res.status(404).json({ message: "Country not found" });
        return;
      }
      const existingCountry = await Country.findOne({ name });
      if (existingCountry) {
        res.status(401).json({ message: "Country already exists" });
      } else {
        const updatedCountry = await Country.findByIdAndUpdate(
          id,
          {
            name,
            flag,
            population,
            region,
          },
          { new: true }
        );
        res.status(200).json(updatedCountry);
      }
    } catch (err) {
      if (err instanceof Error) {
        res.status(400).json({ message: err.message });
      } else {
        res.status(400).json({ message: "An unknown error occurred." });
      }
    }
  }
});

router.delete("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  console.log(id);
  try {
    const deletedCountry = await Country.findByIdAndDelete(id);
    if (!deletedCountry) {
      res.status(404).json({ message: "Country not found." });
    } else {
      res.status(204).json(deletedCountry);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(400).json({ message: err.message });
    } else {
      res.status(400).json({ message: "An unknown error occurred." });
    }
  }
});

router.get("/:id", async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  try {
    const country = await Country.findById(id);
    if (!country) {
      res.status(404).json({ message: "Country not found." });
    } else {
      res.json(country);
    }
  } catch (err) {
    if (err instanceof Error) {
      res.status(500).json({ message: err.message });
    } else {
      res.status(500).json({ message: "An unknown error occurred." });
    }
  }
});
export default router;
