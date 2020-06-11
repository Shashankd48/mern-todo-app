import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import LeftSection from "./sections/LeftSection";
import RightSection from "./sections/RightSection";
export default function App() {
   return (
      <div className="row m-0">
         <LeftSection />
         <RightSection />
      </div>
   );
}
