import React, {useState, useEffect} from "react";
import Editprofile from "./Editprofile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit } from "@fortawesome/free-solid-svg-icons";

import Axios from "axios";
import { userInfo } from "../../atoms/User.jsx";
import { useRecoilValue } from "recoil";

const Profiledata = () => {
  let user = useRecoilValue(userInfo);
  

  const [editData, setEditData] = useState("");

  let baseURL = "http://localhost:8000/Users";

  useEffect(() => {
    Axios.get(baseURL + `/${user.data.id}`)
      .then((response) => {
        setEditData(response.data);
      })
      .catch((error) => console.error(error));
  }, [baseURL, user]);


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
              <FontAwesomeIcon icon={faUserEdit} className="me-2" />
              Edit Profile 
            </button>
          </div>
        </div>
      </div>
      <section className="container container__profile">
        <div className="row">
          <div className="col-12 col-md-4 ">
            <div className="profile mx-auto">
              {/* <img src="../images/avatar.png" alt="" /> */}
              <img src={user.data.image} alt="" />
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
                    <td>{user.data.first_name} {user.data.last_name}</td>
                  </tr>
                  <tr>
                    <th scope="row">Username:</th>
                    <td>{user.data.userName}</td>
                  </tr>
                  <tr>
                    <th scope="row">Email:</th>
                    <td>{user.data.id}</td>
                  </tr>
                  <tr>
                    <th scope="row">Contact:</th>
                    <td>{user.data.contact}</td>
                  </tr>
                  <tr>
                    <th scope="row">Role:</th>
                    <td>{user.data.role}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
      <Editprofile editData={editData}/>
    </main>
  );
};

export default Profiledata;
