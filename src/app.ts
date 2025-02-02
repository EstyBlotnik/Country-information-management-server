import express, { Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./db/connectDB";
import countryRoute from "./routes/countryRoute";
import adminroute from "./routes/adminRoute";
import userRoute from "./routes/userRoute";
import cookieParser from "cookie-parser";
import adminMiddleware from "./middlewares/adminMiddlware";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.json());
app.use(cors());
app.use("/countries", countryRoute);
app.use("/user", userRoute);
app.use("/admin", adminMiddleware, adminroute);

app.get("/", async (req: Request, res: Response) => {
  res.send("Country Information Server");
});

connectDB();
export default app;
