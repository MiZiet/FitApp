import React, { useState, useEffect } from "react";
import { connect, useDispatch } from "react-redux";
import PropTypes from "prop-types";
import "./Trainings.css";
import Moment from "react-moment";

import { setMsg } from "../../actions/msg";
import {
  getActiveTraining,
  addExercise,
  deleteTraining,
  addSet,
  saveTraining,
  deleteExercise
} from "../../actions/trainings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Modal from "../layout/Modal";
import SingleTraining from "./SingleTraining";

const Trainings = ({
  trainingsList,
  addExercise,
  deleteTraining,
  addSet,
  activeTraining,
  saveTraining,
  deleteExercise,
  setMsg
}) => {
  const [trainingData, setTrainingData] = useState({
    name: "",
    user: "",
    date: "2020-03-16T15:56:42.242+00:00",
    exercise: []
  });

  const [showModal, toggleShowModal] = useState(false);

  const [TNinput, setTNinput] = useState("");

  //set item active on load && item ADD/DELETE
  const dispatch = useDispatch();
  useEffect(() => {
    trainingsList.length > 0 &&
      dispatch(getActiveTraining(trainingsList[0]._id));
  }, [trainingsList]);

  useEffect(() => {
    trainingsList.length > 0 && setTrainingData(activeTraining);
  }, [activeTraining]);

  const stMap = () => {
    if (
      trainingData &&
      trainingData.name !== undefined &&
      trainingData !== undefined
    ) {
      return trainingData.exercise.map((stData, index) => {
        return (
          <SingleTraining
            addSet={() => {
              addSet(index);
            }}
            deleteExercise={() => {
              deleteExercise(index);
            }}
            name={stData.exerciseName}
            series={stData.series}
            key={index}
            index={index}
          />
        );
      });
    }
  };
  /* const stMap = () => {
    if (
      activeTraining &&
      activeTraining.name !== undefined &&
      activeTraining !== undefined
    ) {
      return activeTraining.exercise.map((stData, index) => {
        return (
          <SingleTraining
            addSet={() => {
              addSet(index);
            }}
            deleteExercise={() => {
              deleteExercise(index);
            }}
            name={stData.exerciseName}
            series={stData.series}
            key={index}
            index={index}
          />
        );
      });
    }
  };*/

  return (
    <>
      <div className="trainingsContainer">
        <div className="trainingsHeader">
          <h1>{trainingData.name}</h1>
          <span>
            <Moment format="DD/MM/YYYY">{trainingData.date}</Moment>
          </span>
        </div>
        <div className="trainingFooter">
          <button
            onClick={() => {
              toggleShowModal(!showModal);
            }}
          >
            <i className="iconPlus">
              <FontAwesomeIcon icon="plus-circle" />
            </i>{" "}
            <span className="tooltip">Add Exercise</span>
          </button>
          <button
            title="popup text"
            onClick={() => {
              saveTraining(activeTraining);
            }}
          >
            <i className="iconPlus">
              <FontAwesomeIcon icon="save" />
            </i>{" "}
            <span className="tooltip">Save Training</span>
            {/*//Save Training*/}
          </button>
          <button
            onClick={id => {
              deleteTraining(trainingData._id);
            }}
          >
            <i className="iconPlus">
              <FontAwesomeIcon icon="times-circle" />
            </i>{" "}
            <span className="tooltip">Delete Training</span>
            {/*Delete Training*/}
          </button>
        </div>
        <div className="trainingsContent">{stMap()}</div>
      </div>
      {/*
      Add New Exercise Modal
      */}
      <Modal showModal={showModal} toggleShowModal={toggleShowModal}>
        <form
          onSubmit={e => {
            e.preventDefault();
            addExercise(TNinput);
            toggleShowModal(false);
            setTNinput("");
          }}
        >
          <label htmlFor="TNinput">Exercise Name:</label>
          <input
            type="text"
            id="TNinput"
            name="TNinput"
            value={TNinput}
            onChange={e => {
              setTNinput(e.target.value);
            }}
          />

          <button className="subBut" type="submit">
            {" "}
            Add New Exercise
          </button>
        </form>
      </Modal>
    </>
  );
};

const mapDispatch = {
  getActiveTraining,
  addExercise,
  deleteTraining,
  addSet,
  saveTraining,
  deleteExercise,
  setMsg
};

const mapState = state => ({
  trainingsList: state.trainings.trainingsList,
  activeTraining: state.trainings.activeTraining
});

Trainings.propTypes = {
  trainingsList: PropTypes.array,
  getActiveTraining: PropTypes.func.isRequired,
  addExercise: PropTypes.func.isRequired,
  deleteTraining: PropTypes.func.isRequired,
  addSet: PropTypes.func.isRequired,
  activeTraining: PropTypes.object,
  saveTraining: PropTypes.func.isRequired,
  deleteExercise: PropTypes.func.isRequired,
  setMsg: PropTypes.func.isRequired
};

export default connect(mapState, mapDispatch)(Trainings);
