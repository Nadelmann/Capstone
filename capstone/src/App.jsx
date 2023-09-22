import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import AllProducts from './components/AllProducts';
import NavBar from './components/NavBar';
import UserLogin from './components/UserLogin';
import NewUserForm from './components/NewUserForm';
import ProductDetails from './components/ProductDetails';
import Cart from './components/Cart';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  // Function to fetch product data
  async function getProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      setError(error.message); // Store the error message in state
    }
  }

  useEffect(() => {
    getProducts();
  }, []);


  return (
    <div>
      <div>
        <NavBar isLoggedIn={isLoggedIn} handleLogin={setLoggedIn} setSearch={setSearch} style={{}} />
        <Routes>
          <Route path="/allproducts" element={<AllProducts products={products} search={search} />} />
          <Route path="/userlogin" element={<UserLogin onLogin={setLoggedIn} />} />
          <Route path="/newuserform" element={<NewUserForm />} />

          {/* Route for displaying ProductDetails */}
          <Route path="/productdetails/:productId" element={<ProductDetails products={products} />} />

          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
      {error && <div>Error: {error}</div>}
    </div>
  );
}

export default App;
