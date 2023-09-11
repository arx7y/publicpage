import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userActions } from "../store/userSlice";
import { resetPasswordSchema } from "../schemas";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import axios from "../api/axios.js";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function ResetPassword() {
  //   const navigate = useNavigate();
  //   const location = useLocation();
  //   const from = location.state?.from?.pathname || "/";
  //   const dispatch = useDispatch();
  const [isError, setIsError] = React.useState("");
  const [isSuccess, setIsSuccess] = React.useState("");

  const onSubmit = async (formValues) => {
    setIsError("");
    setIsSuccess("");
    let response;
    try {
      response = await axios.post("/account/reset", {
        email: formValues.email,
      });
    } catch (error) {
      //   console.log(error.response.data.data[0].msg);
      setIsError(error.response.data.message);
    }
    if (response?.status === 200) {
      setIsSuccess("A reset email has been sent to you!");
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: resetPasswordSchema,
      onSubmit,
    });

  return (
    // <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Reset
          </Typography>

          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            {Boolean(isError) && (
              <Alert variant="outlined" severity="error">
                {isError}
              </Alert>
            )}
            {Boolean(isSuccess) && (
              <Alert variant="outlined" severity="success">
                {isSuccess}
              </Alert>
            )}
            <TextField
              margin="normal"
              required
              fullWidth
              type="email"
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              value={values.email}
              error={touched.email && Boolean(errors.email)}
              helperText={touched.email && errors.email}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              Send an email
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography variant="body2">
                  <RouterLink style={{ color: "#1976d2" }} to="/login">
                    Log in
                  </RouterLink>
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="body2">
                  <RouterLink style={{ color: "#1976d2" }} to="/signup">
                    Don't have an account? Sign Up
                  </RouterLink>
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    // </ThemeProvider>
  );
}
