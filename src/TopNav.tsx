import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import BluetoothConnectedIcon from "@mui/icons-material/BluetoothConnected";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";

const pagesLeft = ["Portfolio", "Initiatives"];
const pagesRight = ["About", "Contact"];

function TopNav() {
  const navigate = useNavigate();
  const handleRedirect = (route: string) => {
    navigate(`/${route}`);
  };

  return (
    <AppBar
      className="top-nav"
      position="static"
      sx={{ backgroundColor: "black" }}
    >
      <Container maxWidth="xl">
        <Toolbar>
          <BluetoothConnectedIcon
            sx={{
              display: { xs: "none", md: "flex" },
              color: "grey",
              "&:hover": {
                color: "white",
                transition: "color 0.3s ease-in-out",
              },
            }}
          />
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-evenly",
                alignContent: "flex-start",
              },
            }}
          >
            {pagesLeft.map((page) => (
              <Button
                key={page}
                onClick={() => handleRedirect(page)}
                sx={{
                  my: 2,
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "grey",
                  "&:hover": {
                    color: "white",
                    transition: "color 0.3s ease-in-out",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <Typography
            variant="h6"
            noWrap
            onClick={() => handleRedirect("")}
            sx={{
              display: { xs: "flex", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "grey",
              cursor: "pointer",
              "&:hover": {
                color: "white",
                transition: "color 0.3s ease-in-out",
              },
            }}
          >
            Brady Gehrman
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: {
                xs: "none",
                md: "flex",
                justifyContent: "space-evenly",
                alignContent: "flex-start",
              },
            }}
          >
            {pagesRight.map((page) => (
              <Button
                key={page}
                onClick={() => handleRedirect(page)}
                sx={{
                  my: 2,
                  display: "block",
                  fontFamily: "monospace",
                  fontWeight: 700,
                  letterSpacing: ".3rem",
                  color: "grey",
                  "&:hover": {
                    color: "white",
                    transition: "color 0.3s ease-in-out",
                  },
                }}
              >
                {page}
              </Button>
            ))}
          </Box>
          <HomeIcon
            sx={{
              display: { xs: "flex", md: "flex" },
              color: "grey",
              "&:hover": {
                color: "white",
                transition: "color 0.3s ease-in-out",
              },
            }}
            onClick={() => handleRedirect("")}
          />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default TopNav;
