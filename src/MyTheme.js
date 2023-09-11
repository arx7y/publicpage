import { createTheme } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#bb86fc",
    },
    secondary: {
      main: "#ababab",
    },
    background: {
      default: "#121212",
      paper: "#2e2e2e",
      // custom: "#1a1a1a",
    },
    text: {
      primary: "#dfe0e0",
      secondary: "#ababab",
    },
  },
  typography: {
    fontFamily: "Roboto, Arial",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          backgroundColor: "#bb86fc",
          color: "#121212",
          "&:hover": {
            backgroundColor: "#bb86fc",
          },
        },
      },
    },
    MuiLink: {
      styleOverrides: {
        root: {
          color: "#dfe0e0",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& label.Mui-focused": {
            color: "#bb86fc",
          },
          "& .MuiInput-underline:after": {
            borderBottomColor: "#bb86fc",
          },
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "#ababab",
            },
            "&:hover fieldset": {
              borderColor: "#ababab",
            },
            "&.Mui-focused fieldset": {
              borderColor: "#bb86fc",
            },
            // Override the autofill background color
            "& input:-webkit-autofill, & input:-webkit-autofill:hover, & input:-webkit-autofill:focus, & input:-webkit-autofill:active": {
              transitionDelay: "9999s",
              transitionProperty: "background-color, color",
            },
          },
        },
      },
    },
  },
});

export default darkTheme;
