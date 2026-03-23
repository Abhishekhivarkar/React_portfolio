import axios from "axios";

const api = axios.create({
  baseURL: "https://react-portfolio-rm59.onrender.com",
  withCredentials: true
});

export const createContact = async ({ fullName, email, message }) => {
  try {

    const response = await api.post("/api/contact/send", {
      fullName,
      email,
      message
    });

    return response.data;

  } catch (err) {
    console.log(err);
    return null;
  }
};