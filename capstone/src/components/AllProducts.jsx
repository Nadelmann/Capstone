import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import ProductCard from "./Productcard";
import ProductDetails from "./ProductDetails";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

export default function AllProducts({ setSelectedProductId }) {
    const [products, setProducts] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedProduct, setSelectedProduct] = useState(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products`);
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        }
        fetchProducts();
    }, []);


    const handleCloseDetails = () => {
        setSelectedProduct(null);
    };

    const filteredProducts = products.filter((product) => {
        return product.title.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <div style={{ marginLeft: 45, marginRight: 45 }}>
            <MDBContainer>
            <div style={{padding: 10 }}/>
            <MDBRow>
            {filteredProducts.map((product, index) => (
                <MDBCol key={`${product._id}-${index}`} md="4">
                    <div style={{ display: "flex", flexDirection: "column" }}>
                        <ProductCard product={product} setSelectedProductId={setSelectedProductId} />
                    </div>
                </MDBCol>
            ))}

            {selectedProduct && (
                <MDBCol md="12">
                    <ProductDetails
                        selectedProduct={{
                            ...selectedProduct,
                            price: parseFloat(selectedProduct.price),
                        }}
                        onClose={handleCloseDetails}
                    />
                </MDBCol>
            )}
            </MDBRow>
            </MDBContainer>
        </div>
    );
}

AllProducts.propTypes = {
    setSelectedProductId: PropTypes.func.isRequired,
};
