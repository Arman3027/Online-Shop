import "../style/style.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="navigat">
      <ul className="ul-nav">
        <NavLink
          to="/"
          style={({ isActive }) => {
            return { color: isActive ? "#1995AD" : "#F1F1F2" };
          }}
          className="link-nav"
        >
          <li className="li-nav">Home</li>
        </NavLink>
        <NavLink
          to="/products"
          style={({ isActive }) => {
            return { color: isActive ? "#1995AD" : "#F1F1F2" };
          }}
          className="link-nav"
        >
          <li className="li-nav">Products</li>
        </NavLink>
        <NavLink
          to="/login"
          style={({ isActive }) => {
            return { color: isActive ? "#1995AD" : "#F1F1F2" };
          }}
          className="link-nav"
        >
          <li className="li-nav">Login</li>
        </NavLink>
        <NavLink
          to="/about"
          style={({ isActive }) => {
            return { color: isActive ? "#1995AD" : "#F1F1F2" };
          }}
          className="link-nav"
        >
          <li className="li-nav">About</li>
        </NavLink>
      </ul>
      <p>Online Shop</p>
    </div>
  );
};

export default Navbar;
