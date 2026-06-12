import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";

export function EditCourse() {
  const navigate = useNavigate();
  const { courseId } = useParams();

  const [title, setTitle] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getCourse() {
      try {
        // Pre-fill the form with the current course details before editing.
        const response = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`,
        );

        setTitle(response.data.title || "");
        setTutorName(response.data.tutorName || "");
        setCategory(response.data.category || "");
        setPrice(response.data.price || "");
        setDifficultyLevel(response.data.difficultyLevel || "");
        setDescription(response.data.description || "");
        setDuration(response.data.duration || "");
        setImage(response.data.image || "");
        setIsLoading(false);
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    }

    getCourse();
  }, [courseId]);

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      // Save the updated fields, then return to the instructor dashboard.
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`,
        {
          title,
          tutorName,
          category,
          price,
          difficultyLevel,
          description,
          duration,
          image,
        },
      );

      navigate("/instructor");
    } catch (err) {
      console.error(err);
    }
  }

  async function deleteCourse() {
    // Ask first because this permanently removes the course from the API data.
    const shouldDelete = window.confirm(
      `Are you sure you want to delete "${title}"?`,
    );

    if (!shouldDelete) return;

    try {
      await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`,
      );
      navigate("/instructor");
    } catch (error) {
      console.error(error);
    }
  }

  if (isLoading) return <Typography sx={{ p: 3 }}>Loading...</Typography>;

  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      <Stack spacing={1} sx={{ mb: 3 }}>
        <Typography variant="h3">Edit Course</Typography>
        <Typography color="text.secondary">
          Update your course details below.
        </Typography>
      </Stack>

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleFormSubmit}>
            <Stack spacing={2}>
              <TextField
                label="Course Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <TextField
                label="Instructor Name"
                value={tutorName}
                onChange={(e) => setTutorName(e.target.value)}
                required
                size="medium"
              />
              <TextField
                label="Category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              />
              <TextField
                label="Price (€)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <TextField
                label="Difficulty Level"
                value={difficultyLevel}
                onChange={(e) => setDifficultyLevel(e.target.value)}
              />
              <TextField
                label="Duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
              <TextField
                label="Image URL"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              />
              <TextField
                label="Course Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                multiline
                minRows={4}
              />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <Button type="submit" variant="contained">
                  Save Changes
                </Button>
                <Button
                  type="button"
                  variant="outlined"
                  color="error"
                  onClick={deleteCourse}
                >
                  Delete Course
                </Button>
              </Stack>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
}
