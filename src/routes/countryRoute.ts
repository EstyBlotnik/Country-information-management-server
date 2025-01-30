import express, { Request, Response } from "express";
import Country from "../db/models/country";
import {
  createCountry,
  deleteCountry,
  updateCountry,
  getAllCountries,
  getCountryById,
} from "../controllers/countryController";

const router = express.Router();

router.post("/", createCountry);

router.get("/", getAllCountries);

router.put("/:id", updateCountry);

router.delete("/:id", deleteCountry);

router.get("/:id", getCountryById);

export default router;
