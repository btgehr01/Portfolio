import React, { useRef, useState } from "react";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  TextField,
  Typography,
} from "@mui/material";
import ReCAPTCHA from "react-google-recaptcha";
import { sendEmail } from "../Helpers/EmailHelper";

const ContactForm = () => {
  const siteKey = "6LcqoAAqAAAAAAr_HWWsHzn1a7ANpB2ESIG7hhDP";
  const recaptchaRef = useRef<ReCAPTCHA | null>(null);
  const [captchaValid, setCaptchaValid] = useState(false);

  enum MessageType {
    Empty = "EMPTY",
    Success = "SUCCESS",
    Error = "ERROR",
  }

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState(MessageType.Empty);

  const [fullNameError, setFullNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [messageError, setMessageError] = useState(false);

  const handleCaptchaChange = (value: string | null): void => {
    setCaptchaValid(!!value);
  };

  const renderOutputMessage = () => {
    switch (output) {
      case MessageType.Empty:
        return null;
      case MessageType.Success:
        return (
          <Alert severity="success">
            Your message has been successfully sent.
          </Alert>
        );
      case MessageType.Error:
        return (
          <Alert severity="error">
            Failed to send your message. Please try again later.
          </Alert>
        );
      default:
        return null;
    }
  };

  const resetFormFields = () => {
    setFullName("");
    setEmail("");
    setMessage("");
    if (recaptchaRef?.current) {
      setCaptchaValid(false);
      recaptchaRef.current.reset();
    }
  };

  const validateForm = () => {
    let valid = true;

    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    if (!fullNameRegex.test(fullName.trim())) {
      setFullNameError(true);
      valid = false;
    } else {
      setFullNameError(false);
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(true);
      valid = false;
    } else {
      setEmailError(false);
    }

    if (message.trim() === "") {
      setMessageError(true);
      valid = false;
    } else {
      setMessageError(false);
    }

    return valid;
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ): Promise<void> => {
    event.preventDefault();
    setOutput(MessageType.Empty);

    if (validateForm() && captchaValid) {
      setIsLoading(true);
      try {
        await sendEmail(fullName, email, message);
        setOutput(MessageType.Success);
        resetFormFields();
      } catch (e) {
        setOutput(MessageType.Error);
      } finally {
        setIsLoading(false);
      }
    } else if (!captchaValid) {
      console.log("Please complete the CAPTCHA");
    }
  };

  const handleInputChange =
    (setter: React.Dispatch<React.SetStateAction<string>>) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
      if (output !== MessageType.Empty) {
        setOutput(MessageType.Empty);
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
          id="fullName"
          label="Full Name"
          margin="normal"
          variant="outlined"
          value={fullName}
          onChange={handleInputChange(setFullName)}
          error={fullNameError}
          helperText={
            fullNameError
              ? "Please enter a valid full name in the format 'First Name Last Name'."
              : ""
          }
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
          id="email"
          label="Email Address"
          margin="normal"
          variant="outlined"
          value={email}
          onChange={handleInputChange(setEmail)}
          error={emailError}
          helperText={emailError ? "Please enter a valid email address." : ""}
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
          id="message"
          label="Message"
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          value={message}
          onChange={handleInputChange(setMessage)}
          error={messageError}
          helperText={messageError ? "Message cannot be empty." : ""}
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
        {captchaValid ? (
          <Button
            fullWidth
            variant="outlined"
            sx={{ marginTop: "1rem" }}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <CircularProgress size={24} /> : "Send Message"}
          </Button>
        ) : (
          <>{renderOutputMessage()}</>
        )}
      </Box>
    </Box>
  );
};

export default ContactForm;
