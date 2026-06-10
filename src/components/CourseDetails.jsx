import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";

export function CourseDetails() {
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
        newReview
      );

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

  if (loading) return <h3>Loading course...</h3>;

  if (!course) return <h3>Course not found.</h3>;

  return (
    <>
      <section className="courseDetails">
        <img src={course.image} alt={course.title} />

        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <h4>Category: {course.category}</h4>
          <p>Instructor: {course.tutorName}</p>
          <p>Duration: {course.duration}</p>
          <p>Difficulty: {course.difficultyLevel || course.level}</p>
          <p>Price: {course.price}</p>

          <Button variant="outlined" onClick={() => navigate(-1)}>
            Back
          </Button>
        </div>
      </section>

      <section className="courseReviews">
        <h2>Student Reviews</h2>

        {reviews.length === 0 ? (
          <p>No reviews yet for this category.</p>
        ) : (
          <div className="reviewList">
            {reviews.map((review) => (
              <article key={review.id} className="reviewCard">
                <div className="reviewHeader">
                  <img
                    src={
                      review.studentImage ||
                      `https://ui-avatars.com/api/?name=${encodeURIComponent(
                        review.studentName
                      )}`
                    }
                    alt={review.studentName}
                  />
                  <div>
                    <h4>{review.studentName}</h4>
                    <p>{review.date}</p>
                  </div>
                </div>

                <p className="reviewRating">{"★".repeat(review.rating)}</p>
                <p>{review.comment}</p>
              </article>
            ))}
          </div>
        )}

        <Box component="form" className="reviewForm" onSubmit={addReview}>
          <h3>Leave a Review</h3>
          <Stack spacing={2}>
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
            <Button type="submit" variant="contained" disabled={submittingReview}>
              {submittingReview ? "Adding Review..." : "Add Review"}
            </Button>
          </Stack>
        </Box>
      </section>
    </>
  );
}
