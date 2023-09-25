import { createContext, useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cart')) || []
  );

  
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

 
  const addNewCart = (userId, products) => {
   
    setCartItems([...cartItems, ...products]);
  };

 

  const addToCart = (selectedProduct) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === selectedProduct.id);

      if (isItemInCart) {
        return prev.map((item) =>
          item.id === selectedProduct.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...selectedProduct, amount: 1 }];
    });

   
  };

  const removeFromCart = (product) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === product.id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [])
    );

    
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, addNewCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
