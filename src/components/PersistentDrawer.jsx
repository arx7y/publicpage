import React, { useState } from "react";
import ReactDOM from "react-dom";
import { AppBar, Toolbar, IconButton, InputBase, Drawer } from "@mui/material";
import { Menu as MenuIcon } from "@mui/icons-material";
import Navbar from "./Navbar";
import Backdrop from "./Backdrop";
import { useTheme } from "@mui/material/styles";

const PersistentDrawer = ({
  handleSearchChange,
  handleSettingsOpen,
  setTasksModalOpen,
  setRequestsModalOpen,
}) => {
  const theme = useTheme();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen((prevOpen) => !prevOpen);
  };

  return (
    <div>
      <AppBar sx={{ backgroundColor: "black" }} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
          {/* Removed Typography and added InputBase for search */}
          <InputBase
            sx={{
              color: "inherit",
              flexGrow: 1,
              paddingLeft: theme.spacing(3),
              paddingRight: theme.spacing(3),
              transition: theme.transitions.create("width"),
              width: "100%",
              backgroundColor: "#2e2e2e",
              borderRadius: "20px",
              [theme.breakpoints.up("sm")]: {
                width: "12ch",
                "&:focus": {
                  width: "20ch",
                },
              },
            }}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            onChange={handleSearchChange}
          />
        </Toolbar>
      </AppBar>
      {isMenuOpen &&
        ReactDOM.createPortal(
          <Navbar
            open={isMenuOpen}
            handleSettingsOpen={handleSettingsOpen}
            handleMenuToggle={handleMenuToggle}
            setTasksModalOpen={setTasksModalOpen}
            setRequestsModalOpen={setRequestsModalOpen}
          />,
          document.getElementById("overlay-root")
        )}
      {isMenuOpen &&
        ReactDOM.createPortal(
          <Backdrop open={isMenuOpen} onConfirm={handleMenuToggle} />,
          document.getElementById("backdrop-root")
        )}
    </div>
  );
};

export default PersistentDrawer;
