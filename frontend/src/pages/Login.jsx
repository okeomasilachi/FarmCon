/* eslint-disable no-unused-vars */
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
// import AlertError from "../alert/AlertError";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { userInfo } from "../atoms/User";
import { useRecoilState, useRecoilValue } from "recoil";

const Schema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required"),
});





const Login = () => {
  let [user, setUser] = useRecoilState(userInfo);
  let redir = useNavigate();

  const notify = (val) =>
    toast.success(val, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  const Errnotify = (val) =>
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
  const dismissAll = () => toast.dismiss();

  return (
    <div className="container_fluid container__signin">
      <div className="h-100 row justify-content-center align-items-center flex-column signin__section">
        <div className="col-12 col-10 col-md-4 col-lg-4 col-xl-4 mb-3 text-center">
          {/* <img src="./assets/images/logo.png" className="logo text-center" alt="" /> */}
          <h1>FarmCon</h1>
        </div>
        <div className="col-11 col-md-6 ">
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={Schema}
            onSubmit={async (values) => {
              // same shape as initial values
              // setIsShow(true);
              // console.log(values);
              /****
               * Steps to login a user
               * use the typed email to verify if the user exist in db
               * if the user exist, use the typed password to match the password from db
               * login else don't Invalid login details
               */
              let baseURL = "http://localhost:8000/Users";
              try {
                let getUser = await axios.get(`${baseURL}/${values.email}`);

                if (getUser.data.password === values.password) {
                  notify("account logged in successfully");
                  setUser({ isLoggedIn: true, data: getUser.data });
                  setTimeout(()=> {
                    redir("../dashboard");
                  }, 2000)
                } else {
                  Errnotify("Invalid login details");
                }
              } catch (error) {
                console.log(error);
                if (error.response.status === 404) {
                  Errnotify("User does not exist");
                }
              }

              // Notification
              // notify("account logged in successfully");
              // setTimeout(() => {
              // 	dismissAll();
              // }, 3000)
            }}
          >
            {({ errors, touched }) => (
              <Form className="p-3">
                <fieldset>
                  <label htmlFor="email" className="mt-3 mb-2">
                    Email:{" "}
                  </label>
                  <Field name="email" id="email" className="form-control" />
                  {touched.email && errors.email && (
                    <div className="errors">{errors.email}</div>
                  )}
                </fieldset>
                <fieldset>
                  <label htmlFor="password" className="mt-3 mb-2">
                    Password:{" "}
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="form-control"
                  />
                  {touched.password && errors.password && (
                    <div className="errors">{errors.password}</div>
                  )}
                </fieldset>

                <fieldset className="text-center mt-4">
                  <button type="submit" className="btn w-50 btn-lg me-auto">
                    Submit
                  </button>
                </fieldset>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-12 col-10 col-md-4 col-lg-4 mt-3">
          <p>
            Don't have an account? click here to{" "}
            <Link to="../register" className="text-white">
              Signup
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
