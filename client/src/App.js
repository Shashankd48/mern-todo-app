import React, { useState, useEffect } from "react";
import "./App.css";
export default function App() {
   const [todos, setTodos] = useState([]);
   const getData = () => {
      return fetch(
         `http://localhost:5000/todo/api/profile/5ee04e892263ef2528edb2ee`,
         {
            method: "GET",
            headers: {
               Accept: "application/json",
               "Content-Type": "application/json",
               Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZTA0ZTg5MjI2M2VmMjUyOGVkYjJlZSIsImVtYWlsIjoieHl6QGdtYWlsLmNvbSIsIm5hbWUiOiJWaWthcyBwYW5kZXkiLCJpYXQiOjE1OTE3NzI5NjMsImV4cCI6MTU5MTc3NjU2M30.yAMhd9AtFxu1f2YRhodZ4VB8XCa_7iFAKixCIkqB2s0`,
            },
         }
      )
         .then((response) => {
            return response.json();
         })
         .catch((err) => console.log(err));
   };
   useEffect(() => {
      getData().then((result) => {
         console.log(result);
         setTodos(result);
         console.log(todos);
      });
   }, []);
   return (
      <div>
         <h1>Todo App</h1>
         {todos.length > 0
            ? todos.map((todo, index) => {
                 return (
                    <ul key={index}>
                       <li>ID: {todo._id} </li>
                       <li>Todo: {todo.todo}</li>
                       <li>
                          Completed: {todo.markascompleted ? "Yes" : "No"}{" "}
                       </li>
                    </ul>
                 );
              })
            : ""}
      </div>
   );
}
