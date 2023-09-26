import { createContext, useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';


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

  const removeFromCart = (selectedProduct) => {
    setCartItems((prev) => {
      const updatedCart = [...prev];
      const index = updatedCart.findIndex((item) => item.id === selectedProduct.id);
  
      if (index !== -1) {
        if (updatedCart[index].amount === 1) {
          updatedCart.splice(index, 1);
        } else {
          updatedCart[index].amount -= 1;
        }
      }
  
      return updatedCart;
    });
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
