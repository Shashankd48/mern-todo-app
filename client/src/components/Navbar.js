import React from "react";
import logo from "../assets/LogoBg.svg";
export default function Navbar() {
   return (
      <div className="navBar text-center">
         <img src={logo} alt="Logo" width="170px" />
         <h3>To Do</h3>
      </div>
   );
}
