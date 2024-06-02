import React from "react";
import { NavLink } from "react-router-dom";
import { sidebarRoutes } from "./Sidebarroutes";
import './Sidebar.css'

const Sidebar = () => {
  return (
    <section className="container_sidebar">
      <nav
        id="sidebarMenu"
        className="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div className="position-sticky sidebar-sticky">
          <div className="sidebar-brand">
            <h2 className="brand">FarmCon</h2>
          </div>
          <ul className="nav flex-column">
            {sidebarRoutes.map((item) => {
              return (
                <li className="nav-item" key={item.id}>
                  <NavLink
                    className={item.current?"nav-link active":"nav-link"}
                    aria-current="page"
                    to={item.to}    
                  >
                    {item.icon} {item.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="profile-dp">
            <img src="../images/avatar.png" alt="profile" />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
