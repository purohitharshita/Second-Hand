import React, { useState, useEffect } from "react";
import Navbar from "./Navbar"; // Import your Navbar component
import Footer from "./Footer"; // Import your Footer component
import { useAuth } from "../context/authContext";
import { useNavigate, useParams } from "react-router-dom";

const EditProduct = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  // State to manage form fields
  const [formData, setFormData] = useState({
    name: "",
    category: "other",
    description: "",
    price: "",
    images: [],
    specifications: [],
  });

  // State to manage individual specification input fields
  const [specificationField, setSpecificationField] = useState({
    key: "",
    value: "",
  });

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Add a new specification to the specifications array
  const handleAddSpecification = () => {
    if (specificationField.key && specificationField.value) {
      setFormData({
        ...formData,
        specifications: [...formData.specifications, specificationField],
      });
      setSpecificationField({
        key: "",
        value: "",
      }); // Clear the specification field
    }
  };

  // Remove a specification from the specifications array
  const handleRemoveSpecification = (index) => {
    const updatedSpecifications = [...formData.specifications];
    updatedSpecifications.splice(index, 1);
    setFormData({
      ...formData,
      specifications: updatedSpecifications,
    });
  };

  // Handle form submission
const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Perform client-side validation, for example, ensuring required fields are filled
    if (!formData.name || !formData.description || !formData.price) {
      console.error("Please fill out all required fields.");
      return;
    }
  
    try {
      const response = await fetch(`http://localhost:8000/api/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          uploadedBy: {
            id: user.id,
            name: user.name,
            college: user.college,
          },
        }),
      });
  
      if (response.ok) {
        // Product was successfully updated
        // You can redirect the user or show a success message
        console.log("Product updated successfully!");
        navigate(`/product/${id}`); // Redirect to the product details page after update
      } else {
        // Handle errors, e.g., show an error message to the user
        console.error("Failed to update product.");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error("Error:", error);
    }
  };
  

  // Fetch product details for editing
  useEffect(() => {
    // Fetch the product details using the id from the URL params
    const fetchProductDetails = async () => {
      try {
        console.log(id);
        const response = await fetch(
          `http://localhost:8000/api/products/${id}`
        ); // Replace with your API endpoint
        if (response.ok) {
          const data = await response.json();
          setFormData({
            name: data.name,
            category: data.category,
            description: data.description,
            price: data.price.$numberDecimal,
            images: data.images, // You may need to handle images separately if you want to show existing images
            specifications: data.specifications,
          });
        } else {
          console.error("Failed to fetch product details");
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductDetails();
  }, [id]);

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-4/5 mx-auto py-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          Edit Product
        </h1>
        <form onSubmit={handleSubmit}>
          {/* Product Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-600">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border rounded-lg py-2 px-3"
              required
            />
          </div>

          {/* Product Category Dropdown */}
          <div className="mb-4">
            <label htmlFor="category" className="block text-gray-600">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded-lg py-2 px-3"
              required
            >
              <option value="other">Other</option>
              <option value="electronics">Electronics</option>
              <option value="mattress">Mattress</option>
              <option value="air cooler">Air Cooler</option>
              <option value="cycles">Cycles</option>
              <option value="books">Books</option>
            </select>
          </div>

          {/* Product Description */}
          <div className="mb-4">
            <label htmlFor="description" className="block text-gray-600">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded-lg py-2 px-3"
              required
            />
          </div>

          {/* Product Price */}
          <div className="mb-4">
            <label htmlFor="price" className="block text-gray-600">
              Price (in ₹)
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded-lg py-2 px-3"
              required
              min="0"
            />
          </div>

          {/* Product Specifications (if applicable) */}
          <div className="mb-4">
            <label htmlFor="specifications" className="block text-gray-600">
              Specifications
            </label>
            {formData.specifications.map((spec, index) => (
              <div key={index} className="flex mb-2 justify-between">
                <input
                  type="text"
                  name={`specification-${index}-key`}
                  value={spec.key}
                  readOnly
                  className="w-[45%] border rounded-lg py-2 px-3 bg-gray-200 mr-2"
                  disabled
                />
                <input
                  type="text"
                  name={`specification-${index}-value`}
                  value={spec.value}
                  readOnly
                  className="w-[45%] border rounded-lg py-2 px-3 bg-gray-200 mr-2"
                  disabled
                />
                <button
                  type="button"
                  onClick={() => handleRemoveSpecification(index)}
                  className="w-[7%] bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-700 transition duration-300"
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="flex justify-between">
              <input
                type="text"
                id="specificationKeyField"
                name="specificationKeyField"
                value={specificationField.key}
                onChange={(e) =>
                  setSpecificationField({
                    ...specificationField,
                    key: e.target.value,
                  })
                }
                className="w-[45%] border rounded-lg py-2 px-3"
                placeholder="Key"
              />
              <input
                type="text"
                id="specificationValueField"
                name="specificationValueField"
                value={specificationField.value}
                onChange={(e) =>
                  setSpecificationField({
                    ...specificationField,
                    value: e.target.value,
                  })
                }
                className="w-[45%] border rounded-lg py-2 px-3"
                placeholder="Value"
              />
              <button
                type="button"
                onClick={handleAddSpecification}
                className="w-[7%] bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Add
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full py-2 px-4 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default EditProduct;
