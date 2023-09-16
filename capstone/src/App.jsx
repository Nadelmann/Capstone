import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './App.css'
import { NavBar } from "./components/NavBar";
import AllProducts from "./components/AllProducts";
import UserLogin from "./components/UserLogin";
import { useState } from "react";
import { NewUserForm } from "./components/NewUserForm";
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
          <div />
          <Routes>
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
