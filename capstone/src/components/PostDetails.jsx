import PropTypes from 'prop-types';

export default function ProductDetails({ selectedProduct, onClose }) {
  if (!selectedProduct) {
    return null; 
  }

  return (
    <div>
      <h2>Selected Product Details</h2>
      <p>Title: {selectedProduct.title}</p>
      <p>Price: {selectedProduct.price}</p>
      <p>Description: {selectedProduct.description}</p>
      <button className="goBackButton" onClick={onClose}>Go Back</button>
    </div>
  );
}

ProductDetails.propTypes = {
    selectedProduct: PropTypes.shape({
      title: PropTypes.string.isRequired,
      author: PropTypes.shape({
        username: PropTypes.string.isRequired,
      }).isRequired,
      price: PropTypes.number.isRequired,
      description: PropTypes.string.isRequired,
    }),
    onClose: PropTypes.func.isRequired,
  };
  