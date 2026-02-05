// main work to start server

import app from "./src/app.js";
import mongoose from "mongoose";
import { connectDB } from "./src/config/database.js";

connectDB();

// Render and other cloud providers use the PORT environment variable.
// We use 3000 as a fallback for your local development.
const PORT = process.env.PORT || 3000;

// Adding "0.0.0.0" ensures the server is accessible on Render's network.
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});
