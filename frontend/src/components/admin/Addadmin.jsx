/* eslint-disable no-useless-escape */
import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";

const Schema = Yup.object().shape({
  firstName: Yup.string().required("Required"),
  lastName: Yup.string().required("Required"),
  userName: Yup.string().required("Required"),
  contact: Yup.string().required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
});

const Addadmin = () => {
  //   let [user, setUser] = useRecoilState(userInfo);
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
              Add User
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
                firstName: "",
                lastName: "",
                userName: "",
                email: "",
                contact: "",
              }}
              validationSchema={Schema}
              onSubmit={async (values) => {
                // same shape as initial values
                /**
                 * Steps to create a new user
                 * get data
                 * seNd to db in object format
                 */

                let userData = {
                  first_name: values.firstName,
                  last_name: values.lastName,
                  userName: values.userName,
                  id: values.email,
                  contact: values.contact,
                  password: values.firstName,
                  role: "admin",
                  image: "../images/avatar.png",
                };
                console.log(userData);

                  let baseURL = "http://localhost:8000/Admin";
                  try {
                    let allUser = await Axios.get(`${baseURL}`);

                    let isUnique = false;
                    allUser.data.forEach((each) => {
                      if (each.id === values.email) {
                        isUnique = true;
                      }
                    });

                    // use the typed email to check if the email already exist
                    if (!isUnique) {
                      Axios.post(`${baseURL}`, userData)
                        .then((response) => {
                          //   setUser({isLoggedIn: true, data: response.data});
                          notify("User created successfully");
						  redir("../user");
                          setTimeout(() => {
                            redir("../admin");
                          }, 1500);
                        })
                        .catch((error) => {
                          console.error(error);
                        });
                    } else {
                      errorNotify("User already exit");
                    }
                    // if unique email allow to signup else dont
                  } catch (error) {
                    console.error(error);
                  }
              }}
            >
              {({ errors, touched }) => (
                <Form className="p-3">
                  <fieldset>
                    <label htmlFor="userName" className="mb-2">
                      First Name:{" "}
                    </label>
                    <Field
                      name="firstName"
                      id="firstName"
                      className="form-control"
                    />
                    {/* If this field has been touched, and it contains an error, display it
                     */}
                    {touched.firstName && errors.firstName && (
                      <div className="errors">{errors.firstName}</div>
                    )}
                  </fieldset>
                  <fieldset>
                    <label htmlFor="userName" className="mt-3 mb-2">
                      Last Name:{" "}
                    </label>
                    <Field
                      name="lastName"
                      id="lastName"
                      className="form-control"
                    />
                    {/* If this field has been touched, and it contains an error, display it
                     */}
                    {touched.lastName && errors.lastName && (
                      <div className="errors">{errors.lastName}</div>
                    )}
                  </fieldset>
                  <fieldset>
                    <label htmlFor="userName" className="mt-3 mb-2">
                      User Name:{" "}
                    </label>
                    <Field
                      name="userName"
                      id="userName"
                      className="form-control"
                    />
                    {/* If this field has been touched, and it contains an error, display it
                     */}
                    {touched.userName && errors.userName && (
                      <div className="errors">{errors.userName}</div>
                    )}
                  </fieldset>
                  <fieldset>
                    <label htmlFor="contact" className="mt-3 mb-2">
                      Contact:{" "}
                    </label>
                    <Field
                      name="contact"
                      id="contact"
                      className="form-control"
                    />
                    {touched.contact && errors.contact && (
                      <div className="errors">{errors.contact}</div>
                    )}
                  </fieldset>
                  <fieldset>
                    <label htmlFor="email" className="mt-3 mb-2">
                      Email:{" "}
                    </label>
                    <Field name="email" id="email" className="form-control" />
                    {touched.email && errors.email && (
                      <div className="errors">{errors.email}</div>
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

export default Addadmin;
