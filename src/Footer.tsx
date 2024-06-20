import React from "react";
import { Box, Typography } from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import SpotifyIcon from "@mui/icons-material/MusicNote";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./Styles/footer.scss";

const Footer: React.FC = () => {
  return (
    <Box className="footer">
      <Typography className="footer-text">
        © 2023-2024 Brady Gehrman All Rights Reserved.
      </Typography>
      <Typography className="footer-text">Designed by Brady Gehrman</Typography>
      <Box className="social-icons">
        <a
          href="https://www.instagram.com/bgehrman2019/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <InstagramIcon />
        </a>
        <a
          href="https://open.spotify.com/user/4ctcgqt1n6eaj96bt3uye023q"
          target="_blank"
          rel="noopener noreferrer"
        >
          <SpotifyIcon />
        </a>
        <a
          href="https://www.linkedin.com/in/brady-gehrman-687508249/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
        <a
          href="https://github.com/btgehr01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
      </Box>
    </Box>
  );
};

export default Footer;
