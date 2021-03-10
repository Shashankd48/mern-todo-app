import React from "react";
import content from "../assets/logo.svg";
export default function LeftSection() {
   return (
      <div className="col-sm-6 leftSection order-lg-1">
         <img src={content} alt="" className="img-fluid" />
      </div>
   );
}
