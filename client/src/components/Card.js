import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
import { GiCircle } from "react-icons/gi";
export default function Card({
   text,
   markascompled = true,
   deleteTodo,
   checkTodo,
}) {
   return (
      <div className="todoCard">
         <div className="d-flex">
            {markascompled === true ? (
               <button className="todoBtn markCompletedBtn" onClick={checkTodo}>
                  <span>
                     <FaCheck />
                  </span>
               </button>
            ) : (
               <button className="todoBtn markBtn">
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
