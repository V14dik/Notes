import "./index.scss";
import { INote } from "../../models";
import { useContext, useEffect, useState } from "react";
import { Context, NotesContext } from "../../App";
import { Button } from "../Button";
import { TextArea } from "../TextArea";

interface NoteContentProps {
  note: number;
}

export const NoteContent = ({ note }: NoteContentProps) => {
  const { notes, setNotes } = useContext(Context) as NotesContext;

  const [editingNote, setNote] = useState<INote>(notes[note]);
  const [noteTags, setNoteTags] = useState<string>("");

  useEffect(() => {
    setNoteTags(editingNote.tags.map((tag) => `#${tag} `).join(""));
  }, [editingNote]);

  useEffect(() => {
    if (notes[note]) {
      setNote(notes[note]);
    }
  }, [note, notes]);

  const checkContent = () => {
    let newTags = editingNote.content
      .match(/#([\wа-яА-Я]+)/g)
      ?.map((tag) => {
        if (!editingNote.tags.includes(tag.replace(/#/, ""))) {
          return tag.replace(/#/, "");
        }
      })
      .filter((tag) => {
        return tag;
      });
    if (newTags) {
      setNote({
        ...editingNote,
        tags: [...editingNote.tags, ...(newTags as string[])],
      });
    }
  };

  return (
    <div className="note-edit">
      <Button
        onClick={() => {
          let newNotes: Array<INote> = [...notes];
          newNotes[note] = {
            ...editingNote,
            tags: [...noteTags.replace(/#/g, "").split(" ").filter(Boolean)],
          };
          setNotes(newNotes);
        }}
      >
        Save
      </Button>

      <TextArea
        value={editingNote ? editingNote.content : ""}
        onChange={(value) => {
          setNote({
            ...editingNote,
            content: value,
          });
        }}
        checkContent={checkContent}
        highlightedWords={editingNote.tags}
      />
      <textarea
        className="tags"
        placeholder="Tags"
        onKeyDown={(e) => {
          if (e.code === "Space") {
            const tags = noteTags.replace(/#/g, "").split(" ").filter(Boolean);
            setNote({
              ...editingNote,
              tags: tags,
            });
            e.preventDefault();
          }
        }}
        onChange={(event) => {
          setNoteTags(event.target.value);
        }}
        value={noteTags}
      />
    </div>
  );
};
