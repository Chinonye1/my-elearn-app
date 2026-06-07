import { useState } from "react";

import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import { CourseList } from "./components/CourseList";
import { BrowserRouter } from "react-router-dom";
import { CourseCategory } from "./components/CourseCategory";


function App() {
  return (
    <>
      <NavBar />
      <CourseList/>

      <BrowserRouter>

       <Route path="/Category" element={<CourseCategory />} />
      
      
      
      </BrowserRouter>
      
    </>
  );
}

export default App;
