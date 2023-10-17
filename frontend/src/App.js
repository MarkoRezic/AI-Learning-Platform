import { useContext } from 'react';
import './App.scss';
import { Link, Outlet } from "react-router-dom";
import { DataContext } from './Context';
import roles from './constants/roles';
import Loader from './components/Loader';

function App() {
  const context = useContext(DataContext)

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
          route: "/teams"
        },
        {
          name: "Svi projekti",
          route: "/all-teams"
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
      name: "Kartice",
      route: null,
      role_id: roles.user.role_id,
      children: [
        {
          name: "Moje kartice",
          route: "/cards"
        },
        {
          name: "Sve kartice",
          route: "/all-cards"
        },
        {
          name: "Nova kartica",
          route: "/new-card"
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
          route: "/admin/all-teams"
        },
        {
          name: "Recenzije projekata",
          route: "/admin/reviews"
        },
        {
          name: "Dodaj projekt",
          route: "/admin/new-team"
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
          route: "/admin/all-lectures"
        },
        {
          name: "Napravi lekciju",
          route: "/admin/new-lecture"
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
          route: "/admin/posts"
        },
        {
          name: "Sve objave",
          route: "/admin/all-posts"
        },
        {
          name: "Svi komentari",
          route: "/admin/all-comments"
        },
        {
          name: "Nova objava",
          route: "/admin/new-post"
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
          route: "/admin/files"
        },
        {
          name: "Sve datoteke",
          route: "/admin/all-files"
        },
        {
          name: "Prenesi datoteku",
          route: "/admin/new-file"
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
          route: "/admin/all-users"
        },
      ],
    },
    {
      name: "Kartice",
      route: null,
      role_id: roles.admin.role_id,
      children: [
        {
          name: "Sve kartice",
          route: "/admin/all-cards"
        },
        {
          name: "Nova kartica",
          route: "/admin/new-card"
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
          route: "/admin/settings"
        },
        {
          name: "Odjavi se",
          route: "/",
          on_click: context.logout
        },
      ],
    },
  ]

  return (
    <div id="app">
      <header id="app-header" className='surface-primary-200 shadow-mid shadow-smooth-small rounded-circular  transition-smooth'>
        {
          navigationRoutes.filter(route => route.role_id == context?.user?.role_id).map((route, route_index) =>
            <div className="dropdown " key={route_index}>
              <button className="dropbtn rounded-small hover-invert transition-smooth">{route.name}</button>
              <div className="dropdown-content surface-primary-200 shadow-inset-mid rounded-large transition-smooth">
                {route.children.map((child_route, child_route_index) =>
                  <Link className=' hover-invert transition-smooth'
                    to={child_route.route} onClick={child_route.on_click} key={child_route_index}>
                    {child_route.name}
                  </Link>
                )}
              </div>
            </div>)
        }
      </header>
      {
        context?.loading ? <Loader />
          : <Outlet />
      }
    </div>
  );
}

export default App;
