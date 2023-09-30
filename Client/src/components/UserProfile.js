import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserDetails from "./Profile/UserDetails"; // Import UserDetails component
import { useAuth } from "../context/authContext";
import Navbar from "./Navbar";
import Footer from "./Footer";

const UserProfile = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({}); // Store form data for editing

  useEffect(() => {
    // Fetch the user's profile data from the backend using the id
    fetch(`http://localhost:8000/api/users/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setFormData(data); // Initialize form data with fetched data
      })
      .catch((error) => {
        console.error("Error fetching user data: ", error);
      });
  }, [id]);

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleSaveClick = () => {
    // Send updated user data to the backend
    fetch(`http://localhost:8000/api/users/${id}`, {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserData(data);
        setEditMode(false);
      })
      .catch((error) => {
        console.error("Error updating user data: ", error);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="w-4/5 mx-auto py-4">
        <h1 className="text-3xl font-semibold text-gray-900 mb-4">
          User Profile
        </h1>
        {/* Render UserDetails component */}
        {userData && (
          <UserDetails
            userData={userData}
            displayEdit={user && user.id}
            editMode={editMode}
            formData={formData}
            handleChange={handleChange}
            handleEditClick={handleEditClick}
            handleSaveClick={handleSaveClick}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default UserProfile;
