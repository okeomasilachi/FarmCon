/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import Axios from "axios";
import Editproduct from "./Editproduct";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faEllipsisV } from "@fortawesome/free-solid-svg-icons";
import Addproduct from "./Addproduct";
import Paginations from "../pagination/Paginations";

import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userInfo } from "../../atoms/User";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Producttable = () => {
  let user = useRecoilValue(userInfo);
  let redir = useNavigate();





  const [prods, setProduct] = useState();
  const [editData, setEditData] = useState("");
  // pagination feature
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostPerPage] = useState(10);
  
  // const [del, setDelete ] = useState (prods);

  useEffect(() => {
    setProduct(prods);
  }, [prods]);

  //  const dismissAll = () =>  toast.dismiss();

  // Dynamic notification
  const notify = (val) =>
    toast.success(val, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });

  let baseURL = "http://localhost:8000/Products/";

  const handleEdit = (values) => {
    Axios.get(baseURL + `${values}`).then((response) => {
     setEditData(response.data);
    });
  };
  const handleDelete = (values) => {
    Axios.delete(baseURL + `${values}`).then(() => {
      notify("Product deleted successfully");
      setTimeout(() => {
        redir("../user");
        }, 1000);
        setTimeout(() => {
          redir("../products");
        }, 1020);
    });
  };

  useEffect(() => {
    Axios.get("http://localhost:8000/Products")
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  let lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  const currentPost = prods && prods.slice(firstPostIndex, lastPostIndex);

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
          <h1 className="h2">Products</h1>
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
                <th scope="col">Product Name</th>
                <th scope="col">Location/State</th>
                <th scope="col">Quantity (Ton)</th>
                <th scope="col">Price (#)</th>
                <th scope="col" tabIndex="2" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPost &&
                currentPost.map((item, key) => {
                  return (
                    <tr className="px-2" key={key}>
                      <th>{++lastPostIndex - 10}</th>
                      <td>{item.name}</td>
                      <td>{item.location}</td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td>
                        <div className="action">
                          <span className="text-center w-100">
                            <FontAwesomeIcon icon={faEllipsisV} />
                          </span>
                          <ul className="more-options">
                            <li>
                              <button
                                onClick={() => handleEdit(item.id)}
                                id=""
                                className="btn btn-warning p-1"
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
                              <button
                                onClick={() => handleDelete(item.id)}
                                className="btn btn-danger p-1"
                              >
                                delete
                              </button>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </section>
      <div className="row">
        {prods && prods.length > 10 ? (
          <Paginations
            totalPosts={prods && prods.length}
            postsPerPage={postsPerPage}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
          />
        ) : (
          ""
        )}
        <ToastContainer />
      </div>
      <Addproduct />
      <Editproduct editData={editData}/>
    </main>
  );
};

export default Producttable;
