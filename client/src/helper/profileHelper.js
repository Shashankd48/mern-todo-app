import { api } from "../setup/config";

// getAll tudo
export const getTodos = (userId, token) => {
   return fetch(`${api.profile}/${userId}`, {
      method: "GET",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: token,
      },
   })
      .then((response) => {
         return response.json();
      })
      .catch((err) => console.log(err));
};

//create todo
export const createTodo = (userId, token, todo) => {
   return fetch(`${api.profile}/createtodo/${userId}`, {
      method: "POST",
      headers: {
         Accept: "application/json",
         "Content-Type": "application/json",
         Authorization: token,
      },
      body: JSON.stringify(todo),
   })
      .then((response) => response.json())
      .catch((err) => console.log(err));
};

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
