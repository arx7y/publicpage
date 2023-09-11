import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import NotificationsIcon from "@mui/icons-material/Notifications";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import TaskIcon from "@mui/icons-material/Task";
// import { Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router";

const Navbar = (props) => {
  const navigation = useNavigate();
  return (
    <Drawer
      anchor="left"
      open={props.open}
      variant="persistent"
      PaperProps={{
        sx: {
          width: 240,
          zIndex: (theme) => theme.zIndex.drawer + 1,
        },
      }}
    >
      <List>
        {[
          { text: "Companies", to: "/home", icon: <HomeIcon /> },
          { text: "Requests", to: "/requests", icon: <RequestPageIcon /> },
          { text: "Tasks", to: "/tasks", icon: <TaskIcon /> },
          {
            text: "Notifications",
            to: "/notifications",
            icon: <NotificationsIcon />,
          },
          { text: "Settings", to: "/settings", icon: <SettingsIcon /> },
        ].map(({ text, to, icon }) => {
          const navigateFunction = () => {
            props.handleMenuToggle();
            navigation(to, { replace: true });
          };
          return (
            <ListItem
              button
              key={text}
              onClick={() => {
                if (text === "Settings") {
                  props.handleSettingsOpen();
                } else if (text === "Tasks") {
                  props.setTasksModalOpen(true);
                } else if (text === "Requests") {
                  props.setRequestsModalOpen(true);
                } else {
                  navigateFunction();
                }
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Navbar;
