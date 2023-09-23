import { useState } from 'react';
import CartItem from './CartItem';
import './Cart.css';
import PropTypes from 'prop-types';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

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

  const calculateTotal = (items) =>
    items.reduce((ack, item) => ack + item.amount * item.price, 0);

  return (
    <div className='ShoppingCart'>
      <h2>Your Shopping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart.</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={handleAddToCart}
          removeFromCart={handleRemoveFromCart}
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

Cart.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Cart;
