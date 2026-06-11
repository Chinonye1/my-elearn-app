import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const learningStats = [
  { label: "Hours Learned", value: "40" },
  { label: "Courses Enrolled", value: "3" },
  { label: "Certificates", value: "3" },
  { label: "Day Streak", value: "7" },
];

export function Learning({ isCourseLiked, toggleLike }) {
  const navigate = useNavigate();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/courses`,
        );

        setMyCourses(response.data);
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
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h3">My Learning</Typography>
        <Typography color="text.secondary">
          Track your progress and continue learning.
        </Typography>
      </Stack>

      <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mb: 5 }}>
        {learningStats.map((stat) => (
          <Paper key={stat.label} sx={{ flex: 1, p: 3 }}>
            <Typography color="text.secondary">{stat.label}</Typography>
            <Typography variant="h4" color="primary" fontWeight={800}>
              {stat.value}
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Typography variant="h4" sx={{ mb: 2 }}>
        Continue Learning
      </Typography>

      <Stack spacing={2}>
        {myCourses.slice(0, 3).map((course) => (
          <Card key={course.id}>
            <Stack direction={{ xs: "column", md: "row" }}>
              <CardMedia
                component="img"
                image={course.image}
                alt={course.title}
                sx={{
                  width: { xs: "100%", md: 260 },
                  height: { xs: 180, md: "auto" },
                  objectFit: "cover",
                }}
              />
              <CardContent sx={{ flex: 1 }}>
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
              </CardContent>
              <CardActions
                sx={{
                  p: 2,
                  gap: 1,
                  alignItems: { xs: "stretch", md: "flex-end" },
                  flexDirection: { xs: "row", md: "column" },
                  justifyContent: "center",
                  minWidth: { md: 150 },
                }}
              >
                <Button
                  variant={isCourseLiked(course.id) ? "contained" : "outlined"}
                  color="error"
                  onClick={() => toggleLike(course.id)}
                >
                  {isCourseLiked(course.id) ? "♥ Liked" : "♡ Like"}
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/courses/details/${course.id}`)}
                >
                  Continue
                </Button>
              </CardActions>
            </Stack>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
