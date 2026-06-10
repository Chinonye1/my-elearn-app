import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import { useState } from "react";

export function CreateCourse() {
  const [title, setTitle] = useState("");
  const [tutorName, setTutorName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [difficultyLevel, setDifficultyLevel] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");

  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const categoryOptions = [
    "Cloud and DevOps",
    "Data Science",
    "Mobile Development",
    "UI/UX",
    "Web Development",
  ];

  const difficultyOptions = [
    "Beginner",
    "Intermediate",
    "Advanced",
  ];


  async function postData(event) {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/courses`,
        {
          title,
          tutorName,
          category,
          price,
          difficultyLevel,
          description,
          duration,
          image,
          acceptedTerms,
        },
      );

      console.log("Course created:", response.data);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
      <h1>Create New Course</h1>
      <p>Fill in the details below to create and publish your course</p>

      <Box component="form" className="create-form" onSubmit={postData}>
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
          <Select
            value={category}
            displayEmpty
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <MenuItem value="" disabled>
              Category
            </MenuItem>
            {categoryOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
          <TextField
            label="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
          <Select
            value={difficultyLevel}
            displayEmpty
            onChange={(e) => setDifficultyLevel(e.target.value)}
            required
          >
            <MenuItem value="" disabled>
              Difficulty Level
            </MenuItem>
            {difficultyOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
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
          <FormControlLabel
            control={
              <Checkbox
                checked={acceptedTerms}
                onChange={(e) => setAcceptedTerms(e.target.checked)}
              />
            }
            label="I agree to the Terms and Conditions"
          />
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
}
