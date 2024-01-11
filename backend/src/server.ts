import express, { Request, Response } from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoutes";

dotenv.config({ path: path.join(__dirname, "../../.env") });

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);

const MONGO_URI: string | undefined = process.env.MONGO_URI;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

mongoose.connect(MONGO_URI);
const db = mongoose.connection;

db.on("error", (err) => {
  console.error("MongoDB connection error: ", err);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});

app.get("/", async (_req: Request, res: Response) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
