import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";

export function CourseCategoryDetails({ addToCart }) {
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
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getCourses();
  }, [selectedCategory]);

  if (loading) {
    return (
      <Typography sx={{ p: 3 }}>
        Loading {selectedCategory} courses...
      </Typography>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h3">{selectedCategory} Courses</Typography>
        <Typography color="text.secondary">
          Explore courses and details for this category.
        </Typography>
      </Stack>

      {courses.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6">
              No courses found in this category.
            </Typography>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(3, 1fr)",
            },
            gap: 3,
          }}
        >
          {courses.map((course) => (
            <Card
              key={course.id}
              sx={{ display: "flex", flexDirection: "column" }}
            >
              <CardMedia
                component="img"
                height="180"
                image={course.image}
                alt={course.title}
                sx={{ objectFit: "cover" }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Chip
                  label={course.category}
                  size="small"
                  color="primary"
                  variant="outlined"
                />
                <Typography variant="h6" sx={{ mt: 1.5 }}>
                  {course.title}
                </Typography>
                <Typography color="text.secondary">
                  {course.tutorName}
                </Typography>
                <Typography
                  variant="body2"
                  color="text.secondary"
                  sx={{ mt: 1 }}
                >
                  {course.duration} · {course.level || course.difficultyLevel}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 1 }}>
                  {course.description}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/courses/details/${course.id}`)}
                >
                  View Details
                </Button>
                <Button variant="contained" onClick={() => addToCart(course)}>
                  Add to Cart
                </Button>
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
