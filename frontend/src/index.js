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
import UserList from './views/users/UserList';
import UserDetails from './views/users/UserDetails';
import NeumorphicElements from './views/NeumorphicElements';
import TeamDetails from './views/teams/TeamDetails';
import TeamList from './views/teams/TeamList';
import TeamUpdate from './views/teams/TeamUpdate';
import TeamNew from './views/teams/TeamNew';
import GuardedRoute from './views/GuardedRoute';
import roles from './constants/roles';
import CardNew from './views/cards/CardNew';
import CardDetails from './views/cards/CardDetails';
import CardUpdate from './views/cards/CardUpdate';
import CardList from './views/cards/CardList';
import LectureList from './views/lectures/LectureList';
import LectureDetails from './views/lectures/LectureDetails';
import FileNew from './views/files/FileNew';
import FileDetails from './views/files/FileDetails';
import FileUpdate from './views/files/FileUpdate';
import FileList from './views/files/FileList';
import Welcome from './views/Welcome';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error404 />,
    children: [
      {
        path: "",
        element: <Welcome />
      },
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
            path: "all-cards",
            element: <CardList />
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
          {
            path: "all-lectures",
            element: <LectureList />
          },
          {
            path: "lecture/:lecture_id",
            element: <LectureDetails />
          },
          {
            path: "all-files",
            element: <FileList />
          },
          {
            path: "files",
            element: <FileList user />
          },
          {
            path: "update-file/:file_id",
            element: <FileUpdate />
          },
          {
            path: "new-file",
            element: <FileNew />
          },
          {
            path: "file/:file_id",
            element: <FileDetails />
          },
        ],
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
        path: "teams",
        element: <TeamList user />
      },
      {
        path: "team/:team_id",
        element: <TeamDetails />
      },
      {
        path: "all-cards",
        element: <CardList access />
      },
      {
        path: "cards",
        element: <CardList user />
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
      {
        path: "all-lectures",
        element: <LectureList />
      },
      {
        path: "lectures",
        element: <LectureList user />
      },
      {
        path: "lecture/:lecture_id",
        element: <LectureDetails />
      },
      {
        path: "lectures/:lecture_id",
        element: <LectureDetails user />
      },
      {
        path: "all-files",
        element: <FileList access />
      },
      {
        path: "files",
        element: <FileList user />
      },
      {
        path: "update-file/:file_id",
        element: <FileUpdate />
      },
      {
        path: "new-file",
        element: <FileNew />
      },
      {
        path: "file/:file_id",
        element: <FileDetails />
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
