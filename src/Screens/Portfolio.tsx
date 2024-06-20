import { Box } from "@mui/material";
import React, { ReactNode } from "react";
import ProjectCard from "../Components/ProjectCard";

export type project = {
  summary: string;
  subject: string;
  description: string;
  link: string;
  fileType: "jpg" | "png";
};

export const Portfolio = () => {
  const projects: project[] = [
    {
      summary: "UofLEduWebDev",
      subject: "Departmental Analysis",
      description:
        "Worked with a professor at the University to design a cloud-based full stack application from scratch for the education department, allowing them to analyze departmental data points and perform data analysis.",
      link: "https://github.com/btgehr01/Education-Project",
      fileType: "png",
    },
    {
      summary: "MachineLearning",
      subject: "Machine Learning and AI",
      description:
        "Utilized scikit-learn and R to build several classification and regression models.",
      link: "https://github.com/btgehr01/Brady_Gehrman_Individual_Work/tree/master/Louisville%20Machine%20Learning",
      fileType: "png",
    },
    {
      summary: "GoodMaps",
      subject: "GoodMaps Web Development",
      description:
        "Full stack feature development using Auth0, React, TypeScript, ThreeJS, GraphQL, and AWS services, Simple mobile development, and Company AI/ML research.",
      link: "https://goodmaps.com/",
      fileType: "jpg",
    },
    {
      summary: "EAP",
      subject: "Emergency Action Plan Creation",
      description:
        "Built a full stack web application for University of Louisville Health that could generate and store emergency action plans for different venues around the state of Kentucky.",
      link: "https://github.com/btgehr01/Sports_Saftey",
      fileType: "png",
    },
  ];

  const renderCards = (): ReactNode[] => {
    return projects.map((project: project) => (
      <ProjectCard
        key={project.summary}
        alt={project.summary}
        image={`../Static/${project.summary}.${project.fileType}`}
        subject={project.subject}
        description={project.description}
        link={project.link}
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
        justifyContent: "space-evenly",
      }}
    >
      {renderCards()}
    </Box>
  );
};
