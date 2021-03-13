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

export default function UpdatePassword() {
   const [password, setPassword] = useState("");
   const [confirmPassword, setConfirmPassword] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [toggleShowPassword, setToggleShowPassword] = useState(false);
   const giveErrorMessage = () => {
      return <div className="errorMessage">{errorMessage}</div>;
   };

   const _updatePassword = (event) => {
      event.preventDefault();
   };

   return (
      <div className="col-sm-12 rightSection updatePassword" height="100vh">
         <form onSubmit={UpdatePassword}>
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
         </form>
      </div>
   );
}
