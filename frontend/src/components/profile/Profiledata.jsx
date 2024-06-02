import React from "react";
import Editprofile from "./Editprofile";

const Profiledata = () => {
  return (
    <main className="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">My Profile</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <div className="btn-group me-2">
            <button
              className="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <section className="container container__profile">
        <div className="row">
          <div className="col-12 col-md-4 ">
            <div className="profile mx-auto">
              <img src="../images/avatar.png" alt="" />
            </div>
          </div>
          <div className="col-12 col-md-8">
            <div className="table-responsive">
              <table id="example" className="table table-striped-columns">
                <thead>
                  <tr>
                    <th scope="col" colSpan="2" className="fs-4">
                      Data
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">Name:</th>
                    <td>OGUNSANYA TAOFEEQ</td>
                  </tr>
                  <tr>
                    <th scope="row">Username:</th>
                    <td>taofeeq</td>
                  </tr>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>taofeeq@example.com</td>
                  </tr>
                  <tr>
                    <th scope="row">Contact:</th>
                    <td>+01 352 1125 0192</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Editprofile />
    </main>
  );
};

export default Profiledata;
