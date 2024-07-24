import React from "react";
import "../Styles/App.scss";
import SpotifyController from "./Spotify";
import { Box } from "@mui/material";

const MainPage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "auto",
        width: "100%",
        paddingTop: "30px",
      }}
    >
      <SpotifyController />
    </Box>
  );
};

export default MainPage;
