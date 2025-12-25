import axios from "axios";

export const fetchExternalData = async () => {
  const response = await axios.get(
    "https://fakestoreapi.com/products",
    {
      headers: {
        "User-Agent": "Mozilla/5.0",
        "Accept": "application/json",
        "Referer": "https://fakestoreapi.com/"
      }
    }
  );

  return response.data;
};
