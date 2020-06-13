import React, { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { Redirect } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Home() {
   const context = useContext(UserContext);
   useEffect(() => {
      if (localStorage.getItem("jwt")) {
         let info = JSON.parse(localStorage.getItem("jwt"));
         context.setUser({ id: info.id, name: info.name });
      }
   }, []);
   if (!context.user?.id) {
      return <Redirect to="/" />;
   }
   const logout = () => {
      context.setUser(null);
      localStorage.removeItem("jwt");
   };
   return (
      <div>
         <Navbar />
         <div style={{ height: "100vh" }}>
            <h1>Home Page</h1>
            <h2>{context.user?.id}</h2>
            <h2>{context.user?.name}</h2>
            <button onClick={logout}>logout</button>
         </div>
      </div>
   );
}
