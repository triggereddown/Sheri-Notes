import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const res = await axios.get("http://localhost:3000/api/notes");
    console.log(res.data.notes);
    setNotes(res.data.notes);
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <div>
      <div className="maindiv bg-gray-500 p-4 grid grid-cols-3 gap-6">
        {notes.map((notes, idx) => {
          return (
            <div className="bg-amber-950 p-4 rounded " key={idx}>
              <div className="title bg-amber-300 p-2 rounded mb-2">
                {notes.title}
              </div>
              <div className="desc bg-amber-400 p-2 rounded">
                {notes.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
