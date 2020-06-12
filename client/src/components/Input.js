import React from "react";
export default function Input({
   icon,
   labelText,
   type,
   width,
   height,
   value,
   onChange,
}) {
   return (
      <div className="">
         <div className="inputbox">
            <input
               type={type}
               name={type}
               className="authInput"
               value={value}
               onChange={onChange}
               required
            />
            <div className="label">
               <img src={icon} alt="" width={width} height={height} />
               <label htmlFor={type}>{labelText}</label>
            </div>
         </div>
      </div>
   );
}
