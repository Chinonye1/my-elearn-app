import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { Courses } from "./Courses";

const instructorStats = [
  { label: "Total Courses", value: "4" },
  { label: "Total Students", value: "4,625" },
  { label: "Total Revenue", value: "$46,250" },
  { label: "Published", value: "3" },
];

export function Instructor() {
  const navigate = useNavigate();

  return (
    <>
      <Container maxWidth="lg" sx={{ py: 5 }}>
        <Stack
          direction={{ xs: "column", md: "row" }}
          justifyContent="space-between"
          alignItems={{ xs: "flex-start", md: "center" }}
          spacing={2}
          sx={{ mb: 4 }}
        >
          <Stack spacing={1}>
            <Typography variant="h3">Instructor Dashboard</Typography>
            <Typography color="text.secondary">
              Manage your courses and track your performance.
            </Typography>
          </Stack>
          <Button variant="contained" onClick={() => navigate("/create")}>
            Create Course
          </Button>
        </Stack>

        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ mb: 5 }}
        >
          {instructorStats.map((stat) => (
            <Paper key={stat.label} sx={{ flex: 1, p: 3 }}>
              <Typography color="text.secondary">{stat.label}</Typography>
              <Typography variant="h4" color="primary" fontWeight={800}>
                {stat.value}
              </Typography>
            </Paper>
          ))}
        </Stack>

        <Typography variant="h4">My Courses</Typography>
      </Container>

      <Courses showManagementActions title="" description="" />
    </>
  );
}
