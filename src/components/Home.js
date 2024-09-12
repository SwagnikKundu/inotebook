import React from "react";
import Note from "./Note";


export default function Home(props) {
  return (
    <div>
      <Note showAlert={props.showAlert}/>
    </div>
  );
}
