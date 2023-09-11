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
import { tasks, requests, companies, companyAvatars } from "../initial-data";

const CompanyInteraction = ({
  selectedCompany,
  goBack,
  isMobile,
  //   setSelectedInteraction,
  handleTaskSelect,
}) => {
  const [selectedType, setSelectedType] = useState("Tasks");

  const selectedCompanyData = companies.find(
    (company) => company.company_ID === selectedCompany
  );

  const filteredTasks = tasks.filter(
    (task) => task.company_ID === selectedCompany
  );
  const filteredRequests = requests.filter(
    (request) => request.company_ID === selectedCompany
  );

  const currentList =
    selectedType === "Tasks" ? filteredTasks : filteredRequests;

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
                  backgroundColor: "white",
                  color: "background.default",
                }}
                src={companyAvatars[selectedCompanyData.companyName]}
              >
                {/* C */}
              </Avatar>
            </ListItemAvatar>
          )}

          <ListItemText
            primary={
              <Typography variant="body1" color="textPrimary">
                {selectedCompanyData.companyName}
              </Typography>
            }
            secondary={
              <Typography variant="body2" color="textSecondary">
                {selectedCompanyData.companyDescription}
              </Typography>
            }
          />
        </ListItem>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          backgroundColor: "#272727",
        }}
        // variant="text"
      >
        <Button
          onClick={() => setSelectedType("Tasks")}
          variant="text"
          sx={{
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#272727",
            color: selectedType === "Tasks" ? "#bb86fc" : "grey",
            padding: "10px 30px",
            borderBottom:
              selectedType === "Tasks" ? "3px solid #bb86fc" : "none", // underline for active button
            "&:hover": {
              backgroundColor: "#9a68d6",
              color: "#1a1a1a",
            },
          }}
        >
          <TaskOutlinedIcon sx={{ fontSize: "2rem" }} />
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
            variant="caption"
          >
            Tasks
          </Typography>
        </Button>
        <Button
          variant="text"
          onClick={() => setSelectedType("Requests")}
          sx={{
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            backgroundColor: "#272727",
            color: selectedType === "Requests" ? "#bb86fc" : "grey",
            justifyContent: "center",
            padding: "10px 30px",
            borderBottom:
              selectedType === "Requests" ? "3px solid #bb86fc" : "none", // underline for active button
            "&:hover": {
              backgroundColor: "#9a68d6",
              color: "#1a1a1a",
            },
          }}
        >
          <RequestPageOutlinedIcon sx={{ fontSize: "2rem" }} />
          <Typography
            sx={{ fontSize: "1rem", fontWeight: "bold" }}
            variant="caption"
          >
            Requests
          </Typography>
        </Button>
      </Box>
      <Box sx={{ marginTop: "20px" }}>
        {currentList.length === 0 ? (
          <Typography
            sx={{
              padding: "20px",
              fontSize: "1.2rem",
              fontWeight: "bold",
              color: "#dfe0e0", // or use a light shade of gray like "#dddddd"
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
            variant="body1"
          >{`No available ${selectedType}`}</Typography>
        ) : (
          currentList.map((item, index) => (
            <ListItem
              onClick={() => {
                handleTaskSelect(item);
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
          ))
        )}
      </Box>
    </Box>
  );
};

export default CompanyInteraction;
