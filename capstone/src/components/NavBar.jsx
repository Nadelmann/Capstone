import { Link } from "react-router-dom";
import PropTypes from "prop-types";


export default function NavBar({ search, setSearch }) {

  return (
    <nav className="nav">
      <div className="navbarset">
        <div className="cosmic">Cosmic</div>
        <Link className="anav" to="/allproducts">Products</Link>{"    "}
        <Link className="anav" to="/userlogin">Login</Link>{"    "}
        <Link className="anav" to="/newuserform">Register</Link>{"    "}
        <Link className="anav" to="/cart">Cart</Link>{"    "}
        <div className="dropdown">
          <button className="dropbtn">Categories<i className="fa fa-caret-down"></i>
      </button>
      <div className="dropdown-content">
      <Link className="a" to="/jeweleryproducts">Jewelry</Link>
        <Link className="a" to="/womensclothing">Womens clothing</Link> 
        <Link className="a" to="/mensclothing">Mens clothing</Link> 
        <Link className="a" to="/electronics">Electronics</Link>
        </div>
        <div className="navspace" />
        </div>
        <input
          className="searchBar"
          style={{ width: "50%", padding: "5px", margin: "15px" }}
          type="text"
          placeholder="   Search..."
          value={search} 
          onChange={(e) => setSearch(e.target.value)} 
        />
      </div>    
    </nav>
  );
}


  NavBar.propTypes = {
    search: PropTypes.string.isRequired, // Validate search prop as a string (isRequired means it must be provided)
    setSearch: PropTypes.func.isRequired, // Validate setSearch prop as a function (isRequired means it must be provided)
  };