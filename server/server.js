import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
const app = express();
dotenv.config();

// all middleware is here
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

// all port here
const port = process.env.PORT || 7070;
const url = process.env.MONGO_URL;

// database connection here
mongoose
  .connect(url)
  .then(console.log("Database connection Successfully.."))
  .catch((error) => console.log("MongoDB Error is ", error));

//   all routes is here
app.use("/api/v1/auth", authRoutes);
// server listen here
app.listen(port, () => {
  console.log(`Server Listening on port ${port}`);
});
