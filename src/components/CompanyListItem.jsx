import React from "react";
import {
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Box,
} from "@mui/material";
import { companyAvatars } from "../initial-data";

export const CompanyListItem = ({
  companyName,
  taskNumber,
  companyDescription,
  onClick,
}) => {
  return (
    <ListItem
      button
      onClick={onClick}
      sx={{
        // backgroundColor: "background.default", // Set the main background color
        color: "text.primary",
        // borderBottom: `1px solid grey`, // Add a bottom line
      }}
    >
      <ListItemAvatar>
        <Avatar
          sx={{ backgroundColor: "white", color: "background.default" }}
          src={companyAvatars[companyName]}
        >
          {/* C */}
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <Typography variant="body1" color="textPrimary">
            {companyName}
          </Typography>
        }
        secondary={
          <Typography variant="body2" color="textSecondary">
            {companyDescription}
          </Typography>
        }
      />
      {taskNumber > 0 && (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: 1,
            borderColor: "primary.main",
            borderRadius: "30px",
            backgroundColor: "rgba(187, 134, 252, 0.15)",
            p: "5px 20px",
          }}
        >
          <Typography variant="button" color="primary">
            {`${taskNumber === 1 ? "Task" : "Tasks"} ${taskNumber}`}
          </Typography>
        </Box>
      )}
    </ListItem>
  );
};
