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
import UserList from './views/admin/users/UserList';
import UserDetails from './views/admin/users/UserDetails';
import NeumorphicElements from './views/NeumorphicElements';
import TeamDetails from './views/admin/teams/TeamDetails';
import TeamList from './views/admin/teams/TeamList';
import TeamUpdate from './views/admin/teams/TeamUpdate';
import TeamNew from './views/admin/teams/TeamNew';
import GuardedRoute from './views/GuardedRoute';
import roles from './constants/roles';
import CardNew from './views/admin/cards/CardNew';
import CardDetails from './views/admin/cards/CardDetails';
import CardUpdate from './views/admin/cards/CardUpdate';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "style",
        element: <NeumorphicElements />
      },
      {
        path: "login",
        element: <GuardedRoute role_id={null} />,
        children: [
          {
            path: "",
            element: <EduidLogin />
          }
        ]
      },
      {
        path: "admin-login",
        element: <AdminLogin />
      },
      {
        path: "admin",
        element: <GuardedRoute role_id={roles.admin.role_id} />,
        children: [
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
          {
            path: "card/:card_id",
            element: <CardDetails />
          },
          {
            path: "update-card/:card_id",
            element: <CardUpdate />
          },
          {
            path: "new-card",
            element: <CardNew />
          },
        ],
      },
    ]
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <DataProvider>
    <RouterProvider router={router} />
  </DataProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
