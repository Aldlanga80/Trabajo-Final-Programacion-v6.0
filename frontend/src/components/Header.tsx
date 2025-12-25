import { Link } from "react-router-dom";
import "../styles/header.css"

const Header = () => (
  <header className="header">
    <nav>
      <Link to="/">Home</Link> |
      <Link to="/add-products">Add Product</Link> |
      <Link to="/about">About Us</Link> |
      <Link to="/login">Login</Link> |
      <Link to="/register">Register</Link> |
      <Link to="/contact">Contact</Link>
    </nav>
  </header>
);

export default Header;
