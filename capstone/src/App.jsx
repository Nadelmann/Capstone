import { useState, useEffect } from 'react';
import { LinearProgress } from '@mui/material';
import { Drawer } from '@mui/material';
import Cart from './components/Cart';
import AllProducts from './components/AllProducts';
import NavBar from './components/NavBar';
import UserLogin from './components/UserLogin';
import NewUserForm from './components/NewUserForm';
import { Routes, Route, } from 'react-router-dom';
import ProductDetails from './components/ProductDetails'; // Import the ProductDetails component

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('authToken'));
  const [search, setSearch] = useState('');
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null); // Track the selected product
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);



  // Function to fetch product data
  async function getProducts() {
    try {
      const response = await fetch('https://fakestoreapi.com/products');
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      setError(error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  // Function to handle adding items to the cart
  function handleAddToCart(clickedItem) {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id ? { ...item, amount: item.amount + 1 } : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  }

  // Function to handle removing items from the cart
  function handleRemoveFromCart(id) {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );
  }

  // Function to open the ProductDetails component
  function openProductDetails(product) {
    setSelectedProduct(product);
  }

  // Function to close the ProductDetails component
  function closeProductDetails() {
    setSelectedProduct(null);
  }

  if (isLoading) return <LinearProgress />;
  if (error) return <div>Something went wrong ...</div>;

  return (
    <div>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart cartItems={cartItems} addToCart={handleAddToCart} removeFromCart={handleRemoveFromCart} />
      </Drawer>
      <div>
        <NavBar isLoggedIn={isLoggedIn} handleLogin={setLoggedIn} setSearch={setSearch} style={{}} />
        <Routes>
          <Route path="/allproducts" element={<AllProducts products={products} setSelectedProduct={openProductDetails} search={search} />} />
          <Route path="/userlogin" element={<UserLogin onLogin={setLoggedIn} />} />
          <Route path="/newuserform" element={<NewUserForm />} />
          <Route path="/productdetails" element={<ProductDetails selectedProduct={selectedProduct} onClose={closeProductDetails} />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
