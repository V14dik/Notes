import bin from "../../../assets/svg/bin.svg"
import "./index.scss";
import { useContext } from "react";
import { Context, NotesContext } from "../../../App";

interface NoteProps {
    note: number
}

export const Note = ({note}: NoteProps) => {

    const {notes,setNotes, setChoosenNote} = useContext(Context) as NotesContext;

    return (
        <div className="note" onClick={() => setChoosenNote(note)}>
            <span>{notes[note].content}</span>
            <img className="bin" src={bin} alt="delete note" onClick={(e) => {
                e.stopPropagation();
                setNotes([
                    ...notes.slice(0, note), ...notes.slice(note + 1, notes.length)
                ]);
            }}/>
        </div>
    )
}