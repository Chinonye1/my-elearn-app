import "./App.css";
import { useEffect, useState } from "react";
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
import { Cart } from "./components/Cart";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

function App({ mode, toggleThemeMode }) {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [likedCourseIds, setLikedCourseIds] = useState(() => {
    const savedLikes = localStorage.getItem("likedCourseIds");
    return savedLikes ? JSON.parse(savedLikes) : [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("likedCourseIds", JSON.stringify(likedCourseIds));
  }, [likedCourseIds]);

  function addToCart(course) {
    setCartItems((currentItems) => {
      const alreadyInCart = currentItems.some((item) => item.id === course.id);

      if (alreadyInCart) {
        return currentItems;
      }

      return [...currentItems, course];
    });
  }

  function removeFromCart(courseId) {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== courseId),
    );
  }

  function toggleLike(courseId) {
    setLikedCourseIds((currentIds) => {
      if (currentIds.includes(courseId)) {
        return currentIds.filter((id) => id !== courseId);
      }

      return [...currentIds, courseId];
    });
  }

  function isCourseLiked(courseId) {
    return likedCourseIds.includes(courseId);
  }

  return (
    <div>
    <BrowserRouter>
      <NavBar
        cartCount={cartItems.length}
        mode={mode}
        toggleThemeMode={toggleThemeMode}
      />
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
              <CourseList
                addToCart={addToCart}
                isCourseLiked={isCourseLiked}
                toggleLike={toggleLike}
              />
              <Container maxWidth="lg" sx={{ pt: 4 }}>
                <Typography variant="h4">Explore Categories</Typography>
                <Typography color="text.secondary">
                  Find courses in your area of interest.
                </Typography>
              </Container>
              <CourseCategory />
            </>
          }
        />
        <Route
          path="/courses"
          element={
            <Courses
              addToCart={addToCart}
              isCourseLiked={isCourseLiked}
              toggleLike={toggleLike}
            />
          }
        />
        
        <Route path="/category" element={<CourseCategory />} />
        <Route
          path="/learning"
          element={
            <Learning
              isCourseLiked={isCourseLiked}
              toggleLike={toggleLike}
            />
          }
        />
        <Route path="/instructor" element={<Instructor />} />
        <Route path="/create" element={<CreateCourse />} />
        <Route path="/courses/edit/:courseId" element={ <EditCourse /> } />
        <Route
          path="/courses/details/:courseId"
          element={
            <CourseDetails
              addToCart={addToCart}
              isCourseLiked={isCourseLiked}
              toggleLike={toggleLike}
            />
          }
        />
        <Route
          path="/courses/category/:categoryName"
          element={
            <CourseCategoryDetails addToCart={addToCart} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart cartItems={cartItems} removeFromCart={removeFromCart} />
          }
        />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
