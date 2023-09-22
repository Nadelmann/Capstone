import PropTypes from 'prop-types';
import { useParams, Link } from 'react-router-dom'; // Import Link component
import { useCart } from './cart-hooks';

export default function ProductDetails({ products }) {
  const { productId } = useParams();
  const selectedProduct = products.find(product => product.id === parseInt(productId));
  const { addToCart, removeFromCart } = useCart();

  if (!selectedProduct) {
    return null;
  }

  const handleAddToCart = () => {
    addToCart(selectedProduct);
  };

  const handleRemoveFromCart = () => {
    removeFromCart(selectedProduct.id);
  };

  return (
    <div>
      <h2>Selected Product Details</h2>
      <p>Title: {selectedProduct.title}</p>
      <p>{selectedProduct.image}</p>
      <p>Category: {selectedProduct.category}</p>
      <p>Price: ${selectedProduct.price}</p>
      <p>Description: {selectedProduct.description}</p>
      <button onClick={handleAddToCart}>Add to Cart</button>
      <button onClick={handleRemoveFromCart}>Remove from Cart</button>
      <Link to="/allproducts">
        <button>Back to All Products</button>
      </Link>
    </div>
  );
}

ProductDetails.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
};
