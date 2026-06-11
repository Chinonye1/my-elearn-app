import { useEffect, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
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

  if (loading) return <Typography sx={{ p: 3 }}>Loading categories...</Typography>;

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
    <Container maxWidth="lg" sx={{ py: 3 }}>
      <Stack
        direction="row"
        flexWrap="wrap"
        gap={2}
        sx={{ "& > *": { width: { xs: "100%", sm: "calc(50% - 8px)", md: "calc(25% - 12px)" } } }}
      >
        {categoryNames.map((categoryName) => (
          <Card key={categoryName}>
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
                  navigate(`/courses/category/${encodeURIComponent(categoryName)}`)
                }
              >
                Explore
              </Button>
            </CardActions>
          </Card>
        ))}
      </Stack>
    </Container>
  );
}
