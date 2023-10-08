import { useContext } from "react";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { DataContext } from "../Context";
import Loader from "../components/Loader";

const GuardedRoute = ({ role_id }) => {

    const context = useContext(DataContext)

    const roleRedirect = {
        "default": "/login",
        "1": "/",
        "2": "/admin",
    }

    return context?.loading ? <Loader />
        : context?.user?.role_id === role_id || (context?.user?.role_id == null && context?.user?.role_id == role_id)
            ? <Outlet />
            : <Navigate to={context?.user?.role_id != null ? roleRedirect[context?.user?.role_id.toString()] : roleRedirect["default"]} />


}

export default GuardedRoute;