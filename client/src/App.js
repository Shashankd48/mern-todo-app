import React, { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { UserContext } from "./context/UserContext";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PageNotFound from "./pages/PageNotFound";
import Home from "./pages/Home";
import Auth from "./pages/Auth";

export default function App() {
   const [user, setUser] = useState(null);
   return (
      <Router>
         <UserContext.Provider value={{ user, setUser }}>
            <Switch>
               <Route exact path="/" component={Auth} />
               <Route exact path="/home" component={Home} />
               <Route path="*" component={PageNotFound} />
            </Switch>
         </UserContext.Provider>
      </Router>
   );
}
