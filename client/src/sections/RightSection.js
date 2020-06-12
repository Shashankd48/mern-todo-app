import React, { useState } from "react";
import Input from "../components/Input";
import passIcon from "../assets/passoword.png";
import emailIcon from "../assets/email.png";
import userIcon from "../assets/user-name.png";
import { FaAngleRight } from "react-icons/fa";
import { signup, login } from "../helper/authHelper";
export default function RightSection() {
   const [formToggler, setFormToggler] = useState(true);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");

   const giveErrorMessage = () => {
      return <div className="errorMessage">{errorMessage}</div>;
   };
   //    Switch Forms
   const switchForm = (event) => {
      event.preventDefault();
      setFormToggler(!formToggler);
      setErrorMessage("");
   };

   // Handle login
   const handleLogin = (event) => {
      event.preventDefault();
      login({ email, password })
         .then((data) => {
            if (data.error) {
               // TODO: Delete log
               console.log(data.error);
               setErrorMessage(data.error);
            } else {
               // TODO: redired user to home page and delete log
               console.log(data);
               localStorage.setItem("jwt", JSON.stringify(data));
            }
         })
         .catch((err) => console.log("Login Failed" + err));
   };
   const handleSignup = (event) => {
      event.preventDefault();
      signup({ name, email, password })
         .then((data) => {
            if (data.error) {
               // TODO: Delete log
               console.log(data.error);
               setErrorMessage(data.error);
            } else {
               // TODO: redired user to home page and delete log
               console.log(data);
            }
         })
         .catch((err) => console.log("Login Failed" + err));
   };
   // Forms goes here...
   const loginForm = () => {
      return (
         <form onSubmit={handleLogin}>
            <h3 className="text-center">Login</h3>
            <Input
               icon={emailIcon}
               labelText="Email"
               type="email"
               width="18px"
               height="14px"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <Input
               icon={passIcon}
               labelText="Password"
               type="password"
               width="16px"
               height="18px"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage !== "" ? giveErrorMessage() : ""}
            <button type="submit" className="authBtn mb-3">
               Login <FaAngleRight />
            </button>
            <div className="text-center">
               <span>
                  Create a new account here...{" "}
                  <span className="formSwitch" onClick={switchForm}>
                     Sign Up
                  </span>
               </span>
            </div>
         </form>
      );
   };
   const signupForm = () => {
      return (
         <form onSubmit={handleSignup}>
            <h3 className="text-center">Sign Up</h3>
            <Input
               icon={userIcon}
               labelText="Name"
               type="text"
               width="20px"
               height="15px"
               value={name}
               onChange={(e) => setName(e.target.value)}
            />
            <Input
               icon={emailIcon}
               labelText="Email"
               type="email"
               width="18px"
               height="14px"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            <Input
               icon={passIcon}
               labelText="Password"
               type="password"
               width="16px"
               height="18px"
               value={password}
               onChange={(e) => setPassword(e.target.value)}
            />
            {errorMessage !== "" ? giveErrorMessage() : ""}
            <button type="submit" className="authBtn mb-3">
               Sign Up <FaAngleRight />
            </button>
            <div className="text-center">
               <span>
                  Already have an account go to.{" "}
                  <span className="formSwitch" onClick={switchForm}>
                     Login
                  </span>
               </span>
            </div>
         </form>
      );
   };
   return (
      <div className="col-sm-6 rightSection">
         {formToggler === true ? signupForm() : loginForm()}
      </div>
   );
}
