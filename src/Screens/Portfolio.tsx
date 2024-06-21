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
      summary: "GoodMaps",
      subject: "GoodMaps Software Development",
      description:
        "Full-stack feature development using Auth0, React, TypeScript, ThreeJS, GraphQL, and AWS services, simple mobile development, and company AI/ML research.",
      link: "https://goodmaps.com/",
      fileType: "jpg",
    },
    {
      summary: "UofLEduWebDev",
      subject: "Departmental Analysis",
      description:
        "Collaborated with a university professor to design a cloud-based full-stack application from scratch for the education department, enabling them to analyze departmental data points and perform comprehensive data analysis tasks efficiently.",
      link: "https://github.com/btgehr01/Education-Project",
      fileType: "png",
    },
    {
      summary: "EAP",
      subject: "Emergency Action Plan Creation",
      description:
        "Built a full-stack web application for University of Louisville Health that could generate and store emergency action plans for different venues around the state of Kentucky.",
      link: "https://github.com/btgehr01/Sports_Saftey",
      fileType: "png",
    },
    {
      summary: "MachineLearning",
      subject: "Machine Learning and AI",
      description:
        "Built and tested multiple R and Scikit supervised learning classifiers and regression models on Kaggle datasets. Utilized cross-validation to optimize parameters and explored unsupervised learning techniques including data clustering and dimensionality reduction (t-SNE, PCA).",
      link: "https://github.com/btgehr01/Brady_Gehrman_Projects/tree/master/Louisville%20Machine%20Learning",
      fileType: "png",
    },
    {
      summary: "Nvidia",
      subject: "Nvidia TensorRT Research",
      description:
        "Expanding on 'Demystifying TensorRT', our research explored optimization impacts across various ML frameworks and hardware setups, using accuracy and inference latency metrics to compare optimized and unoptimized DNN models on different GPUs.",
      link: "https://cardmaillouisville-my.sharepoint.com/:b:/g/personal/btgehr01_louisville_edu/EcVIcvx9hSFChoqekpF0gVQBh835zh7Jds4kiNVhfnHqqw?e=SMm3hL",
      fileType: "png",
    },
    {
      summary: "DS",
      subject: "Data Science",
      description:
        "Developed projects involving natural language processing (NLP) using Python, data mining with PRAW (Python Reddit API Wrapper), Google Translate integration, and geocoding functionalities.",
      link: "https://github.com/btgehr01/Brady_Gehrman_Projects/tree/master/Louisville%20Data%20Science",
      fileType: "png",
    },
    {
      summary: "Windmill",
      subject: "Windmill Prototype",
      description:
        "Designed and built a 3D-printed windmill prototype, incorporating an AC generator made from magnets and copper wire. Later integrated an Arduino to measure the windmill's blade speed and electrical current output.",
      link: "https://engineering.louisville.edu/academics/areasofstudy/engineering-fundamentals/",
      fileType: "jpg",
    },
    {
      summary: "HSS",
      subject: "Home Security System",
      description:
        "Developed a Raspberry Pi-based home security system with a web interface for arming/disarming, featuring an integrated email server to notify the owner of intrusions with timestamps and accompanying images.",
      link: "https://github.com/btgehr01/Brady_Gehrman_Projects/tree/master/Louisville%20RaspberryPi/525rpisecurity",
      fileType: "png",
    },
    {
      summary: "Vball",
      subject: "Autonomous Volleyball Line Judge",
      description:
        "Developed an autonomous volleyball line judge utilizing an Arduino for a capstone project, and presented the design at a conference held within the Kentucky Capitol building.",
      link: "https://www.pltw.org/curriculum/pltw-engineering",
      fileType: "jpg",
    },
    {
      summary: "Unity",
      subject: "Unity Game Development",
      description:
        "Designed a first-person shooter (FPS) and a VR racing game using Unity's game engine.",
      link: "https://github.com/btgehr01/Brady_Gehrman_Projects/tree/master/Louisville%20Unity%20Game%20Design",
      fileType: "png",
    },
    {
      summary: "DTC",
      subject: "Educational Website",
      description:
        "Developed and hosted a React web application for the University of Louisville DTC, featuring a curriculum focused on AI, automation, and analytics. The website incorporated a gamified element using Unity to engage and quiz users.",
      link: "https://github.com/btgehr01/ENGR_311",
      fileType: "png",
    },
    {
      summary: "Campaign",
      subject: "Senitorial Campaign",
      description:
        "Designed and developed a system for campaign workers to organize volunteer and donor voter contact identification remotely during the COVID-19 pandemic, facilitating recruitment efforts for the candidate.",
      link: "https://github.com/btgehr01/Brady_Gehrman_Projects/tree/master/Volunteer%20Work%20For%20Senitorial%20Campaign",
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
