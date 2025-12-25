import "../styles/productCard.css"

interface Props {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

const ProductCard = ({ id, name, description, price, category }: Props) => (
  <div className="product-card">
    <h3>{name}</h3>
    <p>{description}</p>
    <p>Price: ${price}</p>
    <p>Category: {category}</p>
  </div>
);

export default ProductCard;
