import React from "react";
import { FaTimes, FaCheck } from "react-icons/fa";
// import { GiCircle } from "react-icons/gi";
export default function Card() {
   return (
      <div className="todoCard">
         <p>Record youtube videos</p>
         <div className="d-flex ">
            <button className="todoBtn deleteBtn">
               <span>
                  <FaTimes />
               </span>
            </button>
            <button className="todoBtn markCompletedBtn">
               <span>
                  <FaCheck />
               </span>
            </button>
         </div>
      </div>
   );
}

// <button className="todoBtn markBtn">
//                <span>
//                   <GiCircle />
//                </span>
//             </button>
