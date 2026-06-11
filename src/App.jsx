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
import { CourseDetails } from "./components/CourseDetails";
import { CourseCategoryDetails } from "./components/CourseCategoryDetails";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

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
              <Performance />
              <Container maxWidth="lg" sx={{ pt: 2 }}>
                <Typography variant="h4">Featured Courses</Typography>
              </Container>
              <CourseList />
              <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Typography variant="h4">Explore Categories</Typography>
                <Typography color="text.secondary">
                  Find courses in your area of interest....Testing
                </Typography>
              </Container>
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
        <Route path="/courses/details/:courseId" element={<CourseDetails/> }/>
        <Route
          path="/courses/category/:categoryName"
          element={<CourseCategoryDetails />}
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
