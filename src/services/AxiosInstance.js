import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
axios.defaults.headers.authorization = cookies.get("reflink");

const axiosInstance = axios.create({
  baseURL: `https://hopeful-lederberg.185-178-192-38.plesk.page/`,
  // baseURL: `http://localhost:8000/`,
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
  "Access-Control-Allow-Headers":
    "Origin, X-Requested-With, Content-Type, Accept",
  crossorigin: true,
});

export default axiosInstance;
