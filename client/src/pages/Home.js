import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import Card from "../components/Card";
import { FiPlus } from "react-icons/fi";
import Navbar from "../components/Navbar";
import {
   getTodos,
   createTodo,
   deleteTodo,
   checkTodo,
} from "../helper/profileHelper";
export default function Home() {
   const context = useContext(UserContext);
   const [profileName, setProfileName] = useState("");
   const [test, setTest] = useState(false);
   const [todos, setTodos] = useState([]);

   const loadTodos = (id, token) => {
      getTodos(id, token)
         .then((data) => {
            console.log(data);
            setTodos(data);
         })
         .catch((err) => console.log(err));
   };
   useEffect(() => {
      if (localStorage.getItem("jwt")) {
         let info = JSON.parse(localStorage.getItem("jwt"));
         context.setUser({ id: info.id, name: info.name, token: info.token });
         setProfileName(context.user?.name);
         loadTodos(info.id, info.token);
         console.log(todos);
      }
   }, []);
   if (!context.user?.id) {
      return <Redirect to="/" />;
   }
   const logout = () => {
      context.setUser(null);
      localStorage.removeItem("jwt");
   };
   const checkTodo = () => {
      setTest(!test);
      console.log(test);
   };
   return (
      <div>
         <Navbar profileName={profileName} />
         <div className="main">
            <div className="content col-sm-12 col-md-8 col-lg-7 m-auto">
               <div className="info">
                  <p>
                     All Tasks for today{" "}
                     <span>
                        <svg
                           aria-hidden="true"
                           focusable="false"
                           data-prefix="far"
                           data-icon="smile"
                           className="svg-inline--fa fa-smile fa-w-16"
                           role="img"
                           xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 496 512"
                        >
                           <path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm0 448c-110.3 0-200-89.7-200-200S137.7 56 248 56s200 89.7 200 200-89.7 200-200 200zm-80-216c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm160 0c17.7 0 32-14.3 32-32s-14.3-32-32-32-32 14.3-32 32 14.3 32 32 32zm4 72.6c-20.8 25-51.5 39.4-84 39.4s-63.2-14.3-84-39.4c-8.5-10.2-23.7-11.5-33.8-3.1-10.2 8.5-11.5 23.6-3.1 33.8 30 36 74.1 56.6 120.9 56.6s90.9-20.6 120.9-56.6c8.5-10.2 7.1-25.3-3.1-33.8-10.1-8.4-25.3-7.1-33.8 3.1z"></path>
                        </svg>
                     </span>
                  </p>
                  <p>{test}</p>
                  <button onClick={logout}>Logout</button>
               </div>

               <div className="floatingBtn">
                  <button className="addTodo">
                     <FiPlus />
                  </button>
               </div>

               <div className="todoSection px-4">
                  {todos.map((todo, index) => {
                     return (
                        <div key={index}>
                           <Card
                              text={todo.todo}
                              markascompled={todo.markascompleted}
                              checkTodo={checkTodo}
                           />
                        </div>
                     );
                  })}
                  <Card
                     text="lroem sdnj asjnd asnd ansdkj asjkdnas kansdka ansdn"
                     markascompled={true}
                     checkTodo={checkTodo}
                  />
               </div>
            </div>
         </div>
      </div>
   );
}
