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
// import { userActions } from "../store/userSlice";
import { logInSchema } from "../schemas";
import { useFormik } from "formik";
import Alert from "@mui/material/Alert";
import axios from "../api/axios.js";
import { logIn } from "../store/userSlice";
import { Divider } from "@mui/material";
import MicrosoftIcon from "@mui/icons-material/Microsoft";
import { msalInstance } from "..";

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

export default function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/home"; //navigate to the user page
  const dispatch = useDispatch();
  const [isError, setIsError] = React.useState("");

  const onSubmit = async (formValues) => {
    setIsError("");
    let response;
    try {
      response = await axios.post(
        "/account/login",
        {
          email: formValues.email,
          password: formValues.password,
        },
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
      // setIsError(error.message);
      setIsError(error.response.data.message);
    }
    if (response?.status === 201) {
      //fetch roles from response
      dispatch(
        logIn({
          roles: [201, 202, 203],
          accessToken: response.data.accessToken,
          loginMethod: "local",
        })
      );
      // dispatch(userActions.logIn({roles: [201,202,203], accessToken: response.data.accessToken})); //hardcoded values
      // localStorage.setItem('access_token', response.data.accessToken);
      // localStorage.setItem('isAuthenticated', true);
      navigate(from, { replace: true });
    }
  };
  const onSSOSubmit = async () => {
    setIsError("");

    try {
      // Attempt to login with MSAL
      const msalResponse = await msalInstance.loginPopup();
      console.log("MSAL Response:", msalResponse); // Debugging: log response

      if (msalResponse?.accessToken) {
        // If MSAL login is successful, dispatch login action with the access token
        dispatch(
          logIn({
            accessToken: msalResponse.accessToken,
            roles: [201, 202, 203],
            loginMethod: "azure",
          })
        );

        try {
          // Fetch roles from your backend using the access token
          // const rolesResponse = await axios.get("/account/roles", {
          //   headers: { Authorization: `Bearer ${msalResponse.accessToken}` },
          // });
          // // Assuming roles are returned in an array
          // const roles = rolesResponse.data.roles;
          // Update roles in your state
          // dispatch(logIn({ roles }));
        } catch (error) {
          console.log("Error fetching roles:", error);
          setIsError("Error fetching roles.");
        }

        // Navigate to the home page or wherever the user was trying to go
        navigate(from, { replace: true });
      } else {
        setIsError("MSAL login did not return an access token.");
      }
    } catch (error) {
      console.log("MSAL Error:", error); // Debugging: log error
      setIsError(error.message);
    }
  };

  const { values, errors, touched, isSubmitting, handleChange, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: logInSchema,
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
            Sign in
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
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              value={values.password}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={isSubmitting}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Typography variant="body2">
                  <RouterLink style={{ color: "#1976d2" }} to="/reset">
                    Forgot password?
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
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2">OR</Typography>
            </Divider>
            <Button
              fullWidth
              variant="outlined"
              onClick={onSSOSubmit}
              // sx={{ mt: 3, mb: 2 }}
              startIcon={<MicrosoftIcon />}
            >
              MICROSOFT LOGIN
            </Button>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    // </ThemeProvider>
  );
}
