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
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Grid,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import VisibilityIcon from "@mui/icons-material/Visibility";
import GetAppIcon from "@mui/icons-material/GetApp";

const exampleFiles = [
  { name: "Design1.pdf", url: "/path/to/Design1.pdf" },
  { name: "Design2.jpg", url: "/path/to/Design2.jpg" },
];

const OrderMugForm = () => {
  const [mugType, setMugType] = useState("");
  const [mugColor, setMugColor] = useState("");
  const [customDesign, setCustomDesign] = useState(false);
  const [designDetails, setDesignDetails] = useState("");

  const handleMugTypeChange = (event) => {
    setMugType(event.target.value);
    if (event.target.value === "stainless") {
      setMugColor("silver");
    }
  };

  const handleMugColorChange = (event) => {
    setMugColor(event.target.value);
  };

  const handleCustomDesignChange = (event) => {
    setCustomDesign(event.target.checked);
  };

  const handleDesignDetailsChange = (event) => {
    setDesignDetails(event.target.value);
  };

  const handleFilePreview = (fileUrl) => {
    window.open(fileUrl, "_blank");
  };

  const handleFileDownload = (fileUrl, fileName) => {
    const link = document.createElement("a");
    link.href = fileUrl;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Container sx={{ color: "white" }} maxWidth="sm">
      <h1>Order Your Custom Mug</h1>

      <FormControl fullWidth variant="outlined" margin="normal">
        <InputLabel>Mug Type</InputLabel>
        <Select value={mugType} onChange={handleMugTypeChange} label="Mug Type">
          <MenuItem value="ceramic">Ceramic</MenuItem>
          <MenuItem value="stainless">Stainless Steel</MenuItem>
        </Select>
      </FormControl>

      <FormControl
        fullWidth
        variant="outlined"
        margin="normal"
        disabled={mugType === "stainless"}
      >
        <InputLabel>Mug Color</InputLabel>
        <Select
          value={mugColor}
          onChange={handleMugColorChange}
          label="Mug Color"
        >
          <MenuItem value="white">White</MenuItem>
          <MenuItem value="black">Black</MenuItem>
          <MenuItem value="blue">Blue</MenuItem>
        </Select>
      </FormControl>

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

      <h2>Example Design Files</h2>
      <List>
        {exampleFiles.map((file, index) => (
          <ListItem key={index}>
            <ListItemText
              primary={file.name}
              sx={{ fontWeight: "bold", marginRight: "10px" }}
            />
            <Button
              variant="outlined"
              color="info"
              size="small"
              startIcon={<VisibilityIcon />}
              onClick={() => handleFilePreview(file.url)}
              sx={{ marginRight: "10px" }}
            >
              Preview
            </Button>
            <Button
              variant="outlined"
              color="secondary"
              size="small"
              startIcon={<GetAppIcon />}
              onClick={() => handleFileDownload(file.url, file.name)}
            >
              Download
            </Button>
          </ListItem>
        ))}
      </List>

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

export default OrderMugForm;
