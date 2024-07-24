import React from "react";
import "./Styles/App.scss";
import { Route, Routes } from "react-router-dom";
import MainPage from "./Screens/MainPage";
import { NotFound } from "./Screens/NotFound";
import { Portfolio } from "./Screens/Portfolio";
import { Initiatives } from "./Screens/Initiatives";
import { About } from "./Screens/About";
import { Contact } from "./Screens/Contact";
import { Box } from "@mui/material";
import TopNav from "./TopNav";
import Footer from "./Footer";
import ErrorScreen from "./Screens/Error";

const App: React.FC = () => {
  return (
    <Box
      sx={{
        minWidth: "100%",
        minHeight: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <TopNav />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/initiatives" element={<Initiatives />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/errorScreen" element={<ErrorScreen />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </Box>
  );
};

export default App;
