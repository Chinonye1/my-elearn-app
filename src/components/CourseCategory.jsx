import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

export function CourseCategory() {
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

  if (loading)
    return <Typography sx={{ p: 3 }}>Loading categories...</Typography>;

  const groupedCourses = courses.reduce((groups, course) => {
    // Build category cards directly from the course data.
    const categoryName = course.category?.trim() || "Uncategorized";

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(course);
    return groups;
  }, {});

  const categoryNames = Object.keys(groupedCourses).sort();

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(3, 1fr)",
            lg: "repeat(4, 1fr)",
          },
          gap: 3,
        }}
      >
        {categoryNames.map((categoryName) => (
          <Card
            key={categoryName}
            sx={{
              height: "100%",
              transition:
                "transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease",
              "&:hover": {
                transform: "translateY(-8px)",
                borderColor: "primary.main",
                boxShadow: 8,
              },
            }}
          >
            <CardContent>
              <Typography color="text.secondary" gutterBottom>
                Category
              </Typography>
              <Typography variant="h6">{categoryName}</Typography>
              <Typography color="text.secondary" sx={{ mt: 1 }}>
                {groupedCourses[categoryName].length} courses
              </Typography>
            </CardContent>
            <CardActions sx={{ px: 2, pb: 2 }}>
              <Button
                variant="outlined"
                onClick={() =>
                  navigate(
                    `/courses/category/${encodeURIComponent(categoryName)}`,
                  )
                }
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Container>
  );
}
