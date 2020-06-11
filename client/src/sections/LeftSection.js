import React from "react";
import content from "../assets/logo.svg";
export default function LeftSection() {
   return (
      <div className="col-md-6 leftSection">
         <img src={content} alt="" className="img-fluid" />
      </div>
   );
}
