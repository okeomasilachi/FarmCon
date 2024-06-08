/* eslint-disable no-unused-vars */
import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Nav.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { navList } from "./Navlist";
import { userInfo } from "../../atoms/User.jsx";
import { useRecoilValue } from "recoil";



const Nav = () => {
  // let user = useRecoilValue(userInfo);
  return (
    <nav className="navbar navbar-expand-lg fixed-top p-3">
      <div className="container">
        <Link className="navbar-brand" to="../">
          {/* <img src="./assets/images/logo-1.png" className="brand" alt="Sevenskies" /> */}
          <h1>FarmCon</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarText"
          aria-controls="navbarText"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarText"
        >
          <ul className="navbar-nav mb-2 mb-lg-0 mx-5">
            {navList.map((item) => {
              if (item.id === 2 || item.id === 3 || item.id === 4) {
                return (
                  <li className="nav-item" key={item.id}>
                    <a className="nav-link" href={item.to}>
                      {item.navName}
                    </a>
                  </li>
                );
              }
			  else{
				  return (
					<li 
          className={!item.icon ? "nav-item" : ""} key={item.id}>
					  <NavLink className={!item.icon? "nav-link": "btn-sm-alt" } to={item.to}>
						{item.navName}&nbsp;{ item.icon &&  <FontAwesomeIcon icon={faRightToBracket} />}
					  </NavLink>
					</li>
				  );
			  }

            })}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
