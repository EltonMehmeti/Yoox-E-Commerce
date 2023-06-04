import React, { useState, useEffect } from "react";
import axios from "axios";

const ProductTest = () => {
  const [productsTable, setProductsTable] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/admin/products")
      .then((response) => {
        setProductsTable(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      {productsTable.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          {product.Img1 && (
            <img
              src={`http://localhost:3001${product.Img1}`}
              alt={product.Img1}
              className="w-auto h-8 mr-3"
            />
          )}
          {product.Img2 && (
            <img
              src={`http://localhost:3001${product.Img2}`}
              alt={product.Img2}
              className="w-auto h-8 mr-3"
            />
          )}
          {product.Img3 && (
            <img
              src={`http://localhost:3001${product.Img3}`}
              alt={product.Img3}
              className="w-auto h-8 mr-3"
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default ProductTest;
