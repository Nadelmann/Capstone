import { useState } from "react";
import ProductCard from "./Productcard";
import ProductDetails from "./ProductDetails";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import PropTypes from "prop-types";



export default function AllProducts({ products, search }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const filteredProducts = products.filter((product) => {
    // Check if the search term is present in title, description, or category
    const searchTerm = search.toLowerCase();
    return (
      product.title.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.category.toLowerCase().includes(searchTerm)
    );
  });


  return (
    <div>
      <MDBContainer>
        <div style={{ padding: 10 }} />
        <MDBRow>
          {filteredProducts.map((product, index) => (
            <MDBCol key={`${product._id}-${index}`} md="4">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <ProductCard product={product} openProductDetails={openProductDetails} />
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
  products: PropTypes.array.isRequired,
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};
