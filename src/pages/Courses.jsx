import { useEffect, useState } from "react";
import axios from "axios";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { purple } from "@mui/material/colors";
import { Grid } from "@mui/material";

export function Courses() {
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
            </div>
          );
        })}
      </div>
    </>
  );
}
