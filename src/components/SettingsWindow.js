import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import LanguageIcon from "@mui/icons-material/Language";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SecurityIcon from "@mui/icons-material/Security";
import ChatIcon from "@mui/icons-material/Chat";
import FolderIcon from "@mui/icons-material/Folder";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

export default function SettingsWindow({ open, handleClose }) {
  const [language, setLanguage] = React.useState("");
  const [scale, setScale] = React.useState(100);

  const handleChangeLanguage = (event) => {
    setLanguage(event.target.value);
  };

  const handleChangeScale = (event, newValue) => {
    setScale(newValue);
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      aria-labelledby="settings-dialog-title"
    >
      <DialogTitle id="settings-dialog-title">
        Settings
        <IconButton
          edge="end"
          color="inherit"
          onClick={handleClose}
          aria-label="close"
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {/* User Info */}
        <Avatar sx={{ float: "left", marginRight: 2 }}>U</Avatar>
        <Typography variant="h6">John Doe</Typography>
        <Typography variant="subtitle1">johndoe@example.com</Typography>
        <Divider sx={{ my: 2, clear: "both" }} />

        {/* Menu */}
        <List>
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="My Account" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <NotificationsIcon />
            </ListItemIcon>
            <ListItemText primary="Notifications and Sounds" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <SecurityIcon />
            </ListItemIcon>
            <ListItemText primary="Privacy and Security" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <ChatIcon />
            </ListItemIcon>
            <ListItemText primary="Chat Settings" />
          </ListItem>
          <ListItem button>
            <ListItemIcon>
              <FolderIcon />
            </ListItemIcon>
            <ListItemText primary="Folders" />
          </ListItem>
          {/* More Items */}
        </List>
        <Divider sx={{ my: 2 }} />

        {/* Switches and Select */}
        <FormControlLabel
          control={<Switch name="checkedA" />}
          label="Enable Notifications"
        />
        <FormControlLabel
          control={<Switch name="checkedB" />}
          label="Enable Dark Mode"
        />
        <Typography gutterBottom>Default Interface Scale: {scale}%</Typography>
        <Slider
          value={scale}
          onChange={handleChangeScale}
          min={50}
          max={200}
          step={10}
          marks
          valueLabelDisplay="auto"
        />
        <Divider sx={{ my: 2 }} />

        {/* Language Settings */}
        <Typography gutterBottom>Language</Typography>
        <List>
          <ListItem>
            <ListItemIcon>
              <LanguageIcon />
            </ListItemIcon>
            <ListItemText>
              <select value={language} onChange={handleChangeLanguage}>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </ListItemText>
          </ListItem>
        </List>
      </DialogContent>
    </Dialog>
  );
}
