import { useState, useEffect } from 'react';
import ProductCard from "./Productcard"; 
import ProductDetails from "./ProductDetails";
import { MDBContainer, MDBRow, MDBCol } from "mdbreact";

function JeweleryProducts() {
  const [jeweleryProducts, setJeweleryProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const openProductDetails = (product) => {
    setSelectedProduct(product);
  };

  const handleCloseDetails = () => {
    setSelectedProduct(null);
  };

  const [search] = useState("");

  const filteredProducts = jeweleryProducts.filter((product) => {
    return product.title.toLowerCase().includes(search.toLowerCase());
  });

  useEffect(() => {
    fetch('https://fakestoreapi.com/products/category/jewelery')
      .then(async (response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setJeweleryProducts(data); // Correct the state variable to setJeweleryProducts
      })
      .catch((error) => {
        console.error(error); // Log the error
      });
  }, []); // The dependency array should be empty

  return (
    <div style={{ marginLeft: 45, marginRight: 45 }}>
      <MDBContainer>
        <div style={{ padding: 10 }} />
        <MDBRow>
          {filteredProducts.map((product, index) => (
            <MDBCol key={`${product.id}-${index}`} md="4">
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

export default JeweleryProducts;
