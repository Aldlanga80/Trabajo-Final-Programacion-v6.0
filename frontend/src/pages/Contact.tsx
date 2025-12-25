import { useState } from "react";
import axiosInstance from "../api/axiosConfig";

const Contact = () => {
  const [form, setForm] = useState({ email: "", subject: "", message: "" });
  const [msg, setMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/email", form);
      setMsg("Mensaje enviado correctamente");
      setForm({ email: "", subject: "", message: "" });
    } catch (err: any) {
      setMsg(err.response?.data?.error || "Error al enviar mensaje");
    }
  };

  return (
    <div>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="subject" placeholder="Subject" value={form.subject} onChange={handleChange} required />
        <textarea name="message" placeholder="Message" value={form.message} onChange={handleChange} required />
        <button type="submit">Send</button>
      </form>
      {msg && <p>{msg}</p>}
    </div>
  );
};

export default Contact;
