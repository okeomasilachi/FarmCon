import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import { useNavigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Schema = Yup.object().shape({
  prodName: Yup.string(),
  location: Yup.string(),
  quantity: Yup.string(),
  price: Yup.string(),
  image: Yup.string(),
});

const Editproduct = ({ editData }) => {

 let redir = useNavigate();

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
  // Dynamic notification
  const errorNotify = (val) =>
    toast.error(val, {
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

  // To remove toast programmatically
  // const dismissAll = () =>  toast.dismiss();


  const [editName, setEditName] = useState("");
  const [editLocation, setEditLocation] = useState("");
  const [editQuantity, setEditQuantity] = useState("");
  const [editPrice, setEditPrice] = useState("");
  const [editImage, setEditImage] = useState("");

  
  useEffect(()=> {
    // console.log(editData);
    setEditName(editData.name);
    setEditLocation(editData.location);
    setEditQuantity(editData.quantity);
    setEditPrice(editData.price);
    setEditImage(editData.image);
  }, [editData])


  return (
    <div
      className="modal fade"
      id="editModal"
      tabIndex="-1"
      aria-labelledby="editModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="editModalLabel">
              Edit Product
            </h1>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
            <div className="modal-body">
              <Formik
                initialValues={{
                  prodName: "",
                  location: "",
                  quantity: "",
                  price: "",
                  image: ""
                }}
                validationSchema={Schema}
                onSubmit={async (values) => {
                  // same shape as initial values
                  /**
                   * Steps to create a new user
                   * get data
                   * sed to db in object format
                   */
                  let baseURL = "http://localhost:8000/Products/";
                
                  let userdata = {
                    id: editData.id,
                    name: editName,
                    quantity: editQuantity,
                    price: editPrice,
                    location: editLocation,
                    image: editImage,
                  };
                    
                  try {
                    // use the typed location to check if the location already exist
                    Axios.put(baseURL + `${editData.id}`, userdata)
                    .then((response) => {
                      notify("Product editted successfully");
                      redir("../user");
                          setTimeout(() => {
                            redir("../products");
                            // window.location.reload();
                            }, 100)
                     })
                      .catch((error) => {
                        errorNotify("Something went wrong!");
                        console.error(error);
                      });

                    // if unique location allow to signup else dont
                  } catch (error) {
                    console.error(error);
                  }


                }}
              >
                {({ errors, touched }) => (
                  <Form className="p-3">
                    <fieldset>
                      <label htmlFor="prodName" className="mb-2">
                        Product Name:{" "}
                      </label>
                      <Field
                        value={editName}
                        onChange={(e)=>setEditName(e.target.value)}
                        name="prodName"
                        id="prodName"
                        className="form-control"
                      />
                      {/* If this field has been touched, and it contains an error, display it
                       */}
                      {touched.prodName && errors.prodName && (
                        <div className="errors">{errors.prodName}</div>
                      )}
                    </fieldset>
                    <fieldset>
                      <label htmlFor="location" className="mt-3 mb-2">
                        Location/State:{" "}
                      </label>
                      <Field
                      onChange={(e)=>setEditLocation(e.target.value) }
                        value={editLocation}
                        name="location"
                        id="location"
                        className="form-control"
                      />
                      {touched.location && errors.location && (
                        <div className="errors">{errors.location}</div>
                      )}
                    </fieldset>
                    <fieldset>
                      <label htmlFor="quantity" className="mt-3 mb-2">
                        Quantity:{" "}
                      </label>
                      <Field
                      onChange={(e)=>setEditQuantity(e.target.value) }
                        value={editQuantity}
                        name="quantity"
                        id="quantity"
                        className="form-control"
                      />
                      {touched.quantity && errors.quantity && (
                        <div className="errors">{errors.quantity}</div>
                      )}
                    </fieldset>
                    <fieldset>
                      <label htmlFor="confrimPassword" className="mt-3 mb-2">
                        Price:{" "}
                      </label>
                      <Field
                      onChange={(e)=>setEditPrice(e.target.value) }
                        value={editPrice}
                        name="price"
                        id="price"
                        className="form-control"
                      />
                      {touched.price && errors.price && (
                        <div className="errors">{errors.price}</div>
                      )}
                    </fieldset>
                    <fieldset>
                      <label htmlFor="confrimPassword" className="mt-3 mb-2">
                        Image:{" "}
                      </label>
                      <Field
                      onChange={(e)=>setEditImage(e.target.value) }
                        value={editImage}
                        name="image"
                        id="price"
                        className="form-control"
                      />
                      {touched.image && errors.image && (
                        <div className="errors">{errors.image}</div>
                      )}
                    </fieldset>

                    <fieldset className="text-center mt-3">
                      <button
                        type="submit"
                        name="submit"
                        data-bs-dismiss="modal"
                        className="btn w-50 btn-lg me-auto"
                      >
                        Save changes
                      </button>
                    </fieldset>
                  </Form>
                )}
              </Formik>
            </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Editproduct;
