import React, { useState } from "react";
import { Button } from "@mui/material";
import SegmentModal from "./Modal";

export const Main = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSave = (data) => {
    console.log("Segment Saved:", data);
  };

  return (
    <div>
      <Button sx={{bgcolor: "#149BA1"}} variant="contained" color="primary" onClick={handleOpen}>
        Save a Segment
      </Button>
      <SegmentModal
        open={open}
        handleClose={handleClose}
        handleSave={handleSave}
      />
    </div>
  );
};
