import React, { useState } from "react";
import Input from "../components/Input";
import passIcon from "../assets/passoword.png";
import emailIcon from "../assets/email.png";
import userIcon from "../assets/user-name.png";
import { FaAngleRight } from "react-icons/fa";
export default function RightSection() {
   const [formToggler, setFormToggler] = useState(true);

   //    Switch Forms
   const switchForm = (event) => {
      event.preventDefault();
      setFormToggler(!formToggler);
   };
   // Forms goes here...
   const loginForm = () => {
      return (
         <form action="">
            <h3 className="text-center">Login</h3>
            <Input
               icon={emailIcon}
               labelText="Email"
               type="email"
               width="20px"
               height="15px"
            />
            <Input
               icon={passIcon}
               labelText="Password"
               type="password"
               width="16px"
               height="18px"
            />
            <button type="submit" className="authBtn mb-3">
               Login <FaAngleRight />
            </button>
            <div className="text-center">
               <span>
                  Create a new account here...{" "}
                  <a href="#" onClick={switchForm}>
                     Sign Up
                  </a>
               </span>
            </div>
         </form>
      );
   };
   const signupForm = () => {
      return (
         <form action="">
            <h3 className="text-center">Sign Up</h3>
            <Input
               icon={userIcon}
               labelText="Name"
               type="text"
               width="20px"
               height="15px"
            />
            <Input
               icon={emailIcon}
               labelText="Email"
               type="email"
               width="18px"
               height="14px"
            />
            <Input
               icon={passIcon}
               labelText="Password"
               type="password"
               width="16px"
               height="18px"
            />
            <button type="submit" className="authBtn mb-3">
               Sign Up <FaAngleRight />
            </button>
            <div className="text-center">
               <span>
                  Already have an account go to.{" "}
                  <a href="#" onClick={switchForm}>
                     Login
                  </a>
               </span>
            </div>
         </form>
      );
   };
   return (
      <div className="col-md-6 rightSection">
         {formToggler === true ? signupForm() : loginForm()}
      </div>
   );
}
