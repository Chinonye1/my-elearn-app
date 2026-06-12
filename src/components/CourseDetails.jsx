import { useEffect, useState } from "react";
import axios from "axios";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";

export function CourseDetails({ addToCart, isCourseLiked, toggleLike }) {
  const [course, setCourse] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [studentImage, setStudentImage] = useState("");
  const [rating, setRating] = useState("5");
  const [comment, setComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);

  const navigate = useNavigate();
  const { courseId } = useParams();

  useEffect(() => {
    async function getCourse() {
      try {
        // Load the selected course first so its category can pull matching reviews.
        const courseResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/courses/${courseId}`,
        );
        const selectedCourse = courseResponse.data;

        const reviewsResponse = await axios.get(
          `${import.meta.env.VITE_SERVER_URL}/reviews`,
          {
            params: {
              category: selectedCourse.category,
            },
          },
        );

        setCourse(selectedCourse);
        setReviews(reviewsResponse.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    getCourse();
  }, [courseId]);

  async function addReview(event) {
    event.preventDefault();

    if (!course) return;

    // Store the review with both course and category context for easier filtering.
    const newReview = {
      courseId: Number(courseId),
      category: course.category,
      studentName,
      studentImage,
      rating: Number(rating),
      comment,
      date: new Date().toISOString().slice(0, 10),
    };

    try {
      setSubmittingReview(true);
      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/reviews`,
        newReview,
      );

      // Put the newest review first so the learner sees their feedback immediately.
      setReviews((currentReviews) => [response.data, ...currentReviews]);
      setStudentName("");
      setStudentImage("");
      setRating("5");
      setComment("");
    } catch (error) {
      console.error(error);
    } finally {
      setSubmittingReview(false);
    }
  }

  if (loading) return <Typography sx={{ p: 3 }}>Loading course...</Typography>;

  if (!course) return <Typography sx={{ p: 3 }}>Course not found.</Typography>;

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Card sx={{ overflow: "hidden", mb: 4 }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
          }}
        >
          <CardMedia
            component="img"
            image={course.image}
            alt={course.title}
            sx={{ height: { xs: 260, md: "100%" }, minHeight: { md: 420 } }}
          />
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Stack spacing={2}>
              <Chip
                label={course.category}
                color="primary"
                sx={{ width: "fit-content" }}
              />
              <Typography variant="h3">{course.title}</Typography>
              <Typography color="text.secondary">
                {course.description}
              </Typography>

              <Stack spacing={1.25}>
                <Typography>Instructor: {course.tutorName}</Typography>
                <Typography>Duration: {course.duration}</Typography>
                <Typography>
                  Difficulty: {course.difficultyLevel || course.level}
                </Typography>
                <Typography fontWeight={800}>Price: €{course.price}</Typography>
              </Stack>

              <Stack direction="row" spacing={1} flexWrap="wrap">
                <Button
                  variant={isCourseLiked(course.id) ? "contained" : "outlined"}
                  color="error"
                  onClick={() => toggleLike(course.id)}
                >
                  {isCourseLiked(course.id) ? "♥ Liked" : "♡ Like"}
                </Button>
                <Button variant="contained" onClick={() => addToCart(course)}>
                  Add to Cart
                </Button>
                <Button variant="outlined" onClick={() => navigate(-1)}>
                  Back
                </Button>
              </Stack>
            </Stack>
          </CardContent>
        </Box>
      </Card>

      <Stack spacing={3}>
        <Typography variant="h4">Student Reviews</Typography>

        {reviews.length === 0 ? (
          <Card>
            <CardContent>
              <Typography>No reviews yet for this category.</Typography>
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
              gap: 2,
            }}
          >
            {reviews.map((review) => (
              <Card key={review.id}>
                <CardContent>
                  <Stack spacing={2}>
                    <Stack direction="row" spacing={1.5} alignItems="center">
                      <Avatar
                        src={review.studentImage}
                        alt={review.studentName}
                      >
                        {review.studentName?.[0]}
                      </Avatar>
                      <Box>
                        <Typography fontWeight={800}>
                          {review.studentName}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {review.date}
                        </Typography>
                      </Box>
                    </Stack>
                    <Typography color="#b7791f">
                      {"★".repeat(review.rating)}
                    </Typography>
                    <Typography color="text.secondary">
                      {review.comment}
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}

        <Card component="form" onSubmit={addReview}>
          <CardContent>
            <Stack spacing={2}>
              <Typography variant="h5">Leave a Review</Typography>
              <TextField
                label="Your Name"
                value={studentName}
                onChange={(event) => setStudentName(event.target.value)}
                required
              />
              <TextField
                label="Image URL"
                value={studentImage}
                onChange={(event) => setStudentImage(event.target.value)}
              />
              <TextField
                select
                label="Rating"
                value={rating}
                onChange={(event) => setRating(event.target.value)}
                required
              >
                <MenuItem value="5">5 stars</MenuItem>
                <MenuItem value="4">4 stars</MenuItem>
                <MenuItem value="3">3 stars</MenuItem>
                <MenuItem value="2">2 stars</MenuItem>
                <MenuItem value="1">1 star</MenuItem>
              </TextField>
              <TextField
                label="Review"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                multiline
                minRows={4}
                required
              />
              <Button
                type="submit"
                variant="contained"
                disabled={submittingReview}
                sx={{ width: "fit-content" }}
              >
                {submittingReview ? "Adding Review..." : "Add Review"}
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Container>
  );
}
