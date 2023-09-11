import React, { useEffect } from "react";
import SignUp from "./pages/SignUp.jsx";
import SignIn from "./pages/SignIn.jsx";
import { Routes, Route } from "react-router";
import Layout from "./components/Layout.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import { Navigate } from "react-router";
import ResetPassword from "./pages/ResetPassword.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import Home from "./pages/Home.jsx";
import NotFound from "./pages/NotFound.jsx";
import { useDispatch } from "react-redux";
import { initializeAuthFromLocalStorage } from "./store/userSlice.js";
import { useSelector } from "react-redux";
import { selectIsAuthenticated } from "./store/userSlice.js";
import PublicOnlyRoute from "./components/PublicOnlyRoute.jsx";
////////////////////////////////////////////
// import RouteTester from "./routeTester/RouteTester.jsx";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(initializeAuthFromLocalStorage());
  }, [dispatch]);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const DefaultRoute = () => {
    // return isAuthenticated ? (
    return <Navigate replace to="/home" />;
    // ) : (
    // <Navigate replace to="/login" />
    // );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Root redirect based on authentication */}
        <Route index element={<DefaultRoute />} />

        {/* Public routes */}
        {/* <Route element={<PublicOnlyRoute />}>
          <Route path="login" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="reset" element={<ResetPassword />} />
        </Route> */}

        {/* Unauthorized route */}
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* Private routes */}
        {/* <Route element={<RequireAuth />}> */}
        <Route path="home" element={<Home />} />
        {/* </Route> */}

        {/* Catch all */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default App;
