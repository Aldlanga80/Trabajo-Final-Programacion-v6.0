import axios from "axios";

export const fetchExternalData = async () => {
  const response = await axios.get("https://api.publicapis.org/entries");
  return response.data;
};
