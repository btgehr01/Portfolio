// ErrorScreen.js
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useLocation } from "react-router-dom";

const ErrorScreen = () => {
  const location = useLocation();

  const getQueryParam = (param: string) => {
    const queryParams = new URLSearchParams(location.search);
    return queryParams.get(param);
  };

  const errorMessage =
    getQueryParam("errorMessage") || "An unknown error occurred.";

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
      <ErrorOutlineIcon sx={{ fontSize: 60, mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Error
      </Typography>
      <Typography variant="h6">{errorMessage}</Typography>
      <Button
        variant="outlined"
        color="primary"
        sx={{ mt: 3 }}
        onClick={() => (window.location.href = "/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorScreen;
