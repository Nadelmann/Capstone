import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useCart } from './cart-hooks';

export default function ProductCard({ product }) {
  const { addToCart, removeFromCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product); // Call addToCart function with the product
  };

  const handleRemoveFromCart = () => {
    removeFromCart(product.id); // Call removeFromCart function with productId
    };

  return (
    <div className="card-container">
      <div className='card'>
        <h3>{product.title}</h3>
        <h5>Price: ${product.price}</h5>
        <img
          src={product.image}
          alt={product.title}
          style={{ alignContent: "center", maxWidth: "100%", height: "auto", margin:"1rem"}}
        />
        <div />
        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
        <button onClick={() => handleRemoveFromCart(product.id)}>Remove from Cart</button>
        <Link to={`/productdetails/${product.id}`} className="detailsButton">
          Details
        </Link>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};
