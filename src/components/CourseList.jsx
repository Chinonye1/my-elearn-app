import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export function CourseList({ addToCart, isCourseLiked, toggleLike }) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/courses`,
        );

        setCourses(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) return <Typography sx={{ p: 3 }}>Loading courses...</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={3}
        sx={{
          "& > *": {
            width: {
              xs: "100%",
              sm: "calc(50% - 12px)",
              md: "calc(33.333% - 16px)",
            },
          },
        }}
      >
        {courses.slice(0, 6).map((course) => (
          <Card
            key={course.id}
            sx={{ display: "flex", flexDirection: "column" }}
          >
            <CardMedia
              component="img"
              height="170"
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
              <Typography color="text.secondary">{course.tutorName}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {course.duration} · {course.level || course.difficultyLevel}
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
              <Button
                variant={isCourseLiked(course.id) ? "contained" : "outlined"}
                color="error"
                fullWidth
                onClick={() => toggleLike(course.id)}
              >
                {isCourseLiked(course.id) ? "♥ Liked" : "♡ Like"}
              </Button>
              <Button
                variant="outlined"
                fullWidth
                onClick={() => navigate(`/courses/details/${course.id}`)}
              >
                View Details
              </Button>
              <Button
                variant="contained"
                fullWidth
                onClick={() => addToCart(course)}
              >
                Add to Cart
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
