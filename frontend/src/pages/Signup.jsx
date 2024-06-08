/* eslint-disable no-useless-escape */
import React from "react";
import "./Signup.css";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";

import { ToastContainer, toast, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "axios";
// import { userInfo } from '../atoms/User';
// import { useRecoilState } from 'recoil';

const Schema = Yup.object().shape({
  userName: Yup.string()
    .required("Required")
    .min(2, "Too short!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string()
    .min(6, "Must Contain 8 Characters")
    .max(50, "Too Long!")
    .required("Required")
    .matches(/^(?=.*[a-z])/, "Must Contain One Lowercase Character")
    .matches(/^(?=.*[A-Z])/, "Must Contain One Uppercase Character")
    .matches(/^(?=.*[0-9])/, "Must Contain One Number Character")
    .matches(
      /^(?=.*[!@#\$%\^&\*])/,
      "Must Contain  One Special Case Character"
    ),
  confirmPassword: Yup.string()
    .min(6, "Too Short!")
    .max(50, "Too Long!")
    .required("Required")
    .oneOf([Yup.ref("password"), null], "Passwords must match"),
  terms: Yup.string()
    .matches(/true/, "Accept by clicking the checkbox to continue..")
    .required("Accept by clicking the checkbox to continue"),
});

const Signup = () => {
//   let [user, setUser] = useRecoilState(userInfo);
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
    <div className="container_fluid container__signup">
      <div className="h-100 row justify-content-center align-items-center flex-column signup__section">
        <div className="col-12 col-10 col-md-4 col-lg-4 mb-4 text-center">
          {/* <img src="" className="logo text-center" alt="" /> */}
          <h1>FarmCon</h1>
        </div>
        <div className="col-11 col-md-6 col-lg-6 col-xl-4">
          <Formik
            initialValues={{
              userName: "",
              email: "",
              password: "",
              confirmPassword: "",
              terms: "",
            }}
            validationSchema={Schema}
            onSubmit={async (values) => {
              // same shape as initial values
              /**
               * Steps to create a new user
               * get data
               * sed to db in object format
               */

              let userdata = {
				firstName: "",
				lastName: "",
                id: values.email,
                userName: values.userName,
                password: values.password,
                confirmPassword: values.confirmPassword,
                terms: values.terms,
                role: "user",
              };
              console.log(userdata);

              let baseURL = "http://localhost:8000/Users";
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
                  Axios.post(`${baseURL}`, userdata)
                    .then((response) => {
                    //   setUser({isLoggedIn: true, data: response.data});
                      notify("Signed up successfully");
                        redir("../login");
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
                <fieldset>
                  <label htmlFor="confrimPassword" className="mt-3 mb-2">
                    Confirm Password:{" "}
                  </label>
                  <Field
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    className="form-control"
                  />
                  {touched.confirmPassword && errors.confirmPassword && (
                    <div className="errors">{errors.confirmPassword}</div>
                  )}
                </fieldset>
                <fieldset
                  role="group"
                  className="my-2"
                  aria-labelledby="checkbox-group"
                >
                  <label className="lh-4">
                    <Field type="checkbox" className="me-2" name="terms" />
                    <span className="my-2 lh-1">
                      By clicking you accept our
                      <Link className="text-warning mt-2" to="../terms">
                        {" "}
                        Terms and Conditions
                      </Link>
                    </span>
                  </label>
                  {touched.terms && errors.terms && (
                    <div className="errors">{errors.terms}</div>
                  )}
                </fieldset>
                <fieldset className="text-center mt-3">
                  <button
                    type="submit"
                    name="submit"
                    className="btn w-50 btn-lg me-auto"
                  >
                    Submit
                  </button>
                </fieldset>
              </Form>
            )}
          </Formik>
        </div>
        <div className="col-12 col-10 col-md-6 m2-4">
          <p className="text-center">
            Already have an account? click here to{" "}
            <Link to="../login" className="text-white">
              Signin
            </Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Signup;
