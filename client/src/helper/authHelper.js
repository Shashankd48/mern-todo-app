import { api } from "../setup/config";

// Signup
export const signup = (user) => {
   return fetch(`${api.auth}/signup`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

// Login Method
export const login = (user) => {
   return fetch(`${api.auth}/login`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-type": "application/json",
      },
      body: JSON.stringify(user),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};
