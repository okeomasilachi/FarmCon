import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, } from "react-router-dom";
import { router } from './components/nav/Navroute';

  // const router = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <App />,
  //   },
  //   {
  //     path: "/login",
  //     element: <Login />,
  //   },
  //   {
  //     path: "/register",
  //     element: <Signup />,
  //   },
  //   {
  //     path: "/agriculture",
  //     element: <Agriculture />,
  //   },
  //   {
  //     path: "/dashboard",
  //     element: <Dashboard />,
  //   },
  //   {
  //     path: "/admin",
  //     element: <Admin />,
  //   },
  //   {
  //     path: "/user",
  //     element: <User />,
  //   },
  //   {
  //     path: "/products",
  //     element: <Product />,
  //   },
  //   {
  //     path: "/profile",
  //     element: <Profile />,
  //   },
  // ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

