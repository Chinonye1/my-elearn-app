import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Link as RouterLink } from "react-router-dom";

function getCoursePrice(course) {
  return Number(String(course.price || 0).replace(/[^\d.]/g, ""));
}

export function Cart({ cartItems, removeFromCart }) {
  const totalPrice = cartItems.reduce((sum, course) => {
    return sum + getCoursePrice(course);
  }, 0);

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack spacing={1} sx={{ mb: 4 }}>
        <Typography variant="h3">Shopping Cart</Typography>
        <Typography color="text.secondary">
          Review the courses you want to buy.
        </Typography>
      </Stack>

      {cartItems.length === 0 ? (
        <Card>
          <CardContent>
            <Stack spacing={2} alignItems="flex-start">
              <Typography variant="h6">Your cart is empty.</Typography>
              <Button component={RouterLink} to="/courses" variant="contained">
                Browse Courses
              </Button>
            </Stack>
          </CardContent>
        </Card>
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "1fr", md: "2fr 1fr" },
            gap: 3,
          }}
        >
          <Stack spacing={2}>
            {cartItems.map((course) => (
              <Card key={course.id}>
                <CardContent>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={2}
                    alignItems={{ xs: "stretch", sm: "center" }}
                  >
                    <CardMedia
                      component="img"
                      image={course.image}
                      alt={course.title}
                      sx={{
                        width: { xs: "100%", sm: 150 },
                        height: 110,
                        borderRadius: 1,
                        objectFit: "cover",
                      }}
                    />
                    <Box sx={{ flexGrow: 1 }}>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography color="text.secondary">
                        {course.tutorName}
                      </Typography>
                      <Typography fontWeight={800} sx={{ mt: 1 }}>
                        €{getCoursePrice(course).toLocaleString()}
                      </Typography>
                    </Box>
                    <Button
                      variant="outlined"
                      color="error"
                      onClick={() => removeFromCart(course.id)}
                    >
                      Remove
                    </Button>
                  </Stack>
                </CardContent>
              </Card>
            ))}
          </Stack>

          <Card sx={{ height: "fit-content" }}>
            <CardContent>
              <Stack spacing={2}>
                <Typography variant="h5">Order Summary</Typography>
                <Stack direction="row" justifyContent="space-between">
                  <Typography color="text.secondary">Courses</Typography>
                  <Typography>{cartItems.length}</Typography>
                </Stack>
                <Divider />
                <Stack direction="row" justifyContent="space-between">
                  <Typography fontWeight={800}>Total</Typography>
                  <Typography fontWeight={800}>
                    €{totalPrice.toLocaleString()}
                  </Typography>
                </Stack>
                <Button variant="contained" fullWidth>
                  Checkout
                </Button>
                <Button
                  component={RouterLink}
                  to="/courses"
                  variant="outlined"
                  fullWidth
                >
                  Continue Shopping
                </Button>
              </Stack>
            </CardContent>
          </Card>
        </Box>
      )}
    </Container>
  );
}
