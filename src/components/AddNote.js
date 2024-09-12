import React, { useContext, useState } from "react";
import noteContext from "../context/notes/NoteContext";

export default function AddNote(props) {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    tags: "General",
    description: "",
  });

  const handleAddNote = async(e) => {
    e.preventDefault();
    const json = await addNote(note.title, note.description, note.tags);
    if(json.error)
      props.showAlert(json.msg,'danger');
    props.showAlert(json.msg,'success');

  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <>
      <div className="container">
        <h2>Add a Note</h2>
        <form className="my-3 ">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter note title"
              minLength={3}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group mt-3">
            <label htmlFor="tags">Tags</label>
            <select
              className="form-control"
              id="tags"
              name="tags"
              onChange={onChange}
              value={"General"}
            >
              <option value="General">General</option>
              <option value="Travel">Travel</option>
              <option value="Goals">Goals</option>
              <option value="Grocery">Grocery</option>
              <option value="Ideas">Ideas</option>
              <option value="Project">Project</option>
              <option value="Reminder">Reminder</option>
            </select>
          </div>
          <div className="form-group mt-3">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              className="form-control"
              id="description"
              placeholder="Enter note description"
              minLength={3}
              onChange={onChange}
              name="description"
              required
            />
          </div>
          <button
            disabled={note.title.length < 5 || note.description.length<5}
            type="submit"
            className="btn btn-primary m-3"
            onClick={handleAddNote}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
