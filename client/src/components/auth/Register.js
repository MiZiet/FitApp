import React, { useState } from "react";
import { connect } from "react-redux";
import "./Auth.css";
import { Link, Redirect } from "react-router-dom";
import { setMsg } from "../../actions/msg";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";

const Register = ({ register, isLogged, setMsg }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: ""
  });
  const { username, password, password2 } = formData;
  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = async e => {
    e.preventDefault();
    if (password === password2) {
      register(username, password);
    } else {
      setMsg("Passwords do not match", true);
    }
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
            <label htmlFor="loginName">New Username:</label>
            <br />
            <input
              onChange={e => onChange(e)}
              className="textInput"
              type="text"
              id="loginName"
              name="username"
              value={username}
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
            <label htmlFor="loginPass2">Repeat password:</label>
            <br />
            <input
              onChange={e => onChange(e)}
              className="textInput"
              type="password"
              id="loginPass2"
              name="password2"
              value={password2}
            ></input>
            <br />
            <input
              className="submitButton"
              type="submit"
              value="Register"
            ></input>
          </form>
          <Link className="switchButton" to="/login">
            Already registered? Login!
          </Link>
        </div>
      </div>
    </div>
  );
};
const mapState = state => ({
  isLogged: state.auth.isLogged
});

Register.propTypes = {
  register: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired,
  isLogged: PropTypes.bool
};

export default connect(mapState, { register, setMsg })(Register);
