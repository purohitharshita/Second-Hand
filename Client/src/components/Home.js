import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ProductsList from "./Home/index";

const Home = () => {
  return (
    <div>
      <Navbar />
      <ProductsList />
      <Footer />
    </div>
  );
};

export default Home;
