"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
// טוען את המשתנים מקובץ .env
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
// Middleware לקריאת JSON
app.use(express_1.default.json());
// נתיב ברירת מחדל
app.get("/", (req, res) => {
    res.send("ברוך הבא לשרת Express בסיסי עם TypeScript!");
});
// התחלת השרת
app.listen(PORT, () => {
    console.log(`⚡️ השרת פועל בכתובת http://localhost:${PORT}`);
});
