import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
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
import TeamDetails from './views/admin/TeamDetails';
import TeamList from './views/admin/TeamList';
import TeamUpdate from './views/admin/TeamUpdate';
import TeamNew from './views/admin/TeamNew';

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
      {
        path: "all-teams",
        element: <TeamList />
      },
      {
        path: "team/:team_id",
        element: <TeamDetails />
      },
      {
        path: "update-team/:team_id",
        element: <TeamUpdate />
      },
      {
        path: "new-team",
        element: <TeamNew />
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
