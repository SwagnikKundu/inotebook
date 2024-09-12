import { useState } from "react";
import noteContext from "./NoteContext";

const NoteState = (props) => {
  const initialNote = [];
  const host = "http://localhost:8080";
  const auth = localStorage.getItem('auth-token');
    

  const [notes, setNotes] = useState(initialNote);

  //FUNC 1: GET all Notes
  const getAllNotes = async () => {
    const response = await fetch(`${host}/api/notes/getall`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": `${auth}`,
      },
    });

    const json = await response.json();
    console.log(json);
    setNotes(json.notes);
  };

  //FUNC 2: ADD a Note
  const addNote = async (title, description, tags) => {
    try {
      const response = await fetch(`${host}/api/notes/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${auth}`,
        },
        body: JSON.stringify({ title, description, tags }),
      });

      const json = await response.json();
      // console.log(json.msg);
      setNotes(notes.concat(json.note));
      return json;
    } catch (error) {
      const json = { error: error, msg: "Something went wrong" };
      return json;
    }
  };

  //FUNC 3: EDIT a Note
  const updateNote = async (id, title, description, tags) => {
    try {
      const response = await fetch(`${host}/api/notes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${auth}`,
        },
        body: JSON.stringify({ title, description, tags }),
      });
  
      const json = await response.json();
      let newNotes = JSON.parse(JSON.stringify(notes));
      // Logic to edit in client
      for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if (element._id === id) {
          newNotes[index].title = title;
          newNotes[index].description = description;
          newNotes[index].tags = tags;
          break;
        }
      }
      setNotes(newNotes);
      return json;
    } catch (error) {
      const json = { error: error, msg: "Something went wrong" };
      return json;
    }
    
  };

  //FUNC 4: DELETE a Note
  const deleteNote = async (id) => {
    try{
      const response = await fetch(`${host}/api/notes/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "auth-token": `${auth}`,
        },
      });
  
      const json = await response.json();
  
      const newNotes = notes.filter((note) => {
        return note._id !== id;
      });
      setNotes(newNotes);
      return json;
    }catch (error) {
      const json = { error: error, msg: "Something went wrong" };
      return json;
    }
    
  };

  return (
    <noteContext.Provider
      value={{ notes, getAllNotes, addNote, updateNote, deleteNote }}
    >
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
