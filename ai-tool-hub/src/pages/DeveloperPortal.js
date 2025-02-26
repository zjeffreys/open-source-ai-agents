import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";

const DeveloperPortal = () => {
  return (
    <Box>
      <Typography variant="h4">Submit Your AI Agent</Typography>
      <TextField label="Tool Name" fullWidth margin="normal" />
      <TextField label="API Endpoint" fullWidth margin="normal" />
      <Button variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default DeveloperPortal;
