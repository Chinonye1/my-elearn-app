import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";

export function CourseList() {
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

  if (loading) return <h3>Loading courses...</h3>;

  return (
    <>
      <div className="courseListCard">
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
            </div>
          );
        })}
      </div>
    </>
  );
}
