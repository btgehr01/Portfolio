import React from "react";
import { Box, Typography, Button } from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { useLocation, useNavigate } from "react-router-dom";

const ErrorScreen = () => {
  const location = useLocation();
  const navigate = useNavigate();

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
        color="error"
        sx={{ mt: 3 }}
        onClick={() => navigate("/")}
      >
        Go to Home
      </Button>
    </Box>
  );
};

export default ErrorScreen;
