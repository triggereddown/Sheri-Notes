import express from "express";
import notesModel from "./models/notes.model.js";

const app = express();
app.use(express.json());

const notes = [
  // title:"Title 1",
  // description:"Description 1";
];

// Entry point
app.get("/", (req, res) => {
  res.send("Hello from Deep");
});

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

app.post("/notes", async (req, res) => {
  const { title, description } = req.body;
  const note = await notesModel.create({ title, description });
  res.status(201).json({
    message: "Note added successfully",
    note,
  });
});

// Get Notes Api
app.get("/notes", async (req, res) => {
  //find is a method in mongodb whihc especifically fetches all the data from the collection
  //find method array ke form me return karti hai data ko
  const notes = await notesModel.find();
  res.status(200).json({
    message: "Notes sharing successfully",
    notes,
  });
});

//Delete api
app.delete("/notes/:index", (req, res) => {
  delete notes[req.params.index];
  res.status(200).json({
    message: "Note deleated successfully",
  });
});

//patch description
app.patch("/notes/:index", (req, res) => {
  notes[req.params.index].description = req.body.description;
  res.status(200).json({
    message: "Note's Description Updated Successfully",
  });
});

export default app;
