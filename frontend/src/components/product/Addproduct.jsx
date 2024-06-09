import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const Schema = Yup.object().shape({
  prodName: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
  quantity: Yup.string().required("Required"),
  price: Yup.string().required("Required"),
  image: Yup.string().required("Required"),
});

const Addproduct = () => {
  let redir = useNavigate();





  // Dynamic notification
  const notify = (val) =>
    toast.success(val, {
      position: "top-right",
      autoClose: 3000,
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
      autoClose: 3000,
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

  return (
    <div
      className="modal fade"
      id="addModal"
      tabIndex="-1"
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="addModalLabel">
              Add Product
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
                  let baseURL = "http://localhost:8000/Products";
                  let allUser = await Axios.get(`${baseURL}`);
                  let dataLength = allUser.data.length;

                // console.log(allUser.data[dataLength - 1].id); 
                let id = allUser.data[dataLength - 1].id; 
                    ++id;

                  let userdata = {
                    id: `${id}`,
                    name: values.prodName,
                    quantity: values.quantity,
                    price: values.price,
                    location: values.location,
                    image: values.image,
                  };
                  console.log(userdata);

                  try {
                   // use the typed location to check if the location already exist
                      Axios.post(`${baseURL}`, userdata)
                        .then((response) => {
                          notify("Product created successfully");
                          redir("../user");
                          setTimeout(() => {
                            redir("../products");
                            // window.location.reload();
                            }, 50)
                        })
                        .catch((error) => {
                          errorNotify("Something went wrong!")
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
                      <Field name="location" id="location" className="form-control" />
                      {touched.location && errors.location && (
                        <div className="errors">{errors.location}</div>
                      )}
                    </fieldset>
                    <fieldset>
                      <label htmlFor="quantity" className="mt-3 mb-2">
                        Quantity:{" "}
                      </label>
                      <Field
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
                        Submit
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

export default Addproduct;
