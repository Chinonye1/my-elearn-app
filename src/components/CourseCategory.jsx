import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";

export function CourseCategory() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  function handleOnclick(categoryName) {
    setActiveCategory(categoryName);
    navigate(`/courses/category/${encodeURIComponent(categoryName)}`);
  }

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

  if (loading) return <h3>Loading categories...</h3>;

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
    <Grid container spacing={2}>
      {categoryNames.map((categoryName) => {
        const isActive = categoryName === activeCategory;

        return (
          <section
            key={categoryName}
            className={`categoryCard ${isActive ? "isActive" : ""}`}
          >
            <Grid sx={{ xs: 4, md: 2 }}>
              <CardContent>
                <Typography
                  gutterBottom
                  sx={{ color: "text.secondary", fontSize: 14 }}
                >
                  {categoryName}
                </Typography>
                <Typography variant="h5" component="div">
                  {groupedCourses[categoryName].length} courses
                </Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  onClick={() => handleOnclick(categoryName)}
                >
                  Learn More
                </Button>
              </CardActions>
            </Grid>

            {isActive && (
              <div className="categoryCourses">
                {groupedCourses[categoryName].map((course) => {
                  return (
                    <article key={course.id} className="categoryCourseCard">
                      <img src={course.image} alt={course.title} />
                      <p>{course.title}</p>
                      <h4>{course.tutorName}</h4>
                      <p>{course.duration}</p>
                      <p>{course.price}</p>
                      <Button
                        size="small"
                        onClick={() => navigate(`/courses/details/${course.id}`)}
                      >
                        View Details
                      </Button>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </Grid>
  );
}
