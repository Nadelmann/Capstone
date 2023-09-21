import './Cart.css';
import PropTypes from 'prop-types';

const CartItem = ({ item, addToCart, removeFromCart }) => (
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

CartItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    amount: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  addToCart: PropTypes.func.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

export default CartItem;
