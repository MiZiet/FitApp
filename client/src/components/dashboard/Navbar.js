import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "./Navbar.css";
import Moment from "react-moment";
import { logout } from "../../actions/auth";
import {
  getTrainings,
  createTraining,
  getActiveTraining,
  deleteTraining
} from "../../actions/trainings";
import { Link, Redirect } from "react-router-dom";
import PropTypes from "prop-types";

import avatar from "../../img/default-avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../layout/Modal";
const Training = props => (
  <div
    className={
      props.isActive ? "singleTraining singleTrainingActive" : "singleTraining"
    }
    onClick={
      !props.isActive
        ? id => {
            props.getActiveTraining(props.id);
          }
        : null
    }
  >
    <div className="stDefault">
      <h2>{props.name}</h2>
      <span>
        <Moment format="DD/MM/YYYY">{props.date}</Moment>
      </span>
    </div>
    {props.isActive && (
      <div className="stActive">
        {" "}
        <i>
          <FontAwesomeIcon icon="pen" />
        </i>{" "}
        <i onClick={id => props.deleteTraining(props.id)}>
          <FontAwesomeIcon icon="times" size="lg" />
        </i>
      </div>
    )}
  </div>
);

const Navbar = ({
  logout,
  getTrainings,
  createTraining,
  isLogged,
  user,
  trainingsList,
  activeTraining,
  getActiveTraining,
  deleteTraining
}) => {
  useEffect(() => {
    getTrainings();
  }, []);

  const [listMenu, toggleListMenu] = useState(false);

  const [showModal, toggleShowModal] = useState(false);

  const [NTinput, setNTinput] = useState("");

  const fillMenu = () => {
    if (trainingsList.length > 0) {
      return trainingsList.map((value, index) => {
        const isActive = value._id === activeTraining._id ? true : false;
        return (
          <Training
            name={value.name}
            date={value.date}
            id={value._id}
            key={index}
            isActive={isActive}
            getActiveTraining={id => {
              getActiveTraining(id);
            }}
            deleteTraining={id => {
              deleteTraining(id);
            }}
          />
        );
      });
    } else {
      return <span className="emptyArraySpan">Add First Training.</span>;
    }
  };

  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <div className="navbarContainer">
      <div className="navbarMobile">
        <img src={avatar} alt="avatar" /> <h1> {user.username}</h1>
        <button
          className="moblieShow navbarToggleButton"
          onClick={() => {
            toggleListMenu(!listMenu);
          }}
        >
          <FontAwesomeIcon icon="bars" />
        </button>
        {listMenu ? (
          <ul className="navbarToggleMenu">
            <li className="navbarToggleMenuItem">
              <i>
                {" "}
                <FontAwesomeIcon icon="user" />
              </i>
              <span>Profile</span>
            </li>
            <li className="navbarToggleMenuItem">
              <i>
                {" "}
                <FontAwesomeIcon icon="dumbbell" />
              </i>
              <span>Trainings</span>
            </li>
            <li className="navbarToggleMenuItem">
              <i>
                {" "}
                <FontAwesomeIcon icon="cog" />
              </i>
              <span>Settings</span>
            </li>
            <li className="navbarToggleMenuItem">
              <i>
                {" "}
                <FontAwesomeIcon icon="sign-out-alt" color="red" />
              </i>
              <span style={{ color: "red" }}>Logout</span>
            </li>
          </ul>
        ) : null}
      </div>
      <Link
        className="mobileHide"
        to="profile"
        style={{ textDecoration: "none" }}
      >
        <div className="userContainer">
          <img src={avatar} alt="avatar" /> <h1>{user.username}</h1>
        </div>
      </Link>
      <div className="menu">
        <div
          className="addTraining"
          onClick={() => {
            toggleShowModal(true);
          }}
        >
          <i>
            <FontAwesomeIcon icon="plus-circle" />
          </i>
          <strong>New Training</strong>
        </div>
        <div className="fillMenuContainer">{fillMenu()}</div>
        <div className="options">
          <div className="settings">
            <i>
              <FontAwesomeIcon icon="cog" />
            </i>
            <span>Settings</span>
          </div>
          <div
            className="logout"
            onClick={() => {
              logout();
            }}
          >
            <i>
              <FontAwesomeIcon icon="sign-out-alt" />
            </i>
            <span>Logout</span>
          </div>
        </div>
      </div>
      <Modal showModal={showModal} toggleShowModal={toggleShowModal}>
        <form
          onSubmit={e => {
            e.preventDefault();
            createTraining(NTinput);
            getTrainings();
            toggleShowModal(false);
            setNTinput("");
          }}
        >
          <label htmlFor="NTinput">Training Name:</label>
          <input
            type="text"
            id="NTinput"
            name="NTinput"
            value={NTinput}
            onChange={e => {
              setNTinput(e.target.value);
            }}
          />

          <button className="subBut" type="submit">
            {" "}
            Add New Training
          </button>
        </form>
      </Modal>
    </div>
  );
};

const mapState = state => ({
  isLogged: state.auth.isLogged,
  user: state.auth.user,
  trainingsList: state.trainings.trainingsList,
  activeTraining: state.trainings.activeTraining
});

const mapDispatch = {
  logout,
  getTrainings,
  createTraining,
  getActiveTraining,
  deleteTraining
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  getTrainings: PropTypes.func.isRequired,
  createTraining: PropTypes.func.isRequired,
  getActiveTraining: PropTypes.func.isRequired,
  deleteTraining: PropTypes.func.isRequired,
  isLogged: PropTypes.bool,
  user: PropTypes.object,
  trainingsList: PropTypes.array,
  activeTraining: PropTypes.object
};

export default connect(mapState, mapDispatch)(Navbar);
