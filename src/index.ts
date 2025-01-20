import express, { Request, Response } from "express";
import dotenv from "dotenv";

// טוען את המשתנים מקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware לקריאת JSON
app.use(express.json());

// נתיב ברירת מחדל
app.get("/", (req: Request, res: Response) => {
  res.send("ברוך הבא לשרת Express בסיסי עם TypeScript!");
});

// התחלת השרת
app.listen(PORT, () => {
  console.log(`⚡️ השרת פועל בכתובת http://localhost:${PORT}`);
});
