import axios from "axios";

axios.defaults.baseURL = "https://acropolis-estates-api-2e18d7daaa60.herokuapp.com/";
axios.defaults.headers.post["Content-Type"] = "multipart/form-data";
axios.defaults.withCredentials = true;

export const axiosReq = axios.create();
export const axiosRes = axios.create();
