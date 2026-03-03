import axios from "axios";
import AxiosConfig from "../../config/databse/axios/Axios.config.js";
const api = axios.create(AxiosConfig);
export default api;
