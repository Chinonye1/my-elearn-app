import { useState } from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
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

export function NavBar({ cartCount, mode, toggleThemeMode }) {
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  function toggleMobileMenu() {
    setMobileOpen((open) => !open);
  }

  const isDark = mode === "dark";
  const navButtonStyles = {
    color: isDark ? "#3b82f6" : "#2563eb",
    fontWeight: 800,
    "&:hover": {
      bgcolor: isDark ? "rgba(37, 99, 235, 0.16)" : "#dbeafe",
      color: isDark ? "#60a5fa" : "#1d4ed8",
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
            <Button
              component={RouterLink}
              to="/instructor"
              sx={navButtonStyles}
            >
              Instructor
            </Button>
            <Button component={RouterLink} to="/cart" sx={navButtonStyles}>
              Cart ({cartCount})
            </Button>
          </Stack>

          <Box sx={{ flexGrow: { xs: 1, md: 0 } }} />

          <IconButton
            onClick={toggleMobileMenu}
            sx={{
              display: { xs: "inline-flex", md: "none" },
              color: isDark ? "#3b82f6" : "primary.main",
            }}
          >
            <MenuIcon />
          </IconButton>
          
          <Fab
            variant="extended"
            size="medium"
            color="primary"
            onClick={() => navigate("/create")}
            sx={{
              display: { xs: "none", md: "inline-flex" },
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
          <Button
            variant="outlined"
            onClick={toggleThemeMode}
            sx={{
              display: { xs: "none", md: "inline-flex" },
              borderColor: isDark ? "#93c5fd" : "#2563eb",
              color: isDark ? "#bfdbfe" : "#2563eb",
              "&:hover": {
                borderColor: isDark ? "#bfdbfe" : "#1d4ed8",
                bgcolor: isDark ? "rgba(147, 197, 253, 0.12)" : "#dbeafe",
              },
            }}
          >
            {isDark ? "Light Mode" : "Dark Mode"}
          </Button>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={mobileOpen} onClose={toggleMobileMenu}>
        <List sx={{ width: 260, pt: 2 }}>
          <ListItemButton
            component={RouterLink}
            to="/"
            onClick={toggleMobileMenu}
          >
            <ListItemText primary="Home" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/courses"
            onClick={toggleMobileMenu}
          >
            <ListItemText primary="Courses" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/learning"
            onClick={toggleMobileMenu}
          >
            <ListItemText primary="My Learning" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/instructor"
            onClick={toggleMobileMenu}
          >
            <ListItemText primary="Instructor" />
          </ListItemButton>

          <ListItemButton
            component={RouterLink}
            to="/cart"
            onClick={toggleMobileMenu}
          >
            <ListItemText primary={`Cart (${cartCount})`} />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              toggleMobileMenu();
              navigate("/create");
            }}
          >
            <ListItemText primary="Create Course" />
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              toggleThemeMode();
              toggleMobileMenu();
            }}
          >
            <ListItemText primary={isDark ? "Light Mode" : "Dark Mode"} />
          </ListItemButton>
        </List>
      </Drawer>
    </AppBar>
  );
}
