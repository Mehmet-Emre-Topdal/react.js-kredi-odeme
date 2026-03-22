import React from "react";
import "./App.css";
import FormComponent from "./Components/FormComponent";
import PlanComponent from "./Components/PlanComponent";
import { AppContextProvider } from "./store/app-context";
import { ModalContextProvider } from "./store/dialog-context";
import {
  ThemeProvider,
  createTheme,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Container,
} from "@mui/material";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";

const theme = createTheme({
  palette: {
    primary: { main: "#1565c0" },
    secondary: { main: "#d32f2f" },
  },
  typography: {
    fontFamily: '"Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: 12 },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: { borderRadius: 8, textTransform: "none", fontWeight: 600 },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContextProvider>
        <ModalContextProvider>
          <Box sx={{ minHeight: "100vh", backgroundColor: "#eef2f7" }}>
            <AppBar position="static" elevation={2} color="primary">
              <Toolbar>
                <AccountBalanceIcon sx={{ mr: 1.5, fontSize: 28 }} />
                <Typography variant="h6" fontWeight={700} letterSpacing={1}>
                  MET BANK
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ ml: 2, opacity: 0.75, fontWeight: 400, display: { xs: "none", sm: "block" } }}
                >
                  Kredi Geri Ödeme Planlayıcı
                </Typography>
              </Toolbar>
            </AppBar>
            <Container maxWidth="lg" sx={{ py: 4 }}>
              <FormComponent />
            </Container>
          </Box>
          <PlanComponent />
        </ModalContextProvider>
      </AppContextProvider>
    </ThemeProvider>
  );
}

export default App;
