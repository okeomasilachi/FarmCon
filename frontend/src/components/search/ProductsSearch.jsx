/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./ProductsSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

import Paginations from "../pagination/Paginations"
import Axios from "axios";


const ProductsSearch = () => {
  const [searchProduct, setSearchProduct] = useState("");
// pagination feature 
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(8);
const [products, setProducts] = useState("");


  useEffect(() => {
    Axios.get("http://localhost:8000/Products")
      .then((response) => {
        console.log(response.data);
        setProducts(response.data);
      })
      .catch((error) => console.error(error));
  }, []);


  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage
  const currentPost = products && products.slice(firstPostIndex, lastPostIndex)
  

  return (
    <section className="container container__products" id="products">
      <div className="row">
        <div className="col-12 top_product">
          <h3 className="title">Major agricultural products in Nigeria</h3>
          <div className="product_search">
            <FontAwesomeIcon icon={faSearch} />
            <input
              type="text"
              className="product_input"
              placeholder="Search for products..."
              onChange={(e) => setSearchProduct(e.target.value)}
            />
          </div>
        </div>
        <div className="col-12 bottom_product">
          <div className="row products">
            {
              currentPost &&
              currentPost.filter((item) => {
                
               
                return searchProduct.toLowerCase() === "" ? item : item.name.toLowerCase().includes(searchProduct.toLowerCase());
              }).map((item, key)=> {
                return (
                  <div className={"col-6 col-md-3 product "+item.image} key={key}>
                    <h4>{item.name}</h4>
                    <p><b>Location:</b> {item.name.toUpperCase()}</p>
                    <span className="price_tag">{item.price} Per Ton</span>
                    <p><b>Quantity:</b> {item.quantity}</p>
                  </div>
                );
              })
            }
          </div>
          <div className="row">
           {/* <h1>We are Here</h1> */}
           <Paginations  
            totalPosts = {products && products.length} 
            postsPerPage = {postsPerPage}
            setCurrentPage= {setCurrentPage}
            currentPage={currentPage}
            
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSearch;
