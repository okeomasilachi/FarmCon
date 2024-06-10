import React, { useEffect, useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const Schema = Yup.object().shape({
  firstName: Yup.string(),
  lastName: Yup.string(),
  contact: Yup.string(),
});

const Edituser = ({ editData }) => {
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

  const [editfName, setEditfName] = useState("");
  const [editlName, setEditlName] = useState("");
  const [editContact, setEditContact] = useState("");

  useEffect(() => {
    // console.log(editData);
    setEditfName(editData.first_name);
    setEditlName(editData.last_name);
    setEditContact(editData.contact);
  }, [editData]);

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
              Edit User
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
                contact: "",
              }}
              validationSchema={Schema}
              onSubmit={async (values) => {
                // same shape as initial values
                /**
                 * Steps to create a new user
                 * get data
                 * sed to db in object format
                 */
                let baseURL = "http://localhost:8000/Users/";

                let userdata = {
                  id: editData.id,
                  first_name: editfName,
                  last_name: editlName,
                  userName: editData.userName,
                  contact: editContact,
                  password: editData.password,
                  gender: editData.gender,
                  role: editData.role,
                  image: editData.image,
                };

                try {
                  // use the typed location to check if the location already exist
                  Axios.put(baseURL + `${editData.id}`, userdata)
                    .then((response) => {
                      notify("Product editted successfully");
                      setTimeout(() => {
                        redir("../admin");
                      }, 1000);
                      setTimeout(() => {
                        redir("../user");
                      }, 1020);
                      // window.location.reload();
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
                    <label htmlFor="firstName" className="mb-2">
                      First Name:{" "}
                    </label>
                    <Field
                      value={editfName}
                      onChange={(e) => setEditfName(e.target.value)}
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
                    <label htmlFor="lastName" className="mt-3 mb-2">
                      Last Name:{" "}
                    </label>
                    <Field
                      onChange={(e) => setEditlName(e.target.value)}
                      value={editlName}
                      name="lastName"
                      id="lastName"
                      className="form-control"
                    />
                    {touched.lastName && errors.lastName && (
                      <div className="errors">{errors.lastName}</div>
                    )}
                  </fieldset>
                  <fieldset>
                    <label htmlFor="contact" className="mt-3 mb-2">
                      Contact:{" "}
                    </label>
                    <Field
                      onChange={(e) => setEditContact(e.target.value)}
                      value={editContact}
                      name="contact"
                      id="contact"
                      className="form-control"
                    />
                    {touched.contact && errors.contact && (
                      <div className="errors">{errors.contact}</div>
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

export default Edituser;
