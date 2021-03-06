import { api } from "./config";
import Axios from "axios";

// Next we make an 'instance' of it
const instance = Axios.create({
   // .. where we make our configurations
   baseURL: api.baseUrl,
});

// Where you would set stuff like your 'Authorization' header, etc ...
if (localStorage.getItem("jwt")) {
   let info = JSON.parse(localStorage.getItem("jwt"));
   instance.defaults.headers.common["Authorization"] = info.token;
}

instance.defaults.headers.post["Content-Type"] = "application/json";

// Also add/ configure interceptors && all the other cool stuff
export default instance;
