import PropTypes from 'prop-types';
import { useCart } from './cart-hooks';

const CartItem = ({ item }) => {
  const { addToCart, removeFromCart } = useCart(); // Import addToCart and removeFromCart

      return (
        <div className='wrapper'>
  
          <div className='cart-items'>
            <h3>{item.title}</h3>
            <div className='information'>
              <p>Price: ${item.price}</p>
              <div style={{ padding: 10 }} />
              <p>Total: ${(item.amount * item.price).toFixed(2)}</p>
            </div>
            <div className='buttons'>
              <button
                className='buttoncart'  
                onClick={() => removeFromCart(item)}
              >
                -
              </button>
              <p>{item.amount}</p>
              <button
                className='buttoncart'
                onClick={() => addToCart(item)}
              >
                +
              </button>
            </div>
          </div>
                    <img src={item.image} alt={item.title} style={{maxWidth:"300px", padding: 10}} />
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

