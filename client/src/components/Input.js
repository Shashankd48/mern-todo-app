import React from "react";
export default function Input({ icon, labelText, type, width, height }) {
   return (
      <div>
         <div className="label d-flex align-items-center" height="20px">
            <img src={icon} alt="" width={width} height={height} />
            <label htmlFor="" className="ml-2">
               {labelText}
            </label>
         </div>
         <input type={type} className="authInput" />
      </div>
   );
}
