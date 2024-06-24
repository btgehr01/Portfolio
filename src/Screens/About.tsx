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
        "I participated in high school soccer and collegiate club volleyball, and I am currently learning golf.",
      logo: "ScoreboardTwoTone",
    },
    {
      name: "Hobbies",
      description:
        "I enjoy working out, trying new things, playing video games, and going to sporting events.",
      logo: "BatteryCharging80TwoTone",
    },
    {
      name: "Favorite Movies",
      description:
        "My top three movies of all time are 'Shawshank Redemption', 'Remember the Titans', and 'Top Gun' in no specific order.",
      logo: "MovieFilterTwoTone",
    },
    {
      name: "Favorite Shows",
      description:
        "My top three TV shows of all time are 'The 100', 'Game of Thrones', and.'Pine Gab'",
      logo: "ConnectedTvTwoTone",
    },
    {
      name: "Favorite Songs",
      description:
        "My three favorite songs at the moment are 'Don't Stop Believin'n' by Journey, 'Replay' by Iyaz, 'Oklahoma Smokeshow' by Zach Bryan, and 'Yes Indeed' by Drake.",
      logo: "LibraryMusicTwoTone",
    },
    {
      name: "Favorite Video Games",
      description:
        "My top three video games at the moment are 'Rocket League', 'Call of Duty', and 'Geoguessor'.",
      logo: "SportsEsportsTwoTone",
    },
    {
      name: "Favorite Cars",
      description:
        "My top three favorite car models are the 'Lexus RC F', the 'BMW M3', and the 'Porsche 718 Cayman GT4 RS'.",
      logo: "GarageTwoTone",
    },
    {
      name: "Favorite Vacations I've Been On",
      description:
        "My top three favorite places that I have gotten to visit are 'San Diego, CA', 'Washington D.C.', and 'Clearwater, FL'.",
      logo: "CardTravelTwoTone",
    },
    {
      name: "Places I Want to Live",
      description:
        "I want to end up living in 'Charlotte, NC', 'San Diego, CA', or 'Austin, TX'.",
      logo: "ApartmentTwoTone",
    },
    {
      name: "Dream Vacations Spots",
      description:
        "Several countries that I would like to visit are 'Greece', 'the United Kingdom', and 'Japan'.",
      logo: "ModeOfTravelTwoTone",
    },
    {
      name: "Everyday Essentials",
      description:
        "I  cannot leave my apartment without my 'airpods', 'mint gum', and my 'apple watch'.",
      logo: "CrisisAlertTwoTone",
    },
    {
      name: "Favorite Shoes",
      description:
        "My top three favorite shoes are 'Nike Blazer', 'Adidas Ultraboost', and 'Nike Air Max'.",
      logo: "DirectionsRunTwoTone",
    },
    {
      name: "Favorite Sports Teams",
      description:
        "My favorite college sport teams to watch are Michigan and Louisville, and my favorite professional sports teams to watch are the 'Detroit Lions' and 'Optic Gaming'.",
      logo: "ScreenShareTwoTone",
    },
    {
      name: "Unique",
      description:
        "I'm a 6'4\" triplet with a distinctive mole in my eye, giving it two different colors. I also enjoy growing bonsai trees.",
      logo: "FolderSpecialTwoTone",
    },
    {
      name: "Setup Tour",
      description:
        "Dell Inspiron 15 Laptop, ASUS TUF Gaming VG259QM 24.5” Monitor, FNATIC STREAK65 Mechanical Keyboard, Razer Basilisk Wireless Mouse, Besign laptop stand.",
      logo: "HomeWorkTwoTone",
    },
    {
      name: "Food Places in Louisville",
      description:
        "My three favorite restaurants located within the Louisville metro area are 'Guaca Mole', 'Goodfellas Pizzeria', and 'La Bodeguita De Mima'",
      logo: "RestaurantTwoTone",
    },
    {
      name: "Current Goals",
      description:
        "My current goals are to lock down a full time job, find a side hustle, and get better at golf.",
      logo: "SportsScoreTwoTone",
    },
    {
      name: "Favorite Apps",
      description:
        "My current favorite apps are 'YouTube', 'Spotify', and 'Instagram'.",
      logo: "PhoneIphoneTwoTone",
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
        cursor: "default",
      }}
    >
      {renderAboutObjects()}
    </Box>
  );
};
