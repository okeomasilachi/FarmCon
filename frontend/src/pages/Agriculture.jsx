import React, {useState} from "react";
import "../App.css";

import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import StatesSearch from "../components/search/StatesSearch";
import ProductsSearch from "../components/search/ProductsSearch";

const Agriculture = () => {
  const [search, setSearch] = useState("");

  return (
    <div>
      <Nav />
      <Hero setSearchAll={setSearch}/>
      <StatesSearch search={search}/>
      <ProductsSearch search={search}/>
      <Footer />
    </div>
  );
};

export default Agriculture;
