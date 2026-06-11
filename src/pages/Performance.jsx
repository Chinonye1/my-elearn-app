import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

const stats = [
  { label: "Courses", value: "1000+" },
  { label: "Students", value: "50,000+" },
  { label: "Certificates", value: "25,000+" },
  { label: "Success Rate", value: "94%" },
];

export function Performance() {
  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        justifyContent="space-between"
      >
        {stats.map((stat) => (
          <Paper key={stat.label} sx={{ flex: 1, p: 3, textAlign: "center" }}>
            <Typography variant="h4" color="primary" fontWeight={800}>
              {stat.value}
            </Typography>
            <Typography color="text.secondary">{stat.label}</Typography>
          </Paper>
        ))}
      </Stack>
    </Container>
  );
}
