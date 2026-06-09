import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

export function Courses() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/courses`,
      );

      setCourses(response.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCourse(courseId) {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`);
      setCourses((currentCourses) =>
        currentCourses.filter((course) => course.id !== courseId)
      );
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <h3>Loading courses...</h3>;

  return (
    <>
      <h1>All Courses</h1>
      <p>Explore our comprehensive library of courses</p>

      <Box sx={{ width: 500, maxWidth: "80%" }}>
        <TextField fullWidth label="Search courses" id="fullWidth" />
                   <Button variant="outlined" >All Courses</Button>

      </Box>

      <div>
        {courses.map((course) => (
          <Grid key={course.id}>
            <Button variant="contained">{course.category}</Button>
          </Grid>
        ))}
      </div>

      <p>Showing courses </p>

      <div className="courseCard">
        {courses.map((course) => {
          return (
            <div key={course.id}>
              <img src={course.image} />
              <h5>{course.category}</h5>
              <p> {course.title} </p>
              <h4>{course.tutorName}</h4>
              <h5>{course.price}</h5>
              <p>{course.duration}</p>
              <Button
                variant="outlined"
                onClick={() => navigate(`/courses/edit/${course.id}`)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteCourse(course.id)}
              >
                Delete
              </Button>
            </div>
          );
        })}
      </div>
    </>
  );
}
