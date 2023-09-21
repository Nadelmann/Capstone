import PropTypes from 'prop-types';
import setSelectedProduct from './ProductDetails';

export default function ProductCard({ product, setSelectedProductId }) {


    const handleDetailsClick = (product) => {
        console.log("Details button clicked for:", product);
        setSelectedProduct(product);
    };

    return (
        <div className="card-container">
            <div
                className="card"
                onClick={() => {
                    setSelectedProductId(product.id);
                }}
            >
                <h6>{product.title}</h6>
                <p>Price: ${product.price}</p>
                <img src={product.image}
              alt={product.title}
              className='img-fluid hover-shadow'
              style={{ alignContent: "center", maxWidth: "100%", height: "auto" }}
            />
            <div />
            <button className="detailsButton"
                    onClick={() => handleDetailsClick(product)}>
                    Details
            </button>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.number.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }),
        price: PropTypes.number.isRequired,
        description: PropTypes.string.isRequired,
        image: PropTypes.string.isRequired, // Add this line for 'image'
    }).isRequired,
    setSelectedProductId: PropTypes.func.isRequired,
};
