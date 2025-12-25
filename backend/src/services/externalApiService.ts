import axios from "axios";

export const fetchExternalData = async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  return response.data;
};
