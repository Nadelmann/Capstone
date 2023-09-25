import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import NavBar from './components/NavBar';
import UserLogin from './components/UserLogin';
import NewUserForm from './components/NewUserForm';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';
import JeweleryProducts from './components/jeweleryProducts';
import WomensClothingProducts from './components/womensclothing';
import MensClothingProducts from './components/mensclothing';
import ElectronicProducts from './components/electronics';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); // Add this line

  async function getProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div>
      <NavBar isLoggedIn={isLoggedIn} handleLogin={setLoggedIn} search={search} setSearch={setSearch} />
      <Routes>
        <Route path="/" element={<AllProducts products={products} search={search} />} />
        <Route path="/allproducts" element={<AllProducts products={products} search={search} />} />
        <Route path="/userlogin" element={<UserLogin onLogin={setLoggedIn} />} />
        <Route path="/newuserform" element={<NewUserForm />} />
        <Route path="/productdetails/:productId" element={<ProductDetails products={products} />} />
        <Route path="/jeweleryproducts" element={<JeweleryProducts />} />
        <Route path="/womensclothing" element={<WomensClothingProducts />} />
        <Route path="/mensclothing" element={<MensClothingProducts />} />
        <Route path="/electronics" element={<ElectronicProducts />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
