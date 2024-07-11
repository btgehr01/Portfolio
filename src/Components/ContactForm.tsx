import React, { useRef, useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";

const ContactForm = () => {
  const siteKey: string = process.env.REACT_APP_GOOGLE_RECAPTCHA_SITE_KEY || "";
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [captchaValid, setCaptchaValid] = useState(false);

  console.log("siteKey", siteKey);

  const handleCaptchaChange = (value: string | null): void => {
    setCaptchaValid(!!value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (captchaValid) {
      console.log("Form submitted");
    } else {
      console.log("Please complete the CAPTCHA");
    }

    if (recaptchaRef?.current) {
      setCaptchaValid(false);
      recaptchaRef.current.reset();
    }
  };
  return (
    <Box
      sx={{
        height: "100%",
        display: "flex",
        justifyContent: "start",
        alignItems: "center",
        padding: "1rem",
        backgroundColor: "black",
      }}
    >
      <Box
        component="form"
        sx={{
          width: "100%",
          maxWidth: "500px",
          backgroundColor: "#1a1a1a",
          padding: "2rem",
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.3)",
          color: "white",
        }}
        onSubmit={handleSubmit}
      >
        <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
          Contact Me
        </Typography>
        <TextField
          fullWidth
          label="Full Name"
          margin="normal"
          variant="outlined"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: { color: "white" },
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Email Address"
          margin="normal"
          variant="outlined"
          type="email"
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: { color: "white" },
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray",
              },
            },
          }}
        />
        <TextField
          fullWidth
          label="Message"
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          InputLabelProps={{ style: { color: "white" } }}
          InputProps={{
            style: { color: "white" },
            sx: {
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "white",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "lightgray",
              },
            },
          }}
        />
        <Box
          sx={{
            display: "flex",
            justifyContent: "start",
            margin: "1rem 0",
          }}
        >
          <ReCAPTCHA
            ref={recaptchaRef}
            sitekey={siteKey}
            onChange={handleCaptchaChange}
          />
        </Box>
        <Button
          fullWidth
          variant="outlined"
          sx={{ marginTop: "1rem" }}
          type="submit"
          disabled={!captchaValid}
        >
          Send Message
        </Button>
      </Box>
    </Box>
  );
};

export default ContactForm;
