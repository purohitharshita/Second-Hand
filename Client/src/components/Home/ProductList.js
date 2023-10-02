import React from "react";
import ProductCard from "../Utility/ProductCard";

const ProductList = ({ currentProducts }) => {
  return (
    <div className="w-3/4 p-4">
      <div className="flex flex-wrap gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
