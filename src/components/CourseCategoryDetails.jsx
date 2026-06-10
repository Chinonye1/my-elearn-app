import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

export function CourseCategoryDetails() {
  const navigate = useNavigate();
  const { categoryName } = useParams();
  const selectedCategory = decodeURIComponent(categoryName);

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCourses() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/courses`,
        );

        const matchingCourses = response.data.filter((course) => {
          return (
            course.category?.trim().toLowerCase() ===
            selectedCategory.trim().toLowerCase()
          );
        });

        setCourses(matchingCourses);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }

    getCourses();
  }, [selectedCategory]);

  if (loading) return <h3>Loading {selectedCategory} courses...</h3>;

  return (
    <>
      <h1>{selectedCategory} Courses</h1>
      <p>Explore courses and details for this category.</p>

      {courses.length === 0 ? (
        <h3>No courses found in this category.</h3>
      ) : (
        <div className="courseListCard">
          {courses.map((course) => {
            return (
              <div key={course.id}>
                <img src={course.image} alt={course.title} />
                <h5>{course.category}</h5>
                <p>{course.title}</p>
                <h4>{course.tutorName}</h4>
                <h5>{course.price}</h5>
                <p>{course.duration}</p>
                <p>{course.description}</p>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/courses/details/${course.id}`)}
                >
                  View Details
                </Button>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
