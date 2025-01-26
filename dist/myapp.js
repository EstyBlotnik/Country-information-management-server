"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const connectDB_1 = require("./db/connectDB");
const contry_1 = __importDefault(require("./db/models/contry"));
const app = (0, express_1.default)();
// URL לחיבור ל-MongoDB
const uri = "mongodb://localhost:27017"; // שים לב ששינית את ה-URI לפי הצורך
// קובץ JSON
const jsonFilePath = "./countries.json";
app.post("/upload-countries", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, connectDB_1.connectDB)();
    try {
        // קריאת המידע מקובץ JSON
        const data = fs_1.default.readFileSync("./src/db/countries.json", "utf-8");
        const countries = JSON.parse(data);
        console.log(data);
        // const countries = JSON.parse(data);
        // הכנסת הנתונים למונגו
        for (let country of countries) {
            const newCountry = new contry_1.default({
                name: country.name.common,
                flag: country.flag,
                population: country.population,
                region: country.region,
            });
            yield newCountry.save();
        }
    }
    catch (err) {
        console.error(err);
        res.status(500).send("Error uploading countries");
    }
}));
app.listen(3000, () => {
    (0, connectDB_1.connectDB)();
    console.log("Server running on port 3000");
});
