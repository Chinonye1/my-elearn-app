import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Elearnlogo from "../assets/logo.png";

export function NavBar() {
  const navigate = useNavigate();

  return (
    <AppBar
      position="sticky"
      color="inherit"
      elevation={0}
      sx={{ borderBottom: 1, borderColor: "divider" }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 3, py: 1 }}>
          <Stack
            component={RouterLink}
            to="/"
            direction="row"
            spacing={1.25}
            alignItems="center"
            sx={{ color: "text.primary", textDecoration: "none" }}
          >
            <Box
              component="img"
              src={Elearnlogo}
              alt="Elearn logo"
              sx={{ width: 44, height: 44, objectFit: "contain" }}
            />
            <Typography variant="h6" fontWeight={800}>
              Elearn
            </Typography>
          </Stack>

          <Stack
            direction="row"
            spacing={1}
            sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
          >
            <Button component={RouterLink} to="/" color="inherit">
              Home
            </Button>
            <Button component={RouterLink} to="/courses" color="inherit">
              Courses
            </Button>
            <Button component={RouterLink} to="/learning" color="inherit">
              My Learning
            </Button>
            <Button component={RouterLink} to="/instructor" color="inherit">
              Instructor
            </Button>
          </Stack>

          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
          <Button variant="contained" onClick={() => navigate("/create")}>
            Create Course
          </Button>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
