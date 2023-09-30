import React from "react";
import ProductCard from "../ProductCard";

const ProductList = ({ currentProducts }) => {
  return (
    <div className="w-3/4 p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
