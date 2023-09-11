import React from "react";
import { Backdrop as MaterialBackdrop } from "@mui/material";

const Backdrop = (props) => {
  return (
    <MaterialBackdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer }}
      open={props.open}
      onClick={props.onConfirm}
    ></MaterialBackdrop>
  );
};

export default Backdrop;
