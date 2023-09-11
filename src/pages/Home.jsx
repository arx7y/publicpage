import {
  useMediaQuery,
  useTheme,
  Grid,
  Typography,
  Box,
  Modal,
} from "@mui/material";
import React, { useState } from "react";
import Companies from "../components/Companies";
import CompanyInteraction from "../components/CompanyInteraction";
import InteractionComponent from "../components/InteractionComponent";
import SettingsWindow from "../components/SettingsWindow";
import TasksPage from "./TasksPage";
import RequestsPage from "./RequestsPage";

const Home = () => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedInteraction, setSelectedInteraction] = useState(null);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [tasksModalOpen, setTasksModalOpen] = useState(false);
  const [requestsModalOpen, setRequestsModalOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("EN");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
  };

  const handleTaskSelect = (task) => {
    console.log(task, "this is the task");
    setSelectedInteraction(task);
  };

  const clearSelections = () => {
    if (selectedInteraction) {
      setSelectedInteraction(null);
    } else if (selectedCompany) {
      setSelectedCompany(null);
    }
  };

  const handleSettingsClose = () => {
    setSettingsOpen(false);
  };

  const handleSettingsOpen = () => {
    setSettingsOpen(true);
  };

  return (
    <Box
      sx={{
        backgroundColor: "#121212",
        height: "100vh",
        width: "100%",
        margin: 0,
        padding: 0,
      }}
    >
      <Grid container style={{ height: "100%" }}>
        {(!isMobile ||
          (isMobile && !selectedCompany && !selectedInteraction)) && (
          <Grid
            item
            // xs={12}
            // sm={4}
            sx={{ backgroundColor: "#1a1a1a" }}
            style={{ width: isMobile ? "100%" : "33.33%" }}
          >
            {/* Companies List */}
            <Companies
              selectedCompany={selectedCompany}
              selectedInteraction={selectedInteraction}
              handleCompanySelect={handleCompanySelect}
              goBack={clearSelections}
              handleSettingsOpen={handleSettingsOpen}
              setTasksModalOpen={() => {
                setTasksModalOpen(true);
              }}
              setRequestsModalOpen={() => {
                setRequestsModalOpen(true);
              }}
            />
          </Grid>
        )}

        {selectedCompany &&
          (!isMobile || (isMobile && !selectedInteraction)) && (
            <Grid
              item
              // xs={12}
              // sm={4}
              style={{
                width: isMobile
                  ? "100%"
                  : selectedInteraction
                  ? "33.33%"
                  : "66.67%",
              }}
            >
              {/* Tasks List */}
              <CompanyInteraction
                goBack={clearSelections}
                isMobile={isMobile}
                handleTaskSelect={handleTaskSelect}
                selectedCompany={selectedCompany}
                // setSelectedInteraction={setSelectedInteraction}
              />
              {/* <Typography variant="h6">Tasks</Typography> */}
              {/* <button onClick={() => handleTaskSelect("Task 1")}>
              Select Task 1
            </button> */}
            </Grid>
          )}

        {selectedInteraction && (
          <Grid
            sx={{ backgroundColor: "black" }}
            item
            // xs={12}
            // sm={4}
            style={{ width: isMobile ? "100%" : "33.33%" }}
          >
            {/* Task Details */}
            {/* <Typography variant="h6">Task Details</Typography> */}
            <InteractionComponent
              selectedInteraction={selectedInteraction}
              goBack={clearSelections}
              isMobile={isMobile}
            />
          </Grid>
        )}

        {/* Back button for mobile */}
        {/* {isMobile && (selectedCompany || selectedInteraction) && (
          <button onClick={clearSelections}>Go Back</button>
        )} */}
        <SettingsWindow open={settingsOpen} handleClose={handleSettingsClose} />
        <Modal
          open={tasksModalOpen}
          onClose={() => setTasksModalOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TasksPage
            isMobile={isMobile}
            setSelectedCompany={setSelectedCompany}
            handleTaskSelect={handleTaskSelect}
            setTasksModalOpen={setTasksModalOpen}
          />
        </Modal>

        <Modal
          open={requestsModalOpen}
          onClose={() => setRequestsModalOpen(false)}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RequestsPage
            isMobile={isMobile}
            handleTaskSelect={handleTaskSelect}
            setSelectedCompany={setSelectedCompany}
            setRequestsModalOpen={setRequestsModalOpen}
          />
        </Modal>
      </Grid>
    </Box>
  );
};

export default Home;
