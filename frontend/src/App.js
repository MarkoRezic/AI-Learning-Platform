import { useContext } from 'react';
import './App.css';
import { Link, Outlet } from "react-router-dom";
import { DataContext } from './Context';
import roles from './constants/roles';

function App() {
  const context = useContext(DataContext)

  console.log(context.user)

  const navigationRoutes = [
    // Public routes
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
    // Student routes
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
      name: "Lekcije",
      route: null,
      role_id: roles.user.role_id,
      children: [
        {
          name: "Moje lekcije",
          route: "/lectures"
        },
        {
          name: "Sve lekcije",
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
          name: "Moji komentari",
          route: "/comments"
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
    // Admin routes
    {
      name: "Projekti",
      route: null,
      role_id: roles.admin.role_id,
      children: [
        {
          name: "Svi projekti",
          route: "/all-projects"
        },
        {
          name: "Recenzije projekata",
          route: "/reviews"
        },
        {
          name: "Dodaj projekat",
          route: "/new-project"
        },
      ],
    },
    {
      name: "Lekcije",
      route: null,
      role_id: roles.admin.role_id,
      children: [
        {
          name: "Sve lekcije",
          route: "/all-lectures"
        },
        {
          name: "Napravi lekciju",
          route: "/new-lecture"
        },
      ],
    },
    {
      name: "Objave",
      route: null,
      role_id: roles.admin.role_id,
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
          name: "Svi komentari",
          route: "/all-comments"
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
      role_id: roles.admin.role_id,
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
      name: "Korisnici",
      route: null,
      role_id: roles.admin.role_id,
      children: [
        {
          name: "Svi korisnici",
          route: "/all-users"
        },
      ],
    },
    {
      name: "Profil",
      route: null,
      role_id: roles.admin.role_id,
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
