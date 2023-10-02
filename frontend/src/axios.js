import axios from "axios"

export const apiBaseUrl = "http://localhost:8000/"

axios.defaults.withCredentials = true;

const instance = axios.create({
    baseURL: apiBaseUrl,
    withCredentials: true,
})

export default instance