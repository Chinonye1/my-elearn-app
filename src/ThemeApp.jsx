import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import App from "./App.jsx";

export function ThemeApp() {
  // Start with the learner's saved theme, then fall back to light mode.
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("themeMode") || "light";
  });

  const theme = useMemo(() => {
    const isDark = mode === "dark";

    // Rebuild the Material UI theme only when the mode changes.
    return createTheme({
      palette: {
        mode,
        primary: {
          main: "#2563eb",
        },
        secondary: {
          main: "#0f766e",
        },
        background: {
          default: isDark ? "#111827" : "#f6f8fb",
          paper: isDark ? "#1f2937" : "#ffffff",
        },
        text: {
          primary: isDark ? "#f9fafb" : "#111827",
          secondary: isDark ? "#cbd5e1" : "#5b6472",
        },
      },
      shape: {
        borderRadius: 8,
      },
      typography: {
        fontFamily: 'Inter, system-ui, "Segoe UI", Roboto, sans-serif',
        h1: {
          fontWeight: 800,
          letterSpacing: 0,
        },
        h2: {
          fontWeight: 750,
          letterSpacing: 0,
        },
        h3: {
          fontWeight: 700,
          letterSpacing: 0,
        },
        button: {
          fontWeight: 700,
          textTransform: "none",
        },
      },
      components: {
        MuiButton: {
          defaultProps: {
            disableElevation: true,
          },
        },
        MuiCard: {
          styleOverrides: {
            root: {
              border: `1px solid ${isDark ? "#334155" : "#e5e7eb"}`,
              boxShadow: isDark
                ? "0 12px 30px rgba(0, 0, 0, 0.28)"
                : "0 12px 30px rgba(15, 23, 42, 0.06)",
            },
          },
        },
      },
    });
  }, [mode]);

  function toggleThemeMode() {
    setMode((currentMode) => {
      const nextMode = currentMode === "light" ? "dark" : "light";
      localStorage.setItem("themeMode", nextMode);
      return nextMode;
    });
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App mode={mode} toggleThemeMode={toggleThemeMode} />
    </ThemeProvider>
  );
}
