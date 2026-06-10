import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate, useParams } from "react-router-dom";

export function CourseDetails() {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    async function getCourse() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`
        );

        setCourse(response.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }

    getCourse();
  }, [courseId]);

  if (loading) return <h3>Loading course...</h3>;

  if (!course) return <h3>Course not found.</h3>;

  return (
    <>
      <section className="courseDetails">
        <img src={course.image} alt={course.title} />

        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <h4>Category: {course.category}</h4>
          <p>Instructor: {course.tutorName}</p>
          <p>Duration: {course.duration}</p>
          <p>Difficulty: {course.difficultyLevel}</p>
          <p>Price: {course.price}</p>

          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </section>
    </>
  );
}
