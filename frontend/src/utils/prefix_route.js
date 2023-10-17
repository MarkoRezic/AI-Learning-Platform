function prefixRoute() {
    return window.location.pathname.startsWith("/admin") ? "/admin" : "";
}

export {
    prefixRoute
}