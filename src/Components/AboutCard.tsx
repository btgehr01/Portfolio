import * as React from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import * as Icons from "@mui/icons-material";

type Props = {
  name: string;
  description: string;
  logo: string;
};

export default function BasicCard({ name, description, logo }: Props) {
  const LogoIcon = Icons[logo as keyof typeof Icons];
  return (
    <Card
      sx={{
        width: "500px",
        height: "125px",
        backgroundColor: "#1a1a1a",
        color: "white",
        transition: "border 0.3s ease-in-out",
        border: "2px solid transparent",
        "&:hover": {
          border: "2px solid #007bff",
          "& .icon-logo": {
            transform: "scale(1.2)",
          },
        },
      }}
    >
      <CardContent sx={{ display: "flex", flexDirection: "row" }}>
        {LogoIcon && (
          <LogoIcon
            className="icon-logo"
            sx={{
              fontSize: 60,
              paddingTop: "10px",
              paddingRight: "20px",
              transition: "transform 0.3s ease-in-out",
            }}
          />
        )}
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Typography variant="h5" component="div">
            {name}
          </Typography>
          <Typography
            sx={{ fontSize: 14, color: "white" }}
            color="text.secondary"
            gutterBottom
          >
            {description}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
