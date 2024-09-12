import AddNote from "./AddNote";
import NoteItem from "./NoteItem";
import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/NoteContext";
import { useNavigate } from "react-router-dom";

export default function Note(props) {
  const context = useContext(noteContext);
  const { notes, getAllNotes, updateNote } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("auth-token")) getAllNotes();
    else navigate("/login");
    // eslint-disable-next-line
  }, []);

  const ref = useRef(null);
  const [note, setNote] = useState({
    eid: "",
    etitle: "",
    edescription: "",
    etags: "",
  });

  const updateClick = (currentNote) => {
    ref.current.click();
    setNote({
      eid: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etags: currentNote.tags,
    });
  };

  const handleClick = async (e) => {
    const json = await updateNote(
      note.eid,
      note.etitle,
      note.edescription,
      note.etags
    );
    ref.current.click();
    if (json.error) props.showAlert(json.msg, "danger");
    props.showAlert(json.msg, "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote showAlert={props.showAlert} />
      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch Edit Note modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onChange}
                    minLength={5}
                  />
                </div>
                <div className="mb-3">
                  <div className="form-group">
                    <label htmlFor="tags">Tags</label>
                    <select
                      className="form-control"
                      id="tags"
                      name="tags"
                      onChange={onChange}
                      value={note.etags}
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
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    minLength={5}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                disabled={
                  note.etitle.length < 5 || note.edescription.length < 5
                }
                onClick={handleClick}
                type="button"
                className="btn btn-primary"
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>You Notes</h2>
        <div className="container mx-2">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <NoteItem
              key={note._id}
              updateNote={updateClick}
              note={note}
              showAlert={props.showAlert}
            />
          );
        })}
      </div>
    </div>
  );
}
