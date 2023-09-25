import { Link } from "react-router-dom";
import PropTypes from "prop-types";

export default function NavBar({ search, setSearch }) {

  const handleSearchClick = () => {
   
    setSearch(""); 
  };

  return (
    <nav className="nav">
      <div className="navbarset">
        <div className="cosmic">Cosmic</div>
        <Link className="anav" to="/allproducts">Products</Link>{"    "}
        <Link className="anav" to="/userlogin">Login</Link>{"    "}
        <Link className="anav" to="/newuserform">Register</Link>{"    "}
        <Link className="anav" to="/cart">Cart</Link>{"    "}
        <div className="dropdown">
          <button className="dropbtn">Categories</button>
          <div className="dropdown-content">
            <Link className="a" to="/jeweleryproducts">Jewelry</Link>
            <Link className="a" to="/womensclothing">Womens clothing</Link> 
            <Link className="a" to="/mensclothing">Mens clothing</Link> 
            <Link className="a" to="/electronics">Electronics</Link>
          </div>
        </div>
        <div className="searchButton" onClick={handleSearchClick}>
          <i className="fas fa-search" style={{color:"#4c3061"}}></i> 
        </div>
        <input
          className="searchBar"
          style={{ width: "50%", padding: "5px", margin: "15px" }}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
    </nav>
  );
}

NavBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
