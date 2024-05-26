import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import Login from './pages/Login'
import Signup from './pages/Signup'
import Agriculture from './pages/Agriculture';
import Dashboard from './pages/Dashboard';


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
  ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

