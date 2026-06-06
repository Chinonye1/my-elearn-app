import { useState } from "react";

import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import { CourseList } from "./components/CourseList";

function App() {
  return (
    <>
      <NavBar />
      <CourseList/>
      
    </>
  );
}

export default App;
