import React from "react";
import "./ProductsSearch.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const ProductsSearch = () => {
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
            />
          </div>
        </div>
        <div className="col-12 bottom_product">
          <div className="row products">
            <div className="col-6 col-md-3 product product-1">
              <h4>Cassava</h4>
              <p><b>Location:</b> OGUN</p>
              <span className="price_tag">#30,000 Per Ton</span>
            </div>
            <div className="col-6 col-md-3 product product-2">
              <h4>Banana</h4>
              <p><b>Location:</b> OGUN</p>
              <span className="price_tag">#30,000 Per Ton</span>
            </div>
            <div className="col-6 col-md-3 product product-3">
              <span>
                <h4>Vegetables</h4>
              </span>
              <p><b>Location:</b> KADUNA</p>
              <span className="price_tag">#70,000 Per Ton</span>
            </div>
            <div className="col-6 col-md-3 product product-4">
              <h4>Cocoa</h4>
              <p><b>Location:</b> OYO</p>
              <span className="price_tag">#25,000 Per Ton</span>
            </div>
            <div className="col-6 col-md-3 product product-5">
              <h4>Maize</h4>
              <p><b>Location:</b> OGUN</p>
              <span className="price_tag">#50,000 Per Ton</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductsSearch;
