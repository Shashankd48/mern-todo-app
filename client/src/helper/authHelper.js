import { api } from "../setup/config";
import Axios from "axios";

export function signup(user) {
   let request = Axios.post(`${api.auth}/signup`, {
      name: user.name,
      email: user.email,
      password: user.password,
   });
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}

export function login(user) {
   let request = Axios.post(`${api.auth}/login`, {
      email: user.email,
      password: user.password,
   });
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}

export function resetPassword(email) {
   let request = Axios.post(`${api.auth}/resetPassword`, {
      email,
   });
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         return error.response.data;
      });
}

export function updatePassword(password, token) {
   let request = Axios.post(`${api.auth}/updatePassword/${token}`, {
      password,
   });
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         console.log("error:", error.response.data);
         return error.response.data;
      });
}
