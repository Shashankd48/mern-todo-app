import React, { useContext, useEffect } from "react";
import LeftSection from "../sections/LeftSection";
import RightSection from "../sections/RightSection";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";

export default function Auth() {
   const context = useContext(UserContext);
   useEffect(() => {
      if (localStorage.getItem("jwt")) {
         let info = JSON.parse(localStorage.getItem("jwt"));
         context.setUser({ id: info.id, name: info.name });
      }
      // eslint-disable-next-line
   }, []);

   if (context.user?.id) {
      return <Redirect to="/home" />;
   }
   return (
      <div className="row m-0">
         <RightSection />
         <LeftSection />
      </div>
   );
}
