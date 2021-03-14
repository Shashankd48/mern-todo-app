import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";

export default function Card({
   index,
   text,
   markascompleted,
   deleteTodo,
   checkTodo,
}) {
   return (
      <div className="todoCard">
         <div className="d-flex flex-btn">
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
         </div>
         <div className="d-flex flex-text">
            <p className={markascompleted ? "textdecorate" : ""}>{`${
               index + 1
            }. ${text}`}</p>
         </div>

         <div className="d-flex flex-btn">
            <button className="todoBtn deleteBtn" onClick={deleteTodo}>
               <span>
                  <FaTimes />
               </span>
            </button>
         </div>
      </div>
   );
}
