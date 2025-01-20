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
const dotenv_1 = __importDefault(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
const cors_1 = __importDefault(require("cors"));
// טוען את המשתנים מקובץ .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware לקריאת JSON
app.use(express_1.default.json());
app.use((0, cors_1.default)());
// נתיב ברירת מחדל
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // כתובת ה-API לבקשה
        // const apiUrl = "https://restcountries.com/v3.1/all";
        // // בקשת GET
        const response = yield axios_1.default.get("https://restcountries.com/v3.1/all");
        // שליחת התוצאה ללקוח
        res.json(response);
    }
    catch (error) {
        console.error("שגיאה בבקשת ה-API:", error);
        res.status(500).send("שגיאה בבקשת ה-API");
    }
}));
// התחלת השרת
app.listen(PORT, () => {
    console.log(`⚡️ השרת פועל בכתובת http://localhost:${PORT}`);
});
