import mongoose from "mongoose";
import Product from "../model/ProductModel"
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/tienda";

const products = [
  {
    name: "Laptop Gamer X200",
    description: "Laptop de alto rendimiento para gaming, con procesador i7 y tarjeta gráfica dedicada RTX 3060.",
    price: 1500,
    stock: 10,
    category: "Electrónica"
  },
  {
    name: "Auriculares Inalámbricos Pro",
    description: "Auriculares con cancelación de ruido activa y batería de larga duración.",
    price: 200,
    stock: 25,
    category: "Audio"
  },
  {
    name: "Smartwatch Fit 5",
    description: "Reloj inteligente con monitor de ritmo cardíaco, GPS y resistencia al agua.",
    price: 150,
    stock: 30,
    category: "Wearables"
  },
  {
    name: "Teclado Mecánico RGB",
    description: "Teclado con switches mecánicos, retroiluminación RGB y conexión USB-C.",
    price: 100,
    stock: 50,
    category: "Accesorios"
  },
  {
    name: "Monitor 27\" 144Hz",
    description: "Monitor gaming de 27 pulgadas, resolución QHD y 144Hz de refresco.",
    price: 350,
    stock: 20,
    category: "Monitores"
  }
];

mongoose.connect(MONGO_URI)
  .then(async () => {
    console.log("Conectado a MongoDB Atlas");

    // Limpiar colección antes de insertar
    await Product.deleteMany({});
    console.log("Colección limpiada");

    // Insertar productos
    await Product.insertMany(products);
    console.log("Productos insertados correctamente");

    mongoose.disconnect();
  })
  .catch(err => console.error("Error de conexión:", err));
