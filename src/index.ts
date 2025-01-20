import express, { Request, Response } from "express";
import dotenv from "dotenv";
import axios, { AxiosError } from "axios";
import cors from "cors";

// טוען את המשתנים מקובץ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware לקריאת JSON
app.use(express.json());
app.use(cors());

async function fetchData() {
  try {
    const response = await axios.get("https://restcountries.com/v3.1/all", {
      timeout: 1000000,
    });
    return response.data; // מחזיר את הנתונים מהתגובה
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      // אם זו שגיאה מ-Axios
      console.error('Axios Error response:', error);
      console.error("Axios Error response:", error.response?.data);
      console.error("Axios Error status:", error.response?.status);
    } else {
      // טיפול בשגיאות אחרות (לא מ-Axios)
      console.error("Non-Axios error:", error);
    }
    return null; // אם יש שגיאה, מחזיר null
  }
}

// נתיב ברירת מחדל
app.get("/", async (req: Request, res: Response) => {
  fetchData().then((data) => {
    if (data) {
      console.log("Received data:", data);
    } else {
      console.log("No data received due to an error");
    }
  });
  res.status(200).send("הבקשה בטיפול");
});

// התחלת השרת
app.listen(PORT, () => {
  console.log(`⚡️ השרת פועל בכתובת http://localhost:${PORT}`);
});
