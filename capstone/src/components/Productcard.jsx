import PropTypes from 'prop-types';

export default function ProductCard({ product, setSelectedProductId }) {
    return (
        <div className="card-container">
            <div
                className="card"
                onClick={() => {
                    setSelectedProductId(product.id);
                }}
            >
                <h1>{product.title}</h1>
                {product.author && <p>Author: {product.author.username}</p>}
                <p>Price: {product.price}</p>
                <p>Description: {product.description}</p>
            </div>
        </div>
    );
}

ProductCard.propTypes = {
    product: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        author: PropTypes.shape({
            username: PropTypes.string.isRequired,
        }),
        price: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
    }).isRequired,
    setSelectedProductId: PropTypes.func.isRequired,
};
