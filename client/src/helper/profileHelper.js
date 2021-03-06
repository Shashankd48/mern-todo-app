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
         return result.data;
      })
      .catch((error) => {
         throw error;
      });
}

export function removeTodo(todoId) {
   let request;
   request = Axios.delete(`/profile/removetodo/${todoId}`);
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         throw error;
      });
}

export function markAsCompleted(todoId, toggle) {
   let request;
   request = Axios.put(`/profile/markascompleted/${todoId}/${toggle}`);
   return request
      .then((result) => {
         return result.data;
      })
      .catch((error) => {
         throw error;
      });
}
