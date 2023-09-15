import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ProductCard from "./Productcard";
import ProductDetails from "./ProductDetails";

export default function AllProducts({ setSelectedProductId }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);


    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`);
                const data = await response.json();
                if (data.success) {
                    setProducts(data.data.posts); 
                } else {
                    console.error("Failed to fetch posts:", data.error);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);

    const handleDetailsClick = (product) => {
        setSelectedProduct(product); 
    };

    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div>
            <h1 style={{ textAlign: "center" }}>All Products</h1>
            {/* ... */}
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            {filteredProducts.map((product) => (
                <div key={product._id}>
                    <ProductCard product={product} setSelectedProductId={setSelectedProductId} />
                    <button
                        className="detailsButton"
                        onClick={() => handleDetailsClick(product)}
                    >
                        Details
                    </button>
                </div>
            ))}

            {selectedProduct && ( 
                <ProductDetails
                    selectedProduct={{
                        ...selectedProduct,
                        price: parseFloat(selectedProduct.price) 
                    }}
                    onClose={handleCloseDetails}
                />
            )}
        </div>
    );
}


AllProducts.propTypes = {
    setSelectedProductId: PropTypes.func.isRequired,
};
