import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB";
import countryRout from "./routes/countryRout";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());
app.use("/countries", countryRout);
app.get("/", async (req: Request, res: Response) => {
  res.send("Country Information Server");
});

connectDB();
export default app;