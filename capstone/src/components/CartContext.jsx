import { createContext, useState } from 'react'; // Remove import for useContext
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addNewCart = (userId, products) => {
    fetch('https://fakestoreapi.com/carts', {
      method: 'POST',
      body: JSON.stringify({
        userId: userId,
        date: new Date().toISOString(), // Use the current date
        products: products,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Failed to add a new cart');
        }
      })
      .then((newCart) => {
        // Handle the response or update the state as needed
        console.log('New Cart:', newCart);
      })
      .catch((error) => {
        // Handle errors
        console.error('Error:', error);
      });
  };

  // Define your fetch operation and provide missing values here
  const updateCart = () => {
    fetch('https://fakestoreapi.com/carts/7', {
      method: "PUT",
      body: JSON.stringify({
        userId: 'yourUserId',
        date: 'currentDate',
        products: [{ productId: 'productId', quantity: 'quantity' }]
      })
    })
      .then((response) => {
        console.log('Response:', response);
        // Handle response here if needed
        if (response.ok) {
          toast.success('Item has been added/removed from the cart', {
            position: 'top-right',
            autoClose: 2000, 
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
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, addNewCart }}>
      {children}
    </CartContext.Provider>
  );
};

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

