import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { IconButton } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const uoflImage = require("../Static/UofLEduWebDev.png");
const mlImage = require("../Static/MachineLearning.png");
const gmImage = require("../Static/GoodMaps.jpg");
const eapImage = require("../Static/EAP.png");
const hssImage = require("../Static/HSS.png");
const vballImage = require("../Static/Vball.jpg");
const windmillImage = require("../Static/Windmill.jpg");
const nvidiaImage = require("../Static/Nvidia.png");
const unityImage = require("../Static/Unity.png");
const campaignImage = require("../Static/Campaign.png");
const dtcImage = require("../Static/DTC.png");
const dsImage = require("../Static/DS.png");

type Prop = {
  alt: string;
  image: string;
  subject: string;
  description: string;
  link: string;
};

export default function ProjectCard({
  alt,
  image,
  subject,
  description,
  link,
}: Prop) {
  const handleShareClick = (link: string) => {
    window.open(link, "_blank");
  };

  return (
    <Card
      sx={{
        width: "330px",
        height: "400px",
        color: "white",
        backgroundColor: "#121212",
        border: "1px solid white",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        borderRadius: "5px",
        transition: "box-shadow 0.3s ease, background-color 0.3s ease",
        cursor: "default",
        "&:hover": {
          backgroundColor: "#2c2c2c",
          boxShadow: "0 6px 12px rgba(255, 255, 255, 0.5)",
        },
        display: "flex",
        flexDirection: "column",
        margin: "10px",
        boxSizing: "border-box",
      }}
    >
      <CardMedia component="img" alt={alt} height="140" image={image} />
      <CardContent>
        <Typography
          sx={{ color: "white" }}
          gutterBottom
          variant="h5"
          component="div"
        >
          {subject}
        </Typography>
        <Typography
          sx={{ color: "white" }}
          variant="body2"
          color="text.secondary"
        >
          {description}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginTop: "auto", padding: "0px 8px 8px 8px" }}>
        <IconButton onClick={() => handleShareClick(link)} aria-label="share">
          <ShareIcon
            sx={{
              color: "#007bff",
              "&:hover": {
                color: "#0056b3",
                transform: "scale(1.3)",
                transition: "color 0.3s ease, transform 0.3s ease",
              },
            }}
          />
        </IconButton>
      </CardActions>
    </Card>
  );
}
