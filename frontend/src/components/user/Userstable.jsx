import React from "react";
import Edituser from "./Edituser";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Adduser from "./Adduser";

const Userstable = () => {
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
          <h1 className="h2">Users</h1>
        </span>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              className="btn btn-primary"
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
                <th scope="col">Status</th>
                <th scope="col">Gender</th>
                <th scope="col">Location/State</th>
                <th scope="col" tabIndex="2" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1392</th>
                <td>Joseph Sam</td>
                <td>
                  Male
                </td>
                <td>Kano</td>
                <td>+234 913 0962 990</td>
                <td>
                  <div className="action">
                    <span><FontAwesomeIcon icon={faEllipsisV} /></span>
                    <ul className="more-options">
                      <li>
                        <button
                          id=""
                          className="btn btn-warning user-edit-btn p-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >edit</button>
                      </li>
                      <li>
                        <a href="./" className="btn btn-primary p-1">view</a>
                      </li>
                      <li>
                        <a href=" " className="btn btn-danger p-1">delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <th>1393</th>
                <td>Adamu Sunday</td>
                <td>
                  Male
                </td>
                <td>Osun</td>
                <td>+234 903 0922 970</td>
                <td>
                  <div className="action">
                    <span><FontAwesomeIcon icon={faEllipsisV} /></span>
                    <ul className="more-options">
                      <li>
                        <button
                          id=""
                          className="btn btn-warning user-edit-btn p-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >edit</button>
                      </li>
                      <li>
                        <a href="./" className="btn btn-primary p-1">view</a>
                      </li>
                      <li>
                        <a href=" " className="btn btn-danger p-1">delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
              <tr>
                <th>1394</th>
                <td>Elizabeth Clone</td>
                <td>
                  Female
                </td>
                <td>Ebonyi</td>
                <td>+234 803 0962 871</td>
                <td>
                  <div className="action">
                    <span><FontAwesomeIcon icon={faEllipsisV} /></span>
                    <ul className="more-options">
                      <li>
                        <button
                          id=""
                          className="btn btn-warning user-edit-btn p-1"
                          data-bs-toggle="modal"
                          data-bs-target="#editModal"
                        >edit</button>
                      </li>
                      <li>
                        <a href="./" className="btn btn-primary p-1">view</a>
                      </li>
                      <li>
                        <a href=" " className="btn btn-danger p-1">delete</a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
      <Adduser />
      <Edituser />
    </main>
  );
};

export default Userstable;
