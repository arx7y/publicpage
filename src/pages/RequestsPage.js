import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  //   ButtonGroup,
  //   Button,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
// import TaskIcon from "@mui/icons-material/Task";
// import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
// import RequestIcon from "@mui/icons-material/AssignmentTurnedIn";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
// import RequestPageOutlinedIcon from "@mui/icons-material/RequestPageOutlined";
import { tasks, requests, companies, companyAvatars } from "../initial-data";

const RequestsPage = ({
  //   selectedCompany,
  //   goBack,
  isMobile,
  //   setSelectedInteraction,
  handleTaskSelect,
  setSelectedCompany,
  setRequestsModalOpen,
}) => {
  let filteredRequests;
  return (
    <Box
      style={{
        width: "100%", // or '100vw'
        height: "100%", // or '100vh'
        backgroundColor: "#121212",
        overflow: "auto",
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="flex-start" // Change this if you want a different spacing
        sx={{ height: "64px" }}
      >
        {/* {isMobile && ( */}
        <IconButton
          onClick={() => {
            setRequestsModalOpen(false);
            console.log("reqeusts page arrow back function");
          }}
          color="primary"
        >
          <ArrowBackIcon />
        </IconButton>
        {/* )} */}
        <Typography variant="h6" color="textPrimary">
          MY REQUESTS:
        </Typography>
      </Box>
      {companies.map((company) => {
        filteredRequests = requests.filter((request) => {
          return request.company_ID === company.company_ID;
        });
        if (filteredRequests.length === 0) {
          return null;
        } else {
          return (
            <Accordion sx={{ backgroundColor: "#121212" }}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Box
                  sx={{
                    paddingLeft: "10px",
                    height: "64px",
                    // backgroundColor: "#1a1a1a",
                  }}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
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
                    {/* {isMobile && ( */}
                    <ListItemAvatar>
                      <Avatar
                        sx={{
                          backgroundColor: "white",
                          color: "background.default",
                        }}
                        src={companyAvatars[company.companyName]}
                      >
                        {/* C */}
                      </Avatar>
                    </ListItemAvatar>
                    {/* )} */}

                    <ListItemText
                      primary={
                        <Typography variant="body1" color="textPrimary">
                          {company.companyName}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="textSecondary">
                          {company.companyDescription}
                        </Typography>
                      }
                    />
                  </ListItem>
                </Box>
              </AccordionSummary>
              <AccordionDetails style={{ flexDirection: "column" }}>
                {filteredRequests.map((item, index) => (
                  <ListItem
                    onClick={() => {
                      setSelectedCompany(item.company_ID);
                      handleTaskSelect(item);
                      setRequestsModalOpen(false);
                    }}
                    key={index}
                    button
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      color: "text.primary",
                      position: "relative", // Add this for the pseudo-element to work
                      "&::before": {
                        // Use a pseudo-element for the bottom line
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: "5%", // Adjust these values
                        right: "5%", // Adjust these values
                        height: "1px",
                        backgroundColor: "#ababab",
                      },
                    }}
                  >
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

                    <ListItemText
                      primary={
                        <Typography variant="body1" color="textPrimary">
                          {item.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="textSecondary">
                          {item.description}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </AccordionDetails>
            </Accordion>
          );
        }
      })}
    </Box>
  );
};

export default RequestsPage;
