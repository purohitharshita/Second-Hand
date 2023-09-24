import React, { useState, useEffect } from "react";
import { FaShoppingCart } from "react-icons/fa";

const ProductDetails = ({ productId }) => {
  const [clickedButtonId, setClickedButtonId] = useState(null);
  const [productDetails, setProductDetails] = useState(null);

  const handleAddToCart = (productId) => {
    setClickedButtonId(productId);
    setTimeout(() => {
      setClickedButtonId(null);
    }, 1000); // Change the delay time as needed
    // Your actual add to cart logic can be added here
  };

  useEffect(() => {
    // Fetch the product details from the API using the productID from the URL params
    const fetchProductDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:8000/api/products/${productId}`
        ); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setProductDetails(data);
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [productId]);

  if (!productDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white p-4 rounded-lg shadow-md m-4">
      <div className="flex flex-col md:flex-row">
        <img
          src={productDetails.images[0]} // Modify to use the correct image source
          alt={productDetails.name}
          className="w-full md:w-1/2 h-auto rounded-lg"
        />
        <div className="md:ml-6 mt-4 md:mt-0">
          <h1 className="text-3xl font-semibold">{productDetails.name}</h1>
          <p className="text-gray-500 mt-2">
            Uploaded by - {productDetails.uploadedBy.name}
          </p>
          <p className="text-2xl font-semibold mt-4">
            ₹{parseFloat(productDetails.price.$numberDecimal).toFixed(2)}
          </p>
          <button
            className={`mt-8 flex items-center px-5 py-3 rounded text-lg ${
              clickedButtonId === productDetails._id
                ? "bg-green-500"
                : "bg-yellow-500 hover:bg-yellow-600"
            } text-gray-800 transition duration-300 transform`}
            onClick={() => handleAddToCart(productDetails._id)}
          >
            <span
              className={`mr-2 ${
                clickedButtonId === productDetails._id ? "animate-ping" : ""
              } transition-transform`}
            >
              <FaShoppingCart />
            </span>
            Add to Cart
          </button>
          <div className="mt-8">
            <h2 className="text-xl font-semibold">Description</h2>
            <p className="text-gray-900 mt-2">{productDetails.description}</p>
          </div>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold">Specifications</h2>
        <div className="border-t border-gray-300 mt-2 pt-2">
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
            {productDetails.specifications.map((spec, index) => (
              <div
                key={index}
                className="p-2 text-gray-900 hover:text-yellow-500 transition-transform hover:scale-105 transform-gpu duration-300 hover:bg-gray-900 hover:shadow-md rounded-md"
              >
                <dt className="font-semibold">{spec.key}</dt>
                <dd className="text-sm font-medium">{spec.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
