import { Outlet } from "react-router";
import { useSelector } from "react-redux";
import PersistentDrawer from "./PersistentDrawer";
// import Backdrop from "./Backdrop";
import React from "react";
import { Box } from "@mui/material";

const Layout = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  return (
    <Box
      sx={{
        margin: 0,
        padding: 0,
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <React.Fragment>
        {/* {isAuthenticated && <PersistentDrawer/>} */}
        <Outlet />
      </React.Fragment>
    </Box>
  );
};

export default Layout;
