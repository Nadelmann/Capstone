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
    <div className='card-container'>
      <div className='detailscard'>
      <h2>{selectedProduct.title}</h2>
      <img
          src={selectedProduct.image}
            alt={selectedProduct.title}
          style={{ maxHeight:"50%", maxWidth:"50%", margin:"2rem"}}
        />
      <p>Category: {selectedProduct.category}</p>
      <p>Price: ${selectedProduct.price}</p>
      <p>Description: {selectedProduct.description}</p>
      <button className='dButton' onClick={handleAddToCart}>Add to Cart</button>
      <button className='dButton' onClick={handleRemoveFromCart}>Remove from Cart</button>
      <Link to="/allproducts">
        <button className='dButton'>Back to All Products</button>
      </Link>
    </div>
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
