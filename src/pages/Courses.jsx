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
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export function Courses({
  showManagementActions = false,
  title = "All Courses",
  description = "Explore our comprehensive library of courses",
  addToCart,
  isCourseLiked,
  toggleLike,
}) {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        // Load the catalog from the API configured in .env.local.
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

  async function deleteCourse(courseId, courseTitle) {
    // Confirm destructive actions before removing a course from the backend.
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${courseTitle}"?`,
    );

    if (!shouldDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`,
      );
      setCourses((currentCourses) =>
        currentCourses.filter((course) => course.id !== courseId),
      );
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <Typography sx={{ p: 3 }}>Loading courses...</Typography>;

  const groupedCourses = courses.reduce((groups, course) => {
    // Group courses for the category chips shown above the course grid.
    const categoryName = course.category?.trim() || "Uncategorized";

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(course);
    return groups;
  }, {});

  const categoryNames = Object.keys(groupedCourses).sort();

  const filteredCourses = courses.filter((course) => {
    const searchText = searchTerm.toLowerCase();
    const courseDifficulty = course.difficultyLevel || course.level || "";

    // Search covers the fields learners are most likely to remember.
    const matchesSearch =
      course.title.toLowerCase().includes(searchText) ||
      course.category.toLowerCase().includes(searchText) ||
      course.tutorName.toLowerCase().includes(searchText);

    const matchesDifficulty =
      difficultyFilter === "" || courseDifficulty === difficultyFilter;

    return matchesSearch && matchesDifficulty;
  });

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {(title || description) && (
        <Stack spacing={1} sx={{ mb: 4 }}>
          {title && <Typography variant="h3">{title}</Typography>}
          {description && (
            <Typography color="text.secondary">{description}</Typography>
          )}
        </Stack>
      )}

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2}>
            <TextField
              fullWidth
              label="Search courses"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            <TextField
              select
              fullWidth
              label="Difficulty"
              value={difficultyFilter}
              onChange={(event) => setDifficultyFilter(event.target.value)}
            >
              <MenuItem value="">All Levels</MenuItem>
              <MenuItem value="Beginner">Beginner</MenuItem>
              <MenuItem value="Intermediate">Intermediate</MenuItem>
              <MenuItem value="Advanced">Advanced</MenuItem>
            </TextField>
          </Stack>
        </CardContent>
      </Card>

      <Box
        sx={{
          mb: 3,
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, minmax(0, 1fr))",
            sm: "repeat(auto-fit, minmax(150px, 1fr))",
          },
          gap: 1.25,
        }}
      >
        <Button
          variant="contained"
          size="small"
          sx={{
            minHeight: 40,
            borderRadius: 999,
            px: 2,
            textTransform: "none",
            lineHeight: 1.2,
            whiteSpace: "normal",
          }}
        >
          All Courses ({courses.length})
        </Button>
        {categoryNames.map((categoryName) => (
          <Button
            key={categoryName}
            variant="outlined"
            size="small"
            sx={{
              maxWidth: "100%",
              minHeight: 40,
              borderRadius: 999,
              px: 2,
              lineHeight: 1.2,
              textTransform: "none",
              whiteSpace: "normal",
              overflowWrap: "anywhere",
            }}
            onClick={() =>
              navigate(`/courses/category/${encodeURIComponent(categoryName)}`)
            }
          >
            {categoryName} ({groupedCourses[categoryName].length})
          </Button>
        ))}
      </Box>

      <Typography color="text.secondary" sx={{ mb: 2 }}>
        Showing {filteredCourses.length} courses
      </Typography>

      {filteredCourses.length === 0 ? (
        <Card>
          <CardContent>
            <Typography variant="h6">No courses found.</Typography>
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
          {filteredCourses.map((course) => (
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
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  spacing={1}
                >
                  <Chip
                    label={course.category}
                    size="small"
                    color="primary"
                    variant="outlined"
                  />
                  {isCourseLiked && toggleLike && (
                    <Button
                      size="small"
                      variant={
                        isCourseLiked(course.id) ? "contained" : "outlined"
                      }
                      color="error"
                      onClick={() => toggleLike(course.id)}
                    >
                      {isCourseLiked(course.id) ? "♥ Liked" : "♡ Like"}
                    </Button>
                  )}
                </Stack>
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
                <Typography fontWeight={800} sx={{ mt: 1 }}>
                  €{course.price}
                </Typography>
              </CardContent>
              <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate(`/courses/details/${course.id}`)}
                >
                  View Details
                </Button>
                {addToCart && (
                  <Button variant="contained" onClick={() => addToCart(course)}>
                    Add to Cart
                  </Button>
                )}
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
              </CardActions>
            </Card>
          ))}
        </Box>
      )}
    </Container>
  );
}
