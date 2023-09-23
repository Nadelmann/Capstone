import { useState } from "react";
import ProductCard from "./Productcard";
import ProductDetails from "./ProductDetails";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";
import PropTypes from "prop-types";



export default function AllProducts({ products }) {
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const [search] = useState("");

  const filteredProducts = products.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });


  return (
    <div style={{ marginLeft: 45, marginRight: 45 }}>
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
};
