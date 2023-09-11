import React, { useState } from "react";
import {
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const DynamicOrderForm = () => {
  const [boxType, setBoxType] = useState("");
  const [boxColor, setBoxColor] = useState("");
  const [boxSize, setBoxSize] = useState("");
  const [customDesign, setCustomDesign] = useState(false);
  const [designDetails, setDesignDetails] = useState("");
  const [dimensions, setDimensions] = useState("");

  const handleBoxTypeChange = (event) => {
    setBoxType(event.target.value);
  };

  const handleBoxColorChange = (event) => {
    setBoxColor(event.target.value);
  };

  const handleBoxSizeChange = (event) => {
    setBoxSize(event.target.value);
  };

  const handleCustomDesignChange = (event) => {
    setCustomDesign(event.target.checked);
  };

  const handleDesignDetailsChange = (event) => {
    setDesignDetails(event.target.value);
  };

  const handleDimensionsChange = (event) => {
    setDimensions(event.target.value);
  };

  return (
    <Container sx={{ color: "white" }} maxWidth="sm">
      <h1>Order Your Custom Box</h1>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Box Type</InputLabel>
        <Select value={boxType} onChange={handleBoxTypeChange} label="Box Type">
          <MenuItem value="cardboard">Cardboard</MenuItem>
          <MenuItem value="plastic">Plastic</MenuItem>
          <MenuItem value="wood">Wood</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        variant="outlined"
        margin="normal"
        disabled={boxType !== "wood"}
      >
        <InputLabel>Box Color</InputLabel>
        <Select
          value={boxColor}
          onChange={handleBoxColorChange}
          label="Box Color"
        >
          <MenuItem value="brown">Brown</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="white">White</MenuItem>
        </Select>
      </FormControl>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Box Size</InputLabel>
        <Select value={boxSize} onChange={handleBoxSizeChange} label="Box Size">
          <MenuItem value="small">Small</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="large">Large</MenuItem>
          <MenuItem value="custom">Custom</MenuItem>
        </Select>
      </FormControl>

      {boxSize === "custom" && (
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Enter Dimensions"
          value={dimensions}
          onChange={handleDimensionsChange}
        />
      )}

      <FormControlLabel
        control={
          <Checkbox
            checked={customDesign}
            onChange={handleCustomDesignChange}
          />
        }
        label="Custom Design"
      />

      {customDesign && (
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="Design Details"
          multiline
          rows={4}
          value={designDetails}
          onChange={handleDesignDetailsChange}
        />
      )}

      <Grid item xs={12}>
        <Button
          variant="outlined"
          color="primary"
          size="large"
          endIcon={<SendIcon />}
          sx={{
            borderRadius: 50,
            padding: "15px 30px",
          }}
        >
          Submit
        </Button>
      </Grid>
    </Container>
  );
};

export default DynamicOrderForm;
