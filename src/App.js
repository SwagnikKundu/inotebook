import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/Navbar";
import "./App.css";
import Home from "./components/Home";
import About from "./components/About";
import User from "./components/User";

function App() {
  const [mode, setMode] = useState("light");

  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.background = "#042743";
    } else {
      setMode("light");
      document.body.style.background = "white";
    }
  };

  return (
    <>
      <BrowserRouter>
        <Navbar title="NoteRush" mode={mode} toggleMode={toggleMode} />
        <Routes>
          <Route exact path="/" element={Home} />
          <Route exact path="/about" element={About} />
          <Route exact path="/user" element={User} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
