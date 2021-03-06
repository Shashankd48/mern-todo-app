import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

export default function Card({ text, markascompleted, deleteTodo, checkTodo }) {
   console.log(markascompleted);
   return (
      <div className="todoCard">
         <div className="d-flex">
            {markascompleted === true ? (
               <button className="todoBtn markCompletedBtn" onClick={checkTodo}>
                  <span>
                     <FaCheck />
                  </span>
               </button>
            ) : (
               <button className="todoBtn markBtn" onClick={checkTodo}>
                  <span>
                     <FaTimes />
                  </span>
               </button>
            )}
            <p>{text}</p>
         </div>

         <div className="d-flex ">
            <button className="todoBtn deleteBtn" onClick={deleteTodo}>
               <span>
                  <FaTimes />
               </span>
            </button>
         </div>
      </div>
   );
}
