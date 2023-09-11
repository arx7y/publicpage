import React from "react";
import TextField from "@mui/material/TextField";

const CustomParagraph = (props) => {
  const {
    content,
    placeholder,
    disabled,
    required,
    invisible,
    maxLength,
    label,
  } = props;

  if (invisible) {
    return null;
  }

  return (
    <TextField
      label={label}
      multiline={true}
      rows={4}
      maxRows={6}
      disabled={disabled}
      required={required}
      value={content}
      placeholder={placeholder}
      inputProps={{ maxLength }}
    />
  );
};

export default CustomParagraph;
