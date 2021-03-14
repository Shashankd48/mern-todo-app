import React, { useState } from "react";
import Input from "../components/Input";
import passIcon from "../assets/passoword.png";
import { FaAngleRight } from "react-icons/fa";
import { updatePassword } from "../helper/authHelper";

import { Link, useParams } from "react-router-dom";

export default function UpdatePassword() {
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [toggleShowPassword, setToggleShowPassword] = useState(false);
   const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
   const params = useParams();

   const giveErrorMessage = () => {
      return <div className="errorMessage">{errorMessage}</div>;
   };

   const _updatePassword = (event) => {
      event.preventDefault();
      let error =
         password !== confirmPassword
            ? "Password do not match!"
            : password.length < 6
            ? "Password must contain at least 6 character"
            : "";
      setErrorMessage(error);
      if (error !== "") {
         return;
      }

      updatePassword(password, params.token).then((data) => {
         console.log("data: ");
         if (data.error) {
            if (
               data.error === "jwt malformed" ||
               data.error === "invalid signature" ||
               data.error === "jwt expired"
            ) {
               setErrorMessage("Invalid Token");
            }
         } else {
            setPassword("");
            setConfirmPassword("");
            setErrorMessage("Your password has been updated!");
            setIsPasswordUpdated(true);
         }
      });
   };

   const PasswordUpdated = () => {
      return (
         <div className="text-center container mt-3">
            <Link to="/" style={{ textDecoration: "none" }}>
               <h1 style={{ color: "#fff" }}>
                  Go to{" "}
                  <span className="formSwitch head">
                     login {""} <FaAngleRight />
                  </span>
               </h1>
            </Link>
            <h5>{errorMessage}</h5>
         </div>
      );
   };

   const UpdatedPasswordForm = () => {
      return (
         <form onSubmit={_updatePassword}>
            <div>
               <h3 className="text-center">Update Password</h3>
               <Input
                  icon={passIcon}
                  labelText="New Password"
                  type={toggleShowPassword ? "text" : "password"}
                  width="16px"
                  height="18px"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
               />
               <Input
                  icon={passIcon}
                  labelText="Password"
                  type={toggleShowPassword ? "text" : "password"}
                  width="16px"
                  height="18px"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
               />
               {errorMessage !== "" ? giveErrorMessage() : ""}
               <button type="submit" className="authBtn mb-3">
                  Update Password <FaAngleRight />
               </button>
               <div className="text-center container">
                  <input
                     type="checkbox"
                     checked={toggleShowPassword}
                     onClick={() => setToggleShowPassword(!toggleShowPassword)}
                     style={{ marginRight: "10px" }}
                  />
                  <span
                     className="formSwitch"
                     onClick={() => setToggleShowPassword(!toggleShowPassword)}
                  >
                     Show Password
                  </span>
               </div>
            </div>
         </form>
      );
   };

   return (
      <div className="col-sm-12 rightSection updatePassword" height="100vh">
         {isPasswordUpdated ? PasswordUpdated() : UpdatedPasswordForm()}
      </div>
   );
}
