import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:3100/api",
  withCredentials: true,
});

export default instance;
