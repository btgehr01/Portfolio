import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import AboutCard from "../Components/AboutCard";
import { attribute } from "three/examples/jsm/nodes/Nodes";

export type attribute = {
  name: string;
  description: string;
  logo: string;
};

export const About = () => {
  const aboutObjects: attribute[] = [
    {
      name: "Education",
      description:
        "Received my Bachelor's and Master's degrees in Computer Engineering and Science from the University of Louisville Speed School of Engineering.",
      logo: "SchoolTwoTone",
    },
    {
      name: "Athletics",
      description:
        "I participated in high school soccer and collegiate volleyball, and I am currently learning golf.",
      logo: "ScoreboardTwoTone",
    },
    {
      name: "Hobbies",
      description:
        "I enjoy working out, trying new things, and going to sporting events.",
      logo: "BatteryCharging80TwoTone",
    },
    {
      name: "Favorite Movies",
      description:
        "My top three movie of all time are '', '', and '' in no specific order",
      logo: "MovieFilterTwoTone",
    },
    {
      name: "Favorite Shows",
      description:
        "My top three movie of all time are '', '', and '' in no specific order",
      logo: "MovieFilterTwoTone",
    },
    {
      name: "Favorite Songs",
      description:
        "My top three movie of all time are '', '', and '' in no specific order",
      logo: "MovieFilterTwoTone",
    },
    {
      name: "Favorite Artists",
      description:
        "My top three movie of all time are '', '', and '' in no specific order",
      logo: "MovieFilterTwoTone",
    },
  ];

  const renderAboutObjects = (): ReactNode[] => {
    return aboutObjects.map((attributeObject: attribute) => (
      <AboutCard
        key={attributeObject.name}
        name={attributeObject.name}
        description={attributeObject.description}
        logo={attributeObject.logo}
      />
    ));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "black",
        padding: "50px",
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-around",
      }}
    >
      {renderAboutObjects()}
    </Box>
  );
};
