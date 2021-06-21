import { red } from "@material-ui/core/colors";
import { createMuiTheme } from "@material-ui/core/styles";

// A custom theme for this app
const theme = createMuiTheme({
  typography: {
    fontFamily: ["Noto Sans TC", "Noto Sans"].join(","),
    body1: { fontWeight: 500 },
  },
  palette: {
    primary: {
      main: "#1E9FD2",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
});

export default theme;
