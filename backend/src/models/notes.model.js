import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
  title: String,
  description: String,
});

mongoose.model("notes", noteSchema);
export default mongoose.model("notes");
