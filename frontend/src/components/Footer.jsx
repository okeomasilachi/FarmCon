import React from "react";
import "./Footer.css";

import { Link } from "react-router-dom";
// IMPORTING REACT FONTAWESOME
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// ADD REACT FONTAWESOME ICON
import {
  faTwitter,
  faFacebook,
  faInstagram,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <div className="container-fluid container__footer">
      <footer className="py-5">
        <div className="row">
          <div className="col-6 col-md-3 mb-3">
            <h5>Navigation</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../">
                  Home
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../#contact">
                  Contact
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../#about">
                  About
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../services">
                  Services
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../register">
                  Signup
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-6 col-md-3  mb-3">
            <h5>Hyperlinks</h5>
            <ul className="nav flex-column">
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../agriculture#products">
                  Products
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../agriculture">
                  Agriculture
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../agriculture#states">
                  States
                </Link>
              </li>
              <li className="nav-item mb-2">
                <Link className="nav-link p-0" to="../#contact">
                  Support
                </Link>
              </li>
            </ul>
          </div>

          <div className="col-12 col-md-6 mb-3 mx-auto">
            <div className="row">
              <div className="col-12 my-4">
                <a className="navbar-brand" href="./home">
                  {/* <img src="./assets/images/logo-1.png" className="brand" alt="FarmCon" /> */}
                  <h1>FarmCon</h1>
                </a>
              </div>
              <div className="col-12">
                <form>
                  <h5>Subscribe to our newsletter</h5>
                  <p>Monthly digest of what's new and exciting from us.</p>
                  <div className="d-flex flex-column flex-sm-row w-100 gap-2">
                    <label for="newsletter1" className="visually-hidden">
                      Email address
                    </label>
                    <input
                      id="newsletter1"
                      type="text"
                      className="form-control"
                      placeholder="Email address"
                    />
                    <button className="btn btn-success" type="button">
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
          <p>
            &copy; 2024 ALX Webstack Project FarmCon Company, Inc. All rights
            reserved.
          </p>
          <ul className="footer_icons">
            <li className="icon">
              <a href="./">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li className="icon">
              <a href="./">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="icon">
              <a href="./">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li className="icon">
              <a href="./">
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
