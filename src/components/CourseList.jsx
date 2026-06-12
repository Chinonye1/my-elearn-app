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
import { useNavigate } from "react-router-dom";

export function CourseList({
  addToCart,
  isCourseLiked,
  toggleLike,
  moving = false,
}) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        // Fetch once for the featured course section on the home page.
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

  const featuredCourses = courses.slice(0, 6);

  function renderCourseCard(course) {
    // Shared card markup keeps the moving and static layouts consistent.
    return (
      <Card
        key={course.id}
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          transition: "transform 180ms ease, box-shadow 180ms ease",
          "&:hover": {
            transform: "translateY(-6px)",
            boxShadow: 8,
          },
        }}
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
    );
  }

  if (moving) {
    return (
      <Container maxWidth="lg" sx={{ py: 3, overflow: "hidden" }}>
        <Box
          sx={{
            display: "flex",
            overflow: "hidden",
            py: 1,
            "@keyframes courseSlide": {
              "0%": { transform: "translateX(0)" },
              "100%": { transform: "translateX(-50%)" },
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              gap: 3,
              minWidth: "max-content",
              animation: "courseSlide 28s linear infinite",
              "&:hover": {
                animationPlayState: "paused",
              },
            }}
          >
            {/* Duplicate the list so the sliding row can loop smoothly. */}
            {[...featuredCourses, ...featuredCourses].map((course, index) => (
              <Box
                key={`${course.id}-${index}`}
                sx={{
                  width: {
                    xs: 280,
                    sm: 330,
                    md: 350,
                  },
                  flex: "0 0 auto",
                }}
              >
                {renderCourseCard(course)}
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    );
  }

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
        {featuredCourses.map((course) => renderCourseCard(course))}
      </Stack>
    </Container>
  );
}
