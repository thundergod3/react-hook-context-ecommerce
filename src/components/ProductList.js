import React, { useContext } from "react";
import ProductItem from "./ProductItem";
import TitleProduct from "./TitleProduct";
import { ProductContext } from "../context/ProductContext";

function ProductList() {
  const { products } = useContext(ProductContext);
  console.log(products)

  return (
    <React.Fragment>
      <div className="py-5">
        <div className="container">
          <TitleProduct name="our" title="products" />
          <div className="row">
            {products.map(product => {
              return <ProductItem key={product.id} product={product} />;
            })}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ProductList;
