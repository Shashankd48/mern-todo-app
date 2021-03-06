import { api } from "../setup/config";
import Axios from "../setup/axios";

export function getTodos() {
   let request;
   request = Axios.get("/profile");
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         throw error;
      });
}

export function createTodo(todo) {
   let request;
   request = Axios.post("/profile/createTodo", { todo });
   return request
      .then((result) => {
         console.log("data: ", result.data);
         return result.data;
      })
      .catch((error) => {
         throw error;
      });
}

//create todo
// export const createTodo = (userId, token, todo) => {
//    console.log("todo: ", todo);
//    return fetch(`${api.profile}/createtodo`, {
//       method: "POST",
//       headers: {
//          Accept: "application/json",
//          "Content-Type": "application/json",
//          Authorization: token,
//       },
//       body: todo,
//    })
//       .then((response) => response.json())
//       .catch((err) => console.log(err));
// };

// Marktodo
export const checkTodo = (userId, token, todoId, toggle) => {
   return fetch(
      `${api.profile}/markascompleted/${userId}/${todoId}/${toggle}`,
      {
         method: "PUT",
         headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: token,
         },
      }
   )
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

// Delete Todo
export const deleteTodo = (userId, token, todoId) => {
   return fetch(`${api.profile}/removetodo/${userId}/${todoId}`, {
      method: "DELETE",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: token,
      },
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};
