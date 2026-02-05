import React, { useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);
  const getNotes = async () => {
    const res = await axios.get("http://localhost:3000/notes");
    console.log(res);
  };

  return (
    <div>
      <div className="maindiv bg-amber-500"></div>
    </div>
  );
};

export default App;
