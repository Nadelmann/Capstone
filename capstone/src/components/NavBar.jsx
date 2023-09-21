import { Link } from "react-router-dom";
import { useState } from "react";


export default function NavBar() {

  const [search, setSearch] = useState("");

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
        <Link className="a" to="#">Link 1</Link>
        <Link className="a" to="#">Link 2</Link> 
        <Link className="a" to="#">Link 3</Link> 
        <Link className="a" to="#">Link 4</Link>
        </div>
        <div className="navspace" />
        </div>
                <input className="searchBar"
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
