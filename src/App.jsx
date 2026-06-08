import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import { CourseList } from "./components/CourseList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseCategory } from "./components/CourseCategory";
import { Performance } from "./pages/Performance";

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <HomePage />
              <CourseList />
              
              
            </>
          }
        />
        <Route
          path="/homePage"
          element={
            <>
              <HomePage />
              <Performance/>
              <h2>Featured courses</h2>
              <CourseList />
                <h2>Explore Categories</h2>
                <p>Find courses in your area of interest</p>
      <CourseCategory/>
            </>
          }
        />
        <Route path="/courses" element={<CourseList />} />
        <Route path="/category" element={<CourseCategory />} />
      </Routes>
    
    </BrowserRouter>
  );
}

export default App;
