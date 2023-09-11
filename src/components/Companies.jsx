import React, { useState } from "react";
import { CompanyListItem } from "./CompanyListItem";
import { companies } from "../initial-data";
import { Box, Typography } from "@mui/material";
import PersistentDrawer from "./PersistentDrawer";

const Companies = ({
  handleCompanySelect,
  goBack,
  handleSettingsOpen,
  setTasksModalOpen,
  setRequestsModalOpen,
  // isMobile,
  // selectedCompany,
  // selectedTask,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const filteredCompanies = companies.filter((company) => {
    return company.companyName
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });
  return (
    <Box>
      <PersistentDrawer
        handleSettingsOpen={handleSettingsOpen}
        handleSearchChange={handleSearchChange}
        setTasksModalOpen={setTasksModalOpen}
        setRequestsModalOpen={setRequestsModalOpen}
      />
      <Typography sx={{ padding: "10px" }} variant="h6" color="textPrimary">
        Companies:
      </Typography>
      {filteredCompanies.map((company, index) => (
        <CompanyListItem
          key={index}
          companyName={company.companyName}
          taskNumber={company.taskNumber}
          companyDescription={company.companyDescription}
          onClick={() => {
            goBack();
            handleCompanySelect(company.company_ID);
          }}
        />
      ))}
    </Box>
  );
};

export default Companies;
