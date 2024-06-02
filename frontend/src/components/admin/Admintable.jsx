/* eslint-disable no-unused-vars */
import React, {useState} from "react";
import "./Admintable.css";
import Editadmin from "./Editadmin";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisV, faPlus } from "@fortawesome/free-solid-svg-icons";
import Addadmin from "./Addadmin";

import { AdminData } from "./AdminData";
import Paginations from "../pagination/Paginations" 

const Admintable = () => {

// pagination feature 
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage, setPostPerPage] = useState(10);

const lastPostIndex = currentPage * postsPerPage; 
const firstPostIndex = lastPostIndex - postsPerPage
const currentPost = AdminData.slice(firstPostIndex, lastPostIndex)




  return (
    <main className="col-md-9 ms-sm-auto bg-light col-lg-10 px-md-4">
      <div className="d-flex justify-content-between align-items-center flex-wrap flex-md-nowrap gap-5 align-items-center pt-3 pb-2 mb-3 border-bottom">
        <span className="d-flex gap-5 gap-lg-0 align-items-center">
          <div className=" mb-2 mb-md-0">
            <button
              className="navbar-toggler position-absolute d-md-none collapsed"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#sidebarMenu"
              aria-controls="sidebarMenu"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>
          <h1 className="h2">Admin</h1>
        </span>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#addModal"
            >
              Add <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </div>
      </div>
      <section className="container container__table">
        <div className="table-responsive">
          <table id="example" className="table custom-table">
            <thead>
              <tr>
                <th scope="col">S/N</th>
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Role</th>
                <th scope="col" tabIndex="2" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>

              {
                currentPost.map (item => {
                  return (
                        <tr key={item.id}>
                          <th>{item.id}</th>
                          <td>{item.first_name} {item.last_name}</td>
                          <td>{item.email}</td>
                          <td>{item.contact}</td>
                          <td>
                            <div className="action">
                              <span>
                                <FontAwesomeIcon icon={faEllipsisV} />
                              </span>
                              <ul className="more-options">
                                <li>
                                  <button
                                    id=""
                                    className="btn btn-warning user-edit-btn p-1"
                                    data-bs-toggle="modal"
                                    data-bs-target="#editModal"
                                  >
                                    edit
                                  </button>
                                </li>
                                <li>
                                  <a href="./" className="btn btn-primary p-1">
                                    view
                                  </a>
                                </li>
                                <li>
                                  <a
                                    href=" "
                                    className="btn btn-danger p-1"
                                  >
                                    delete
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </td>
                        </tr>

                  );
                })
              }
            </tbody>
          </table>
        </div>
      </section>
      <div className="row">
              {
                AdminData.length > 10 ?   <Paginations  
                totalPosts = {AdminData.length} 
                postsPerPage = {postsPerPage}
                setCurrentPage= {setCurrentPage}
                currentPage={currentPage}
                /> : ""
              }
          </div>
      <Addadmin />
      <Editadmin />
    </main>
  );
};

export default Admintable;
