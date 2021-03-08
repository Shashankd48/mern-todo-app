import { api } from "../setup/config";
import Axios from "axios";

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
// export const login = (user) => {
//    return fetch(`${api.auth}/login`, {
//       method: "POST",
//       headers: {
//          Accept: "application/json",
//          "Content-type": "application/json",
//       },
//       body: JSON.stringify(user),
//    })
//       .then((response) => response.json())
//       .catch((err) => console.log(err));
// };

export function login(user) {
   console.table("auth: ", user);
   let request = Axios.post(
      `${api.auth}/login`,
      { user },
      {
         Headers: {
            "Content-type": "application/json",
         },
      }
   );
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         throw error;
      });
}
