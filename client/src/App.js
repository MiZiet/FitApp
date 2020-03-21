import React, { useEffect } from "react";
import "./App.css";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import store from "./store";
import { getUserData } from "./actions/auth";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
  faPlusCircle,
  faTimesCircle,
  faWrench,
  faTimes,
  faCog,
  faBars,
  faUser,
  faDumbbell,
  faSignOutAlt,
  faPen,
  faSave,
  faPlus,
  faExclamationCircle
} from "@fortawesome/free-solid-svg-icons";

import Msg from "./components/layout/Msg";

import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Dashboard from "./components/dashboard/Dashboard";

import JWTsetToken from "./utils/JWTsetToken.js";

if (localStorage.token) {
  JWTsetToken(localStorage.token);
}

function App() {
  library.add(
    faPlusCircle,
    faTimesCircle,
    faWrench,
    faTimes,
    faCog,
    faBars,
    faUser,
    faDumbbell,
    faSignOutAlt,
    faPen,
    faSave,
    faPlus,
    faExclamationCircle
  );

  useEffect(() => {
    store.dispatch(getUserData());
  }, []);

  return (
    <div className="App">
      <Provider store={store}>
        <Msg />
        <Router>
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
            <Route exact path="/dashboard" component={Dashboard} />
            <Route exact path="*" component={Dashboard} />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
