import React from "react";
import Editprofile from "./Editprofile";

const Profiledata = () => {
  return (
    <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
      <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 class="h2">My Profile</h1>
        <div class="btn-toolbar mb-2 mb-md-0">
          <div class="btn-group me-2">
            <button
              class="btn btn-warning"
              data-bs-toggle="modal"
              data-bs-target="#editModal"
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <section class="container container__profile">
        <div class="row">
          <div class="col-12 col-md-4 ">
            <div class="profile mx-auto">
              <img src="../assets/images/logo.png" alt="" />
            </div>
          </div>
          <div class="col-12 col-md-8">
            <div class="table-responsive">
              <table id="example" class="table table-striped-columns">
                <thead>
                  <tr>
                    <th scope="col" colspan="2" class="fs-4">
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
