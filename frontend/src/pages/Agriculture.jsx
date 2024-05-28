import React from "react";
import "../App.css";

import Nav from "../components/Nav";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import StatesSearch from "../components/StatesSearch";
import ProductsSearch from "../components/ProductsSearch";

const Agriculture = () => {
  return (
    <div>
      <Nav />
      <Hero />
      <StatesSearch />
      <ProductsSearch />
      <Footer />
    </div>
  );
};

export default Agriculture;
