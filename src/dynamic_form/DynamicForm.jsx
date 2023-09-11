import React, { useState, useEffect } from "react";
import ComponentMapper from "./ComponentMapper";
import { Box, Grid, Container } from "@mui/material";

const applyRules = (components, rules, setComponents) => {
  // Apply your rules logic here
  // Update the components' props based on the rules
};

const renderLayout = (layout, components) => {
  return layout.map((item) => {
    if (item.type === "row") {
      return (
        <Grid container key={item.id}>
          {renderLayout(item.children, components)}
        </Grid>
      );
    }

    if (item.type === "column") {
      return (
        <Grid item key={item.id}>
          {renderLayout(item.children, components)}
        </Grid>
      );
    }

    if (item.type === "component") {
      return (
        <ComponentMapper
          key={item.id}
          type={components[item.id].type}
          props={components[item.id].props}
        />
      );
    }

    return null;
  });
};

const DynamicForm = ({ data }) => {
  const [components, setComponents] = useState(data.components);

  useEffect(() => {
    applyRules(components, data.rules, setComponents);
  }, [components]);

  return (
    <Container>
      <Box>{renderLayout(data.layout, components)}</Box>
    </Container>
  );
};

export default DynamicForm;
