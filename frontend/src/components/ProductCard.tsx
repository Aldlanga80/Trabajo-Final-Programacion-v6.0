interface Props {
  id: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
}

const ProductCard = ({ id, name, description, price, category }: Props) => {
  return (
    <div className="product-card">
      <h2>{name}</h2>
      <p>{description}</p>
      <p>${price}</p>
      <p>Category: {category}</p>
    </div>
  );
};

export default ProductCard;
