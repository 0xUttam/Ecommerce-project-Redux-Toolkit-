import { Link } from "react-router-dom";
import AddToCart from "./AddToCart";

const Header = () => {
  return (
    <header className="header">
      <div className="logo">MyStore</div>

      <nav className="nav">
        <a href="#"><Link to="/">Home</Link></a>
      </nav>
      <AddToCart/>
    </header>
  );
};

export default Header;
