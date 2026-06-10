import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";

export function Courses({
  showManagementActions = false,
  title = "All Courses",
  description = "Explore our comprehensive library of courses",
}) {
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
      setLoading(false);
    }
  }

  async function deleteCourse(courseId, courseTitle) {
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${courseTitle}"?`
    );

    if (!shouldDelete) return;

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

  const groupedCourses = courses.reduce((groups, course) => {
    const categoryName = course.category?.trim() || "Uncategorized";

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(course);
    return groups;
  }, {});

  const categoryNames = Object.keys(groupedCourses).sort();

  return (
    <>
      {title && <h1>{title}</h1>}
      {description && <p>{description}</p>}

      <Box sx={{ width: 500, maxWidth: "80%" }}>
        <TextField fullWidth label="Search courses" id="fullWidth" />
        <Button variant="outlined">All Courses ({courses.length})</Button>

      </Box>

      <div className="categoryButtonList">
        {categoryNames.map((categoryName) => (
          <Grid key={categoryName}>
            <Button
              variant="contained"
              onClick={() =>
                navigate(`/courses/category/${encodeURIComponent(categoryName)}`)
              }
            >
              {categoryName} ({groupedCourses[categoryName].length})
            </Button>
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
                onClick={() => navigate(`/courses/details/${course.id}`)}
              >
                View Details
              </Button>
              {showManagementActions && (
                <>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/courses/edit/${course.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={() => deleteCourse(course.id, course.title)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
