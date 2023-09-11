import React, { useState } from "react";
import {
  Container,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

const OrderTShirtForm = () => {
  const [shirtType, setShirtType] = useState("");
  const [shirtColor, setShirtColor] = useState("");
  const [customDesign, setCustomDesign] = useState(false);
  const [designDetails, setDesignDetails] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleShirtTypeChange = (event) => {
    setShirtType(event.target.value);
    if (event.target.value === "polo") {
      setShirtColor("white");
    }
  };

  const handleShirtColorChange = (event) => {
    setShirtColor(event.target.value);
  };

  const handleCustomDesignChange = (event) => {
    setCustomDesign(event.target.checked);
  };

  const handleDesignDetailsChange = (event) => {
    setDesignDetails(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };

  const handleQuantityChange = (event) => {
    setQuantity(event.target.value);
  };

  return (
    <Container sx={{ color: "white" }} maxWidth="md">
      <h1>Order Your Custom T-Shirt</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>T-Shirt Type</InputLabel>
            <Select
              value={shirtType}
              onChange={handleShirtTypeChange}
              label="T-Shirt Type"
            >
              <MenuItem value="regular">Regular</MenuItem>
              <MenuItem value="polo">Polo</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <FormControl
            fullWidth
            variant="outlined"
            margin="normal"
            disabled={shirtType === "polo"}
          >
            <InputLabel>T-Shirt Color</InputLabel>
            <Select
              value={shirtColor}
              onChange={handleShirtColorChange}
              label="T-Shirt Color"
            >
              <MenuItem value="white">White</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="blue">Blue</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Checkbox
                checked={customDesign}
                onChange={handleCustomDesignChange}
              />
            }
            label="Custom Design"
          />
        </Grid>
        {customDesign && (
          <Grid item xs={12}>
            <TextField
              fullWidth
              variant="outlined"
              margin="normal"
              label="Design Details"
              multiline
              rows={4}
              required
              value={designDetails}
              onChange={handleDesignDetailsChange}
            />
          </Grid>
        )}
        <Grid item xs={12} sm={6}>
          <FormControl fullWidth variant="outlined" margin="normal">
            <InputLabel>Size</InputLabel>
            <Select
              value={size}
              onChange={handleSizeChange}
              label="Size"
              required={customDesign}
            >
              <MenuItem value="small">Small</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="large">Large</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            variant="outlined"
            margin="normal"
            label="Quantity"
            type="number"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </Grid>
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
      </Grid>
    </Container>
  );
};

export default OrderTShirtForm;
