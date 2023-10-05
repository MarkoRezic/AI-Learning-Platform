import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Error404 from './views/Error404';
import EduidLogin from './views/EduidLogin';
import { DataProvider } from './Context';
import AdminLogin from './views/admin/AdminLogin';
import UserList from './views/admin/UserList';
import UserDetails from './views/admin/UserDetails';
import NeumorphicElements from './views/NeumorphicElements';

const router = createBrowserRouter([
  {
    path: "/",
    element: <DataProvider><App /></DataProvider>,
    errorElement: <DataProvider><Error404 /></DataProvider>,
    children: [
      {
        path: "style",
        element: <NeumorphicElements />
      },
      {
        path: "login",
        element: <EduidLogin />
      },
      {
        path: "admin-login",
        element: <AdminLogin />
      },
      {
        path: "all-users",
        element: <UserList />
      },
      {
        path: "user/:user_id",
        element: <UserDetails />
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <RouterProvider router={router} />
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
