import { useContext } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import { DataContext } from './Context';
import roles from './constants/roles';

function App() {
  const context = useContext(DataContext)

  console.log(context.user)

  const navigationRoutes = [
    {
      name: "Početna",
      route: null,
      role_id: null,
      children: [
        {
          name: "O platformi",
          route: "/about"
        },
        {
          name: "Upute",
          route: "/tutorial"
        },
      ],
    },
    {
      name: "Prijava",
      route: null,
      role_id: null,
      children: [
        {
          name: "Student",
          route: "/login"
        },
        {
          name: "Admin",
          route: "/admin-login"
        },
      ],
    },
    {
      name: "Projekti",
      route: null,
      role_id: roles.user.role_id,
      children: [
        {
          name: "Moji projekti",
          route: "/projects"
        },
        {
          name: "Svi projekti",
          route: "/all-projects"
        },
      ],
    },
    {
      name: "Predavanja",
      route: null,
      role_id: roles.user.role_id,
      children: [
        {
          name: "Moja predavanja",
          route: "/lectures"
        },
        {
          name: "Sva predavanja",
          route: "/all-lectures"
        },
      ],
    },
    {
      name: "Objave",
      route: null,
      role_id: roles.user.role_id,
      children: [
        {
          name: "Moje objave",
          route: "/posts"
        },
        {
          name: "Sve objave",
          route: "/all-posts"
        },
        {
          name: "Nova objava",
          route: "/new-post"
        },
      ],
    },
    {
      name: "Datoteke",
      route: null,
      role_id: roles.user.role_id,
      children: [
        {
          name: "Moje datoteke",
          route: "/files"
        },
        {
          name: "Sve datoteke",
          route: "/all-files"
        },
        {
          name: "Prenesi datoteku",
          route: "/new-file"
        },
      ],
    },
    {
      name: "Profil",
      route: null,
      role_id: roles.user.role_id,
      children: [
        {
          name: "Postavke",
          route: "/settings"
        },
        {
          name: "Odjavi se",
          route: null,
          on_click: context.logout
        },
      ],
    },
  ]

  return (
    <div id="app">
      <header id="app-header">
        {
          navigationRoutes.filter(route => route.role_id == context?.user?.role_id).map((route, route_index) =>
            <div className="dropdown" key={route_index}>
              <button className="dropbtn">{route.name}</button>
              <div className="dropdown-content">
                {route.children.map((child_route, child_route_index) => <Link to={child_route.route} onClick={child_route.on_click} key={child_route_index}>{child_route.name}</Link>)}
              </div>
            </div>)
        }
      </header>
      <Outlet />
    </div>
  );
}

export default App;
