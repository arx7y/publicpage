import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  ButtonGroup,
  Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TaskIcon from "@mui/icons-material/Task";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import RequestIcon from "@mui/icons-material/AssignmentTurnedIn";
import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import { tasks, requests, companies, builderJson } from "../initial-data";
import OrderMugForm from "../dummyPages/OrderMugForm";
import OrderTShirtForm from "../dummyPages/OrderTShirtForm";
import DynamicOrderForm from "../dummyPages/DynamicOrderForm";

const InteractionComponent = ({ selectedInteraction, goBack, isMobile }) => {
  const selectedJSON = builderJson[selectedInteraction.id];
  let renderedForm;
  switch (selectedInteraction.id) {
    case 1:
      renderedForm = <OrderTShirtForm />;
      break;
    case 2:
      renderedForm = <OrderMugForm />;
      break;
    case 3:
      renderedForm = <DynamicOrderForm />;
      break;
    default:
      renderedForm = null;
      break;
  }
  return (
    <Box>
      <Box
        sx={{ paddingLeft: "10px", height: "64px", backgroundColor: "#1a1a1a" }}
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        {isMobile && (
          <IconButton onClick={goBack} color="primary">
            <ArrowBackIcon />
          </IconButton>
        )}
        <ListItem
          sx={{
            // backgroundColor: "background.default", // Set the main background color
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: "text.primary",
            // borderBottom: `1px solid grey`, // Add a bottom line
          }}
        >
          {isMobile && (
            <ListItemAvatar>
              <Avatar
                sx={{
                  backgroundColor: "primary.main",
                  color: "background.default",
                }}
              >
                C
              </Avatar>
            </ListItemAvatar>
          )}

          <ListItemText
            primary={
              <Typography variant="body1" color="textPrimary">
                {selectedInteraction.name}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="textSecondary">
                {selectedInteraction.description}
              </Typography>
            }
          />
        </ListItem>
      </Box>
      {renderedForm}
    </Box>
  );
};

export default InteractionComponent;
