import axios from "axios";

const apiUrl = "https://bradygehrman-api.vercel.app/api/email";

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    const body = {
      fullName: name,
      email,
      message,
    };
    const response = await axios.post(`${apiUrl}/sendEmail`, body);
    return response.data;
  } catch (error) {
    throw new Error("Failed to send email. Please try again later.");
  }
};
