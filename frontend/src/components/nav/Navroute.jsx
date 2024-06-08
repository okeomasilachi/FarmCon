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
import { RecoilRoot } from "recoil";

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
    element: <RecoilRoot><Login /></RecoilRoot>,
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
    element:  <RecoilRoot><Dashboard /></RecoilRoot>,
  },
  {
	id:id++,
    path: "/admin",
    element: <RecoilRoot><Admin /></RecoilRoot>,
  },
  {
	id:id++,
    path: "/user",
    element: <RecoilRoot><User /></RecoilRoot>,
  },
  {
	id:id++,
    path: "/products",
    element: <RecoilRoot><Product /></RecoilRoot>,
  },
  {
	id:id++,
    path: "/profile",
    element: <RecoilRoot><Profile /></RecoilRoot>,
  },
  {
	id:id++,
    path: "*",
    element: <Error />,
  },
]);
