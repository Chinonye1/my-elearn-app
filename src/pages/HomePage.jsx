import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import Elearnlogo from "../assets/logo.png";

export function HomePage() {
  const navigate = useNavigate();

  return (
    <Box component="section" sx={{ bgcolor: "background.paper" }}>
      <Container maxWidth="lg" sx={{ py: { xs: 6, md: 9 } }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 5, md: 8 }}
          alignItems="center"
        >
          <Stack spacing={3} sx={{ flex: 1 }}>
            <Typography color="primary" fontWeight={800}>
              Practical online learning
            </Typography>

            <Typography variant="h1" sx={{ fontSize: { xs: 42, md: 64 } }}>
              Learn Today, Lead Tomorrow
            </Typography>

            <Typography variant="h6" color="text.secondary" maxWidth={640}>
              Discover expert-led courses in technology, business, design, and
              personal development. Learn at your own pace, build practical
              skills, and take the next step in your career.
            </Typography>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/courses")}
              >
                Get started
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate("/instructor")}
              >
                Teach on Elearn
              </Button>
            </Stack>
          </Stack>

          <Box
            sx={{
              flex: 1,
              display: "grid",
              placeItems: "center",
              minHeight: 300,
            }}
          >
            <Box
              component="img"
              src={Elearnlogo}
              alt="Elearn"
              sx={{
                width: "min(100%, 360px)",
                aspectRatio: "1",
                objectFit: "contain",
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
}
