import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import Elearnlogo from "../assets/logo.png";
import Fab from "@mui/material/Fab";

export function NavBar({ cartCount }) {
  const navigate = useNavigate();
  const navButtonStyles = {
    color: "#2563eb",
    fontWeight: 800,
    "&:hover": {
      bgcolor: "#dbeafe",
      color: "#1d4ed8",
    },
  };

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
            <Button component={RouterLink} to="/" sx={navButtonStyles}>
              Home
            </Button>
            <Button component={RouterLink} to="/courses" sx={navButtonStyles}>
              Courses
            </Button>
            <Button component={RouterLink} to="/learning" sx={navButtonStyles}>
              My Learning
            </Button>
            <Button component={RouterLink} to="/instructor" sx={navButtonStyles}>
              Instructor
            </Button>
            <Button component={RouterLink} to="/cart" sx={navButtonStyles}>
              Cart ({cartCount})
            </Button>
          </Stack>

          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />
          <Button
            component={RouterLink}
            to="/cart"
            sx={{
              ...navButtonStyles,
              display: { xs: "inline-flex", md: "none" },
            }}
          >
            Cart ({cartCount})
          </Button>
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => navigate("/create")}
            sx={{
              bgcolor: "#2563eb",
              color: "white",
              px: 2.5,
              "&:hover": {
                bgcolor: "#1d4ed8",
              },
            }}
          >
            Create Course
          </Fab>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
