import React from 'react';
import ReactDOM from 'react-dom/client';

import { RouterProvider, } from "react-router-dom";
import { router } from './components/nav/Navroute';

  

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router} />
);

