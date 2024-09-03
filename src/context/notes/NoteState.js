import react from "react";
import noteContext from "./NoteContext";

const NoteState = () => {
  const state = {
    name: "Swagnik",
  };
  return (
    <NoteState.provider value={state}>{props.children}</NoteState.provider>
  );
};

export default NoteState;
