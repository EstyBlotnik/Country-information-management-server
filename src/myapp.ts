import express from "express";
import fs from "fs";
import { connectDB } from "./db/connectDB";
import Country from "./db/models/contry";
interface ICountry2 {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [currencyCode: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  languages: {
    [languageCode: string]: string;
  };
  translations: {
    [langCode: string]: {
      official: string;
      common: string;
    };
  };
  latlng: [number, number];
  landlocked: boolean;
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: string;
  };
  coatOfArms?: {
    png?: string;
    svg?: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: [number, number];
  };
}

const app = express();

// URL לחיבור ל-MongoDB
const uri = "mongodb://localhost:27017"; // שים לב ששינית את ה-URI לפי הצורך

// קובץ JSON
const jsonFilePath = "./countries.json";

app.post("/upload-countries", async (req, res) => {
  connectDB();
  try {
    // קריאת המידע מקובץ JSON
    const data = fs.readFileSync("./src/db/countries.json", "utf-8");
    const countries = JSON.parse(data);
    console.log(data);
    // const countries = JSON.parse(data);
    // הכנסת הנתונים למונגו
    for (let country of countries) {
      const newCountry = new Country({
        name: country.name.common,
        flag: country.flag,
        population: country.population,
        region: country.region,
      });
      await newCountry.save();
    }
  } catch (err) {
    console.error(err);
    res.status(500).send("Error uploading countries");
  }
});

app.listen(3000, () => {
  connectDB();
  console.log("Server running on port 3000");
});
