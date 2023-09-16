import { Link } from "react-router-dom";

export function NavBar() {
  return (
    <nav>
      <div className="navbarset">
        <div className="cosmic">Cosmic</div>
        <Link className="anav" to="/allproducts">Products</Link>{"    "}
        <Link className="anav" to="/userlogin">Login</Link>{"    "}
        <Link className="anav" to="/newuserform">Register</Link>{"    "}
      </div>
    </nav>
  );
}
