import NoteContext from "./NoteContext";
import { useState } from "react";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesinit = [];
  let [notes, setnotes] = useState(notesinit);

  // Fetch all Notes
  const fetchNotes = async () => {
    // to make API call
    const response = await fetch(`${host}/api/notes/fetchnotes/`, {
      method: "GET",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjViOTNjMDc4YjgyNzFhNzhiYWE1In0sImlhdCI6MTY3MzAxMzM2MH0.Aais8_hyiWG3_jxKfjgwbZs0tgycZ-U1HmXCArUghJ8",
      },
    });
    const fetchedNotes = await response.json();
    console.log("Notes", fetchedNotes);
    setnotes(fetchedNotes);
  };

  // ADD A NOTE
  const addNote = async (title, description, tag) => {
    // to make API call
    const response = await fetch(`${host}/api/notes/addnote/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjViOTNjMDc4YjgyNzFhNzhiYWE1In0sImlhdCI6MTY3MzAxMzM2MH0.Aais8_hyiWG3_jxKfjgwbZs0tgycZ-U1HmXCArUghJ8",
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    const note = await response.json();
    setnotes(notes.concat(note));
  };
  // DELETE A NOTE
  const deleteNote = async (id) => {
    // notes.splice()
    // API call

    const response = await fetch(`${host}/api/notes/delete/${id}/`, {
      method: "DELETE",
      headers: {
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjViOTNjMDc4YjgyNzFhNzhiYWE1In0sImlhdCI6MTY3MzAxMzM2MH0.Aais8_hyiWG3_jxKfjgwbZs0tgycZ-U1HmXCArUghJ8",
      },
    });

    console.log("deleting note", id);
    notes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(notes);
  };
  // EDIT A NOTE
  const editNote = async (id, title, description, tag) => {
    // API call
    const response = await fetch(`${host}/api/notes/updatenote/${id}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNiNjViOTNjMDc4YjgyNzFhNzhiYWE1In0sImlhdCI6MTY3MzAxMzM2MH0.Aais8_hyiWG3_jxKfjgwbZs0tgycZ-U1HmXCArUghJ8",
      },
      body: JSON.stringify({
        title,
        description,
        tag,
      }),
    });
    // const bodyjson = response.json();
    let Newnotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const ele = Newnotes[index];
      if (ele._id === id) {
        Newnotes[index].title = title;
        Newnotes[index].description = description;
        Newnotes[index].tag = tag;
        setnotes(Newnotes);
        break;
      }
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, fetchNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
