import axios from "axios";

const apiUrl = "https://bradygehrman-api.vercel.app/api/email";

export const sendEmail = async (
  name: string,
  email: string,
  message: string
) => {
  const body = {
    fullName: name,
    email,
    message,
  };
  const response = await axios.post(`${apiUrl}/email`, body);
  return response.data;
};
