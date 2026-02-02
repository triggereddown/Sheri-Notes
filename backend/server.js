// main work to start server

import app from "./src/app.js";
import mongoose from "mongoose";
import { connectDB } from "./src/config/database.js";

connectDB();

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
