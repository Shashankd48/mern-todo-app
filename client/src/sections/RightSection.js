import React, { useState, useContext } from "react";
import Input from "../components/Input";
import passIcon from "../assets/passoword.png";
import emailIcon from "../assets/email.png";
import userIcon from "../assets/user-name.png";
import { FaAngleRight } from "react-icons/fa";
import { signup, login, resetPassword } from "../helper/authHelper";
import { UserContext } from "../context/UserContext";
import { api } from "../setup/config";
import Axios from "../setup/axios";

export default function RightSection() {
   const context = useContext(UserContext);
   const [formToggler, setFormToggler] = useState(true);
   const [name, setName] = useState("");
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [forgotPassword, setForgotPassword] = useState(false);
   const [isEmailSent, setIsEmailSent] = useState(false);
   const giveErrorMessage = () => {
      return <div className="errorMessage">{errorMessage}</div>;
   };
   //    Switch Forms
   const switchForm = () => {
      setFormToggler(!formToggler);
      setForgotPassword(false);
      setErrorMessage("");
      setIsEmailSent(false);
   };

   const userLogin = () => {
      login({ email, password })
         .then((data) => {
            console.log("data: ", data);
            if (data.error) {
               setErrorMessage(data.msg);
            } else {
               context.setUser({
                  id: data.id,
                  name: data.name,
                  token: data.token,
               });
               Axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
               Axios.defaults.headers.post["Content-Type"] = "application/json";
               Axios.defaults.baseURL = api.baseUrl;
               console.log(context.user);
               localStorage.setItem("jwt", JSON.stringify(data));
            }
         })
         .catch((err) => console.log("Login Failed" + err));
   };

   // Handle login
   const handleLogin = (event) => {
      event.preventDefault();
      userLogin();
   };

   const handleSignup = (event) => {
      event.preventDefault();
      signup({ name, email, password })
         .then((data) => {
            if (data.error) {
               setErrorMessage(data.msg);
            } else {
               context.setUser({
                  id: data.id,
                  name: data.name,
                  token: data.token,
               });
               Axios.defaults.headers.common.Authorization = `Bearer ${data.token}`;
               Axios.defaults.headers.post["Content-Type"] = "application/json";
               Axios.defaults.baseURL = api.baseUrl;
               console.log(context.user);
               localStorage.setItem("jwt", JSON.stringify(data));
            }
         })
         .catch((err) => console.log("Login Failed" + err));
   };

   const handleResetPassword = (event) => {
      event.preventDefault();
      resetPassword(email).then((data) => {
         if (data.error) {
            setErrorMessage(data.msg);
         } else {
            setIsEmailSent(true);
            setErrorMessage("Please check your email to reset password!");
         }
      });
   };

   // Forms goes here...
   const LoginForm = () => {
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
            <div className="text-center">
               <span
                  onClick={() => {
                     setErrorMessage("");
                     setForgotPassword(!forgotPassword);
                  }}
               >
                  Forgot {""}
                  <span className="formSwitch">password ?</span>
               </span>
            </div>
         </form>
      );
   };

   const SignupForm = () => {
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

   const ForgetPassword = () => {
      return (
         <form onSubmit={handleResetPassword}>
            <h3 className="text-center">Reset Password</h3>
            <Input
               icon={emailIcon}
               labelText="Email"
               type="email"
               width="18px"
               height="14px"
               value={email}
               onChange={(e) => setEmail(e.target.value)}
            />
            {errorMessage !== "" ? giveErrorMessage() : ""}
            <button type="submit" className="authBtn mb-3">
               {isEmailSent ? "Resend Email" : "Send Email"} <FaAngleRight />
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

   return (
      <div className="col-sm-6 rightSection  order-lg-4">
         {forgotPassword
            ? ForgetPassword()
            : formToggler
            ? SignupForm()
            : LoginForm()}
      </div>
   );
}
