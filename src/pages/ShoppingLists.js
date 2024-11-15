import "./ShoppingLists.css";
import { Link } from "react-router-dom";

const ShoppingLists = () => {
  return (
    <div className="layout">
      <Link to="/listdetail" className="link">
        List Detail
      </Link>
    </div>
  );
};

export default ShoppingLists;
