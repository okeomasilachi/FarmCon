import React from "react";
import { Link } from "react-router-dom";
import { sidebarRoutes } from "./Sidebarroutes";


const Sidebar = () => {
  return (
    <section className="container_sidebar">
      <nav
        id="sidebarMenu"
        class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
      >
        <div class="position-sticky sidebar-sticky">
          <div className="sidebar-brand">
            <h2 className="brand">FarmCon</h2>
          </div>
          <ul class="nav flex-column">
            {sidebarRoutes.map((item) => {
              return (
                <li class="nav-item">
                  <Link
                    class={item.id===1?"nav-link active":"nav-link"}
                    aria-current="page"
                    to={item.to}
                  >
                    {item.icon} {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
          <div class="profile-dp">
            <img src="../assets/images/logo.png" alt="profile" />
          </div>
        </div>
      </nav>
    </section>
  );
};

export default Sidebar;
