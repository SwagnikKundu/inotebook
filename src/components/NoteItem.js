import React, { useContext } from "react";
import noteContext from "../context/notes/NoteContext";

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote, showAlert } = props;

  const handleDelete = async () => {
    try {
      const json = await deleteNote(note._id);
      if (json.error) {
        showAlert(json.msg, "danger");
      } else {
        showAlert(json.msg, "success");
      }
    } catch (error) {
      showAlert("An unexpected error occurred", "danger");
    }
  };

  return (
    <div className="col-md-3">
      <div className="card my-3" style={{ position: "relative" }}>
        {note.tags && (
          <span
            className="badge bg-dark text-bg-dark"
            style={{
              position: "absolute",
              top: "-10px", 
              right: "-10px", 
            }}
          >
            {note.tags}
          </span>
        )}
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="far fa-edit mx-2"
                onClick={() => updateNote(note)}
              ></i>
              <i
                className="far fa-trash-alt mx-2"
                onClick={handleDelete}
              ></i>
            </div>
          </div>
          <p className="card-text">{note.description}</p>
        </div>
      </div>
    </div>
  );
}
