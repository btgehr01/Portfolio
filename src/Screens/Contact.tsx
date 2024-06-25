import React from "react";
import { Box, Grid } from "@mui/material";
import ContactForm from "../Components/ContactForm";

const louisvilleMap = require("../Static/Louisville.jpg");

export const Contact = () => {
  return (
    <Grid
      container
      sx={{
        minHeight: "100vh",
        backgroundColor: "black",
        padding: "50px",
        cursor: "default",
      }}
    >
      <Grid item xs={12} md={4}>
        <Box
          sx={{
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <img
            src={"../Static/Louisville.jpg"}
            alt="Louisville Map"
            style={{ maxWidth: "80%", maxHeight: "80%" }}
          />
        </Box>
      </Grid>
      <Grid item xs={12} md={8}>
        <ContactForm />
      </Grid>
    </Grid>
  );
};
