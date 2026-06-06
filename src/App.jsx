import { useState } from "react";

import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import {Button} from "./components/Button"

function App() {
  return (
    <>
      <NavBar Button={Button}/>
      
    </>
  );
}

export default App;
