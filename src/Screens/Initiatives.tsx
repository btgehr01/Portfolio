import { Box, Button, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import { useNavigate } from "react-router-dom";
import React from "react";

export const Initiatives = () => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "black",
        padding: "50px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        color: "grey",
        textAlign: "center",
      }}
    >
      <ConstructionIcon sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Construction
      </Typography>
      <Typography variant="h6">
        This Screen is Currently Under Construction
      </Typography>
      <Button
        variant="outlined"
        color="warning"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};
