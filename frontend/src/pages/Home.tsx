import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosConfig";
import ProductCard from "../components/ProductCard";

interface IProduct {
  _id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

const Home = () => {
  const [products, setProducts] = useState<IProduct[]>([]);

  useEffect(() => {
    axiosInstance.get("/products")
      .then(res => setProducts(res.data.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div>
      <h1>Products</h1>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            id={product._id}
            name={product.name}
            description={product.description || ""}
            price={product.price}
            category={product.category || "General"}
          />
        ))}

      </div>
    </div>
  );
};

export default Home;
