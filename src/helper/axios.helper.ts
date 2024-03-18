import axios from "axios";

axios.defaults.baseURL = "http://localhost/rest";
axios.defaults.withCredentials = true;
axios.defaults.headers.common["content-type"] =
  "application/x-www-form-urlencoded";
// axios.defaults.baseURL = "https://monkfish-app-z9uza.ondigitalocean.app/bcard2";
// axios.defaults.baseURL = process.env.REACT_APP_API_URL;

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    /**
     * if token exists then we add the token to request header
     */
    config.headers["token"] = token;
  }
  return config;
});
