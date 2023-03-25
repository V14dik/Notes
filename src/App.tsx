import { createContext, useEffect, useState } from "react";
import "./App.scss";
import { NoteContent } from "./components/NoteContent";
import NotesList from "./components/NotesList";
import { INote } from "./models";
import notesJson from "./notes.json";

export type NotesContext = {
  notes: Array<INote>;
  setNotes: (notes: Array<INote>) => void;
  setChoosenNote: (note: number) => void;
  createNewNote: () => void;
};

export const Context = createContext<NotesContext | null>(null);

function App() {
  const [notes, setNotes] = useState<Array<INote>>(notesJson);
  const [choosenNote, setChoosenNote] = useState<number>(0);

  const createNewNote = () => {
    setNotes([
      ...notes,
      {
        tags: [],
        content: "",
      },
    ]);
    setChoosenNote(notes.length);
  };

  useEffect(() => {
    if (choosenNote > notes.length - 1) {
      if (notes.length === 0) {
        createNewNote();
      } else {
        setChoosenNote(notes.length - 1);
      }
    }
  }, [notes]);

  return (
    <main>
      <h1>Notes</h1>
      <div className="notes-container">
        <Context.Provider
          value={{ notes, setNotes, setChoosenNote, createNewNote }}
        >
          <NotesList />
          <NoteContent note={choosenNote} />
        </Context.Provider>
      </div>
    </main>
  );
}

export default App;
