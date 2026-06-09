import "./App.css";
import { HomePage } from "./pages/HomePage";
import { NavBar } from "./components/NavBar";
import { CourseList } from "./components/CourseList";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { CourseCategory } from "./components/CourseCategory";
import { Performance } from "./pages/Performance";
import { Courses } from "./pages/Courses";
import { Learning } from "./pages/Learning";
import { Instructor } from "./pages/Instructor";
import { CreateCourse } from "./components/CreateCourse";
import { EditCourse } from "./components/EditCourse";

function App() {
  return (
    <div>
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
              <Performance />
              <h2>Featured courses</h2>
              <CourseList />
              <h2>Explore Categories</h2>
              <p>Find courses in your area of interest</p>
              <CourseCategory />
            </>
          }
        />
        <Route path="/courses" element={<Courses />} />
        
        <Route path="/category" element={<CourseCategory />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="/courses/edit/:courseId" element={ <EditCourse /> } />
        <Route path="/courses/:details" element="tests" />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
