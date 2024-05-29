import React from "react";
import "./Main.css";
import Editadmin from "./Editadmin";

const Maintable = () => {
  return (
    <main className="col-md-9 ms-sm-auto bg-light col-lg-10 px-md-4">
      <div className="d-flex justify-content-even align-items-center flex-wrap flex-md-nowrap gap-5 align-items-center pt-3 pb-2 mb-3 border-bottom">
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
      </div>
      <section className="container container__table">
        <div className="table-responsive">
          <table id="example" className="table custom-table">
            <thead>
              <tr>
                {/* <th scope="col">
										<label className="control control--checkbox">
											<input type="checkbox" className="js-check-all"/>
											<div className="control__indicator"></div>
										</label>
									</th>  */}
                <th scope="col">S/N</th>
                <th scope="col">Name</th>
                <th scope="col">Wards</th>
                <th scope="col">Contact</th>
                <th scope="col" colspan="2" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1392</th>
                <td>Sales Pitch - 2019</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+63 983 0962 971</td>

                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <th>4616</th>
                <td>Social Media Planner</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+02 020 3994 929</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <th>9841</th>
                <td>Website Agreement</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+01 352 1125 0192</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <th>1392</th>
                <td>Sales Pitch - 2019</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+63 983 0962 971</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <th>4616</th>
                <td>Social Media Planner</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+02 020 3994 929</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <th>9841</th>
                <td>Website Agreement</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+01 352 1125 0192</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <th>4616</th>
                <td>Social Media Planner</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+02 020 3994 929</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
              <tr>
                <th>9841</th>
                <td>Website Agreement</td>
                <td>
                  Far far away, behind the word mountains
                  <small className="d-block">
                    Far far away, behind the word mountains
                  </small>
                </td>
                <td>+01 352 1125 0192</td>
                <td>
                  <button
                    className="btn btn-warning"
                    data-bs-toggle="modal"
                    data-bs-target="#editModal"
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button className="btn btn-danger">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
	  <Editadmin />
    </main>
  );
};

export default Maintable;
