import { createContext, useState } from 'react'; // Remove import for useContext
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Define your fetch operation and provide missing values here
  const updateCart = () => {
    fetch('https://cors-anywhere.herokuapp.com/https://fakestoreapi.com/carts/7', {
      method: "PUT",
      body: JSON.stringify({
        userId: 'yourUserId',
        date: 'currentDate',
        products: [{ productId: 'productId', quantity: 'quantity' }]
      })
    })
      .then((response) => {
        // Handle response here if needed
        if (response.ok) {
          toast.success('Item has been added/removed from the cart', {
            position: 'top-right',
            autoClose: 2000, // Auto-close the notification after 2 seconds
          });
        } else {
          toast.error('Failed to update cart', {
            position: 'top-right',
            autoClose: 2000,
          });
        }
      })
      .catch(() => {
        // Handle error here
        toast.error('Failed to update cart', {
          position: 'top-right',
          autoClose: 2000,
        });
      });
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

    updateCart();
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

    // Call updateCart here when an item is removed from the cart
    updateCart();
  };


  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

