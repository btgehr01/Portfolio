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
  try {
    const response = await axios.post(`${apiUrl}/email`, body);
    return response.data;
  } catch (e) {
    console.error(e);
  }
};
