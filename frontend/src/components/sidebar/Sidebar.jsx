/* eslint-disable no-unused-vars */
import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { sidebarRoutes } from "./Sidebarroutes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { userInfo } from "../../atoms/User.jsx";
import { useRecoilValue, useRecoilState } from "recoil";

import "./Sidebar.css";



const Sidebar = () => {
  let user = useRecoilValue(userInfo);
  let [signout, setSignout] =  useRecoilState(userInfo);
  let redir = useNavigate()

  const handleLogout = () => {
    setSignout({isLoggedIn:false, data: {}})
    redir("../")
  }
  // console.log(user);
  return (
    <section className="container_sidebar">
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky sidebar-sticky">
          <div className="sidebar-brand">
            <NavLink to="../">
            <h2 className="brand">FarmCon</h2>
            </NavLink>
          </div>
          <ul className="nav flex-column">
            {  sidebarRoutes.map((item, key) => {
              return (
                <li
                style={key !== 0 && key !== 4 ? user.data.role === "admin"? {display : "block"}:{display:"none"}:{display : "block"}}
                className="nav-item" key={key}>
                  <NavLink
                    className={item.current ? "nav-link active" : "nav-link"}
                    aria-current="page"
                    to={item.to}
                  >
                    {item.icon} {item.title}
                  </NavLink>
                </li>
              );

            })}

            <li className="nav-item my-2 ms-3" >
              <NavLink className="nav-lin" aria-current="page" to="#" 
              onClick={() => handleLogout()}
              >
                <FontAwesomeIcon className='me-2' icon={faCircleArrowLeft} /> Logout
              </NavLink>
            </li>
          </ul>
          <div className="profile-dp">
            {/* <img src="../images/avatar.png" alt="profile" /> */}
            <img src={user.data.image} alt="profile" />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
