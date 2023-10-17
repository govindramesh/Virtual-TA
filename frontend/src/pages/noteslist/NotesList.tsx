import NotesList from "../../components/NotesList";
import { file } from "../../constants/Files";
import { useEffect, useState } from "react";
const NotesListHome = () => {
  const [notes, setNotes] = useState(null);
  useEffect(() => {
    const fetchNotes = async () => {
      const response = await fetch("http://localhost:4000/api/notes");
      const json = await response.json();
      console.log(json);
      if (response.ok) {
        setNotes(json);
      }
    };

    fetchNotes();
  }, []);
  return (
    <>
      {notes && <NotesList files={notes} />}
      <p>hi</p>
    </>
  );
};

export default NotesListHome;
