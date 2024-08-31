import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Controller from "./components/Controller";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { RootState } from "./components/redux/store";
import { useSelector } from "react-redux";
import { PaletteMode } from "@mui/material";

const App = () => {
  const mode = useSelector((state: RootState) =>
    state.theme.mode ? "dark" : "light"
  );

  const getDesignTokens = (mode: PaletteMode) => ({
    palette: {
      mode,
      ...(mode === "light"
        ? {
            primary: {
              main: "#1976d2",
            },
          }
        : {
            primary: {
              main: "#000000",
            },
          }),
    },
    components: {
      MuiTypography: {
        styleOverrides: {
          h5: {
            ...(mode === "dark" && {
              color: "#A020F0",
            }),
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            ...(mode === "dark"
              ? {
                  backgroundColor: "#A020F0",
                }
              : {
                  backgroundColor: "#1976d2",
                }),
          },
        },
      },
    },
  });

  const appTheme = React.useMemo(
    () => createTheme(getDesignTokens(mode)),
    [mode]
  );

  return (
    <Router>
      <ThemeProvider theme={appTheme}>
        <CssBaseline />
        <Controller />
      </ThemeProvider>
    </Router>
  );
};

export default App;
