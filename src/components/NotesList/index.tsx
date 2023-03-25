import { Note } from "./Note";
import "./index.scss";
import { Button } from "../Button";
import { useContext, useState } from "react";
import { Context, NotesContext } from "../../App";

function NotesList() {
  const { notes, createNewNote } = useContext(Context) as NotesContext;
  const [searchInput, setSearchInput] = useState<string>("");
  const [indexes, setIndexes] = useState<number[]>([]);

  const onSearchHandler = (value: string) => {
    const result = search(value);
    if (!result.length) {
      setIndexes([]);
    } else setIndexes(result);
    setSearchInput(value);
  };

  const search = (tag: string) => {
    return notes.reduce((ind, el, index) => {
      if (el.tags.includes(tag)) {
        return [...ind, index];
      } else return ind;
    }, [] as number[]);
  };

  return (
    <div className="notes-list">
      <input
        className="search"
        placeholder="Type tag to search"
        value={searchInput}
        onChange={(e) => {
          onSearchHandler(e.target.value.trim());
        }}
      />
      <Button onClick={createNewNote}>New Note</Button>
      {searchInput.length
        ? indexes.map((index) => <Note note={index} key={index} />)
        : notes.map((note, index) => <Note note={index} key={index} />)}
    </div>
  );
}

export default NotesList;
