import React from "react";
import products from "./productData";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

const RecentlyListedProducts = () => {
  const recentlyListedProducts = {};

  // Get the top 4 best selling products from each category
  ["Mattress", "Air Cooler", "Cycles", "Electronics", "Books"].forEach(
    (category) => {
      const categoryProducts = products
        .filter((product) => product.category === category)
        .sort((a, b) => b.numRatings - a.numRatings);
      recentlyListedProducts[category] = categoryProducts;
    }
  );

  return (
    <div className="bg-white py-8">
      <div className="max-w-screen-xl mx-auto">
        <div className="text-3xl text-gray-900 font-bold mb-4">
          Recently Listed Products
        </div>
        {["Mattress", "Air Cooler", "Cycles", "Electronics", "Books"].map(
          (category) => (
            <div id={category} key={category} className="mb-8">
              <div className="flex justify-between items-center mb-4 px-2">
                <h2 className="text-2xl font-semibold">{category}</h2>
                <Link
                  to={`/categories/${category.toLowerCase()}`}
                  className="bg-gray-900 text-white py-3 px-6 rounded-full hover:bg-yellow-500 hover:text-gray-800 transition duration-300 transform hover:scale-105"
                >
                  View All
                </Link>
              </div>
              <div className="flex overflow-auto py-2">
                <div className="flex w-full">
                  {recentlyListedProducts[category].map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecentlyListedProducts;
