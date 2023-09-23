import PropTypes from 'prop-types';
import { useCart } from './cart-hooks';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart(); // Import addToCart and removeFromCart

  const handleAddToCart = () => {
    // Update the cartItems state
    addToCart(item);

    // Update local storage with the updated cartItems (Implement localStorage logic here)
  };

  const handleRemoveFromCart = () => {
    // Update the cartItems state
    removeFromCart(item);

    // Update local storage with the updated cartItems (Implement localStorage logic here)
  };

      return (
        <div className='wrapper'>
          <div>
            <h3>{item.title}</h3>
            <div className='information'>
              <p>Price: ${item.price}</p>
              <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='buttons'>
              <button
                className='small-button'
                onClick={() => removeFromCart(item.id)}
              >
                -
              </button>
              <p>{item.amount}</p>
              <button
                className='small-button'
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>
          </div>
          <img src={item.image} alt={item.title} />
        </div>
      );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default CartItem;
