import React, { useEffect, useState } from "react";
import axios from "axios";

const App = () => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const res = await axios.get("http://localhost:3000/api/notes");
    setNotes(res.data.notes);
  };

  const [editId, setEditId] = useState(null);

  useEffect(() => {
    getNotes();
  }, []);

  const onsubmitHandler = (e) => {
    e.preventDefault();
    const { title, description } = e.target.elements;
    axios
      .post("http://localhost:3000/api/notes", {
        title: title.value,
        description: description.value,
      })
      .then(() => {
        getNotes();
        e.target.reset(); // Clears form after submission
      });
  };

  const deletenoteHandler = async (id) => {
    await axios.delete("http://localhost:3000/api/notes/" + id);
    getNotes();
  };

  const changedescHandler = async (e, id) => {
    e.preventDefault();
    const newValue = e.target.elements.newDesc.value;
    try {
      await axios.patch("http://localhost:3000/api/notes/" + id, {
        description: newValue,
      });
      setEditId(null);
      getNotes();
    } catch (err) {
      console.log("Error updating description:", err);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8 font-sans">
      {/* Header Section */}
      <div className="max-w-6xl mx-auto mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">My Notes</h1>
        <p className="text-zinc-400">Manage your daily tasks and thoughts.</p>
      </div>

      {/* Form Section */}
      <div className="max-w-xl mx-auto mb-12 bg-zinc-900 border border-zinc-800 rounded-xl p-6 shadow-2xl">
        <form onSubmit={onsubmitHandler} className="space-y-4">
          <div className="inputtitle">
            <input
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all"
              name="title"
              type="text"
              placeholder="Note Title"
              required
            />
          </div>

          <div className="inputdesc">
            <textarea
              className="w-full bg-zinc-800 border border-zinc-700 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all min-h-[100px]"
              name="description"
              placeholder="Take a note..."
              required
            />
          </div>
          <button className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-zinc-950 font-bold rounded-lg transition-colors">
            Create Note
          </button>
        </form>
      </div>

      {/* Notes Display Section */}
      <div className="maindiv max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {notes.map((notes, idx) => {
          return (
            <div
              className="bg-zinc-900 border border-zinc-800 p-5 rounded-xl flex flex-col justify-between hover:border-zinc-700 transition-all shadow-sm"
              key={notes._id || idx}
            >
              {editId === notes._id ? (
                /* Edit Mode */
                <div className="changeDescription">
                  <form
                    onSubmit={(e) => changedescHandler(e, notes._id)}
                    className="space-y-3"
                  >
                    <div className="text-xs font-bold text-amber-500 uppercase tracking-wider">
                      Editing Description
                    </div>
                    <textarea
                      className="w-full bg-zinc-800 border border-zinc-700 p-2 rounded text-zinc-100 focus:outline-none min-h-[80px]"
                      name="newDesc"
                      defaultValue={notes.description}
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <button className="flex-1 bg-green-600 hover:bg-green-700 py-2 rounded text-sm font-semibold transition-colors">
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={() => setEditId(null)}
                        className="flex-1 bg-zinc-800 hover:bg-zinc-700 py-2 rounded text-sm font-semibold transition-colors"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                /* View Mode */
                <>
                  <div>
                    <div className="title text-lg font-bold text-amber-400 mb-2 truncate">
                      {notes.title}
                    </div>
                    <div className="desc text-zinc-400 text-sm leading-relaxed mb-6 whitespace-pre-wrap">
                      {notes.description}
                    </div>
                  </div>

                  <div className="flex items-center gap-3 pt-4 border-t border-zinc-800">
                    <button
                      onClick={() => deletenoteHandler(notes._id)}
                      className="text-xs font-semibold text-zinc-500 hover:text-red-400 transition-colors"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => setEditId(notes._id)}
                      className="text-xs font-semibold text-zinc-500 hover:text-amber-400 transition-colors"
                    >
                      Update Description
                    </button>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default App;
