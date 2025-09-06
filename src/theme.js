import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#1976d2" },
    secondary: { main: "#ff9800" },
    background: {
      default: "white",
      paper: "white"
    },
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
});


export default theme;
