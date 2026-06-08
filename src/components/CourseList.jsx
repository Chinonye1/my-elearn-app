import { useEffect, useState } from "react";
import axios from "axios";

export function CourseList() {
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
      
      <div className="courseCard">
        {courses.map((course) => {
          return (
        
              <div key={course.id}  >
               
                
                  <img src={course.image} />
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
