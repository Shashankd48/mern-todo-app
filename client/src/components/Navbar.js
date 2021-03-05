import React from "react";
import logo from "../assets/LogoBg.svg";
export default function Navbar({ profileName }) {
   return (
      <div className="navBar">
         <div className="content  col-sm-12 col-md-8 col-lg-7 m-0 p-0 m-auto">
            <img src={logo} alt="Logo" width="150px" />
            <p className="welcome">
               Hi <span>{profileName}</span> !
            </p>
         </div>
      </div>
   );
}
