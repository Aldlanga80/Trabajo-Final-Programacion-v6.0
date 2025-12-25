import fetch from "node-fetch";

export const fetchExternalData = async () => {
  const res = await fetch("https://fakestoreapi.com/products");

  if (!res.ok) {
    throw new Error("Error al obtener datos externos");
  }

  return await res.json();
};
