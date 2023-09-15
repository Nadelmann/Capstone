import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'mdbreact/dist/css/mdb.css';
import './App.css'
import { NavBar } from "./Components/NavBar";
import AllProducts from "./Components/AllProducts";
import UserLogin from "./Components/UserLogin";
import { useState } from "react";
import Home from "./Components/Home";
import { NewUserForm } from "./Components/NewUserForm";
import { Routes, Route } from "react-router-dom";

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [selectedProductId, setSelectedProductId] = useState(null);
  
  const handleSelectProduct = (productId) => {
    setSelectedProductId(productId);
  };

  return (
    <>
      <div>
      <div id="main-section">
          <NavBar isLoggedIn={isLoggedIn} handleLogin={setLoggedIn} />
          <Routes>
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
            <Route path="/allproducts" element={<AllProducts setSelectedProductId={handleSelectProduct} />} />
            <Route path="/userlogin" element={<UserLogin onLogin={setLoggedIn} />} />
            <Route path="/newuserform" element={<NewUserForm />} />
</Routes>

        </div>
      </div>

    </>
  )
}

export default App
