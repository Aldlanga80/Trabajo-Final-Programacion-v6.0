import { useState } from "react";
import axiosInstance from "../api/axiosConfig";

const AddProducts = () => {
  const [form, setForm] = useState({ name: "", description: "", price: "", category: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...form, price: Number(form.price) };
      const res = await axiosInstance.post("/products", data);
      setMessage("Producto agregado correctamente");
      setForm({ name: "", description: "", price: "", category: "" });
    } catch (err: any) {
      setMessage(err.response?.data?.error || "Error al agregar producto");
    }
  };

  return (
    <div>
      <h1>Add Product</h1>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" name="name" value={form.name} onChange={handleChange} required />
        <textarea placeholder="Description" name="description" value={form.description} onChange={handleChange} required />
        <input placeholder="Price" name="price" value={form.price} onChange={handleChange} required />
        <input placeholder="Category" name="category" value={form.category} onChange={handleChange} />
        <button type="submit">Add</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProducts;
