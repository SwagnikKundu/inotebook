import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import Login from "./components/Login";
import NoteState from "./context/notes/NoteState";
import Alert from "./components/Alert";
import SignUp from "./components/SignUp";
import UserState from "./context/users/UserState";
import { useState } from "react";

function App() {
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) =>{
    setAlert({
      msg: message,
      type: type,
    });

    setTimeout(()=>{
      setAlert(null);
    },3000);
  }
  return (
    <>
      <UserState>
        <NoteState>
          <BrowserRouter>
            <Navbar title="NoteRush" />
            <div className="container" style={{ marginTop: "80px" }}>
              <Alert alert={alert}/>
              <Routes>
                <Route exact path="/" element={<Home showAlert={showAlert}/>} />
                <Route exact path="/about" element={<About showAlert={showAlert}/>} />
                <Route exact path="/signup" element={<SignUp showAlert={showAlert}/>} />
                <Route exact path="/login" element={<Login showAlert={showAlert}/>} />
              </Routes>
            </div>
          </BrowserRouter>
        </NoteState>
      </UserState>
    </>
  );
}

export default App;
