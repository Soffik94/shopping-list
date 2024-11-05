import { NavLink } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  return (
    <header>
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
