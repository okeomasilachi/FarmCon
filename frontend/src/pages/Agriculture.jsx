import React, {useState} from "react";
import "../App.css";

import Nav from "../components/nav/Nav";
import Footer from "../components/footer/Footer";
import Hero from "../components/hero/Hero";
import StatesSearch from "../components/search/StatesSearch";
import ProductsSearch from "../components/search/ProductsSearch";

const Agriculture = () => {
  const [searchAll, setSearch] = useState("");

  return (
    <div>
      <Nav />
      <Hero search = {searchAll} setS = {setSearch}/>
      <StatesSearch />
      <ProductsSearch />
      <Footer />
    </div>
  );
};

export default Agriculture;
