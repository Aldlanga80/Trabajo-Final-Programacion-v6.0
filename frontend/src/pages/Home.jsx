import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import UpdateProduct from "../components/UpdateProduct";
import { useAuth } from "../context/AuthContext";
import { CATEGORIES } from "../constants/categories.js";
import ToastMessage from "../components/ToastMesagge.jsx";

const Home = () => {
  const { user, token } = useAuth();

  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

  const fetchingProducts = async () => {
    try {
      const response = await fetch(`${API_URL}/products`);
      const data = await response.json();
      setProducts(data.data); // Asegúrate que el backend devuelve { data: [...] }
    } catch (err) {
      console.error("Error al traer productos:", err);
    }
  };


  const deleteProduct = async (id) => {
    if (!confirm("Está seguro de borrar el producto?")) return;
    try {
      const res = await fetch(`${API_URL}/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.error) return alert(data.error);
      setProducts(products.filter((p) => p._id !== id));
    } catch (err) {
      console.error("Error al borrar:", err);
    }
  };

  useEffect(() => {
    fetchingProducts();
  }, []);

  return (
    <Layout>
      <h2>Nuestros Productos</h2>
      {selectedProduct && (
        <UpdateProduct
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onUpdate={fetchingProducts}
        />
      )}
      <div className="products-grid">
        {products.map((p) => (
          <div key={p._id} className="product-card">
            <h3>{p.name}</h3>
            <p>{p.description}</p>
            <p>Precio: ${p.price}</p>
            <p>Stock: {p.stock}</p>
            <p>Categoría: {p.category}</p>
            {user && (
              <div>
                <button onClick={() => setSelectedProduct(p)}>Actualizar</button>
                <button onClick={() => deleteProduct(p._id)}>Borrar</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Home;
