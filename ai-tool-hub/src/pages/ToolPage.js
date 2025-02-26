import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, TextField, Button } from "@mui/material";

const ToolPage = () => {
  const { id } = useParams();

  return (
    <Box>
      <Typography variant="h4">AI Tool #{id}</Typography>
      <TextField label="Enter your input" fullWidth margin="normal" />
      <Button variant="contained" color="primary">
        Run AI Tool
      </Button>
    </Box>
  );
};

export default ToolPage;