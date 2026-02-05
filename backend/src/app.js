import express from "express";
import notesModel from "./models/notes.model.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static("./public"));

const notes = [
  // title:"Title 1",
  // description:"Description 1";
];

// Entry point
// app.get("/", (req, res) => {
//   res.send("Hello from Deep");
// });

// POST API
// app.post("/notes", (req, res) => {
//   console.log("BODY:", req.body);

//   // 🛑 guard clause
//   if (!req.body || Object.keys(req.body).length === 0) {
//     return res.status(400).json({ message: "Empty body received" });
//   }

//   notes.push(req.body);
//   res.status(201).json({ message: "Note added", notes });
// });

app.post("/api/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await notesModel.create({ title, description });
  res.status(201).json({
    message: "Note added successfully",
    note,
  });
});

// Get Notes Api
app.get("/api/notes", async (req, res) => {
  //find is a method in mongodb whihc especifically fetches all the data from the collection
  //find method array ke form me return karti hai data ko
  const notes = await notesModel.find();
  res.status(200).json({
    message: "Notes sharing successfully",
    notes,
  });
});

//Delete api
app.delete("/api/notes/:id", async (req, res) => {
  const id = req.params.id;
  await notesModel.findByIdAndDelete(id);

  res.status(200).json({
    message: "Note deleated successfully",
  });
});

//patch description
//---/api/notes/id
app.patch("/api/notes/:id", async (req, res) => {
  try {
    const id = req.params.id;
    //body se description lega
    const { description } = req.body;
    await notesModel.findByIdAndUpdate(id, { description });
    res.status(200).json({
      message: "Note's Description Updated Successfully",
    });
  } catch (error) {
    console.error("Error updating note description:", error);
    res.status(500).json({
      message: "An error occurred while updating the note's description",
    });
  }
});

//dirname jis file me kaam ho rhi wo jis folder ke andar hai us folder ki path mil jaati hai
// cd .. ki trh dirname .. krke ek level aur bahar chle jao fir public me ghus jao
console.log(__dirname, "/public/index.html");

app.use("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "/public/index.html"));
});

export default app;
