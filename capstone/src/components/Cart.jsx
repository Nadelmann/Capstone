import { useContext } from 'react';
import CartItem from './CartItem';
import './Cart.css';
import { CartContext } from './CartContext'; 

const Cart = () => {

  const { cartItems, removeFromCart, addToCart } = useContext(CartContext);

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
        />
      ))}
      <h2>Total: ${calculateTotal(cartItems).toFixed(2)}</h2>
    </div>
  );
};

export default Cart;
