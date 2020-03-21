import React, { useState } from "react";
import "./Auth.css";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { login } from "../../actions/auth";
import PropTypes from "prop-types";

const Login = ({ login, isLogged }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const { username, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async e => {
    e.preventDefault();
    login(username, password);
  };
  if (isLogged) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div className="backgrndCont">
      <div className="authContainer">
        <h1>
          Welcome to <br /> FitApp
        </h1>
        <div className="formDiv">
          <form onSubmit={e => onSubmit(e)}>
            <label htmlFor="loginName">Username:</label>
            <br />
            <input
              className="textInput"
              type="text"
              id="loginName"
              name="username"
              value={username}
              onChange={e => onChange(e)}
            ></input>
            <br />
            <label htmlFor="loginPass">Password:</label>
            <br />
            <input
              onChange={e => onChange(e)}
              className="textInput"
              type="password"
              id="loginPass"
              name="password"
              value={password}
            ></input>
            <br />
            <input
              className="submitButton"
              type="submit"
              value="Log In"
            ></input>
          </form>
          <Link className="switchButton" to="/register">
            New? Register here!
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapState = state => ({
  isLogged: state.auth.isLogged
});

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLogged: PropTypes.bool
};

export default connect(mapState, { login })(Login);
