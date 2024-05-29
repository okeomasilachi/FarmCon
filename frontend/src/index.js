import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Agriculture from './pages/Agriculture';
import Dashboard from './pages/Dashboard';
import Admin from './pages/Admin';
import User from './pages/User';
import Product from './pages/Product';
import Profile from './pages/Profile';


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Signup />,
    },
    {
      path: "/agriculture",
      element: <Agriculture />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
    {
      path: "/admin",
      element: <Admin />,
    },
    {
      path: "/user",
      element: <User />,
    },
    {
      path: "/products",
      element: <Product />,
    },
    {
      path: "/profile",
      element: <Profile />,
    },
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

