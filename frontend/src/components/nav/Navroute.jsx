import { createBrowserRouter } from "react-router-dom";
import App from "../../App";
import Login from "../../pages/Login";
import Signup from "../../pages/Signup";
import Agriculture from "../../pages/Agriculture";
import Dashboard from "../../pages/Dashboard";
import Admin from "../../pages/Admin";
import User from "../../pages/User";
import Product from "../../pages/Product";
import Profile from "../../pages/Profile";
import Error from "../../pages/Error";

let id = 0;

export const router = createBrowserRouter([
  {
    id: id++,
    path: "/",
    element: <App />,
  },
  {
	id:id++,
    path: "/login",
    element: <Login />,
  },
  {
	id:id++,
    path: "/register",
    element: <Signup />,
  },
  {
	id:id++,
    path: "/agriculture",
    element: <Agriculture />,
  },
  {
	id:id++,
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
	id:id++,
    path: "/admin",
    element: <Admin />,
  },
  {
	id:id++,
    path: "/user",
    element: <User />,
  },
  {
	id:id++,
    path: "/products",
    element: <Product />,
  },
  {
	id:id++,
    path: "/profile",
    element: <Profile />,
  },
  {
	id:id++,
    path: "*",
    element: <Error />,
  },
]);
