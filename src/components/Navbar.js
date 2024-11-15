import { NavLink } from "react-router-dom";
import "./Navbar.css";
import logo from "../images/logo.png";

const Navbar = () => {
  return (
    <header>
      <a href="/">
        <img src={logo} alt="" className="logo" />
      </a>
      <nav>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "active-link" : "non-active-link"
          }
        >
          Shopping Lists
        </NavLink>
        <NavLink
          to="/archive"
          className={({ isActive }) =>
            isActive ? "active-link" : "non-active-link"
          }
        >
          Archive
        </NavLink>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive ? "active-link" : "non-active-link"
          }
        >
          Login
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
