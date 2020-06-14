import axios from "axios";

const api = axios.create({
  baseURL: "https://backend-trecho.herokuapp.com/",
});

export default api;
