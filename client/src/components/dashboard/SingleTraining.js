import React, { useState } from "react";

import PropTypes from "prop-types";
import { connect, useDispatch } from "react-redux";

import { addSet } from "../../actions/trainings";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Modal from "../layout/Modal";
import "./Trainings.css";

const SingleTraining = props => {
  const dispatch = useDispatch();
  const [showNewSetModal, toggleShowNewSetModal] = useState(false);
  const [newSet, setNewSet] = useState({
    NSreps: 1,
    NSweight: 1
  });

  const { NSreps, NSweight } = newSet;
  const tableFill = () => {
    return props.series.map((set, index) => {
      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{set.reps}</td>
          <td>{set.weight}</td>
        </tr>
      );
    });
  };

  return (
    <>
      <div className="stElCont">
        <div className="stElement">
          <h1>{props.name}</h1>
          <table>
            <thead>
              <tr>
                <th></th>
                <th>Reps</th>
                <th>Weight</th>
              </tr>
            </thead>
            <tbody>{tableFill()}</tbody>
          </table>
        </div>
        <div className="stElButtons">
          <button
            onClick={() => {
              props.deleteExercise(props.index);
            }}
          >
            <i className="iconPlus">
              <FontAwesomeIcon icon="times" />
            </i>
          </button>
          <button>
            <i className="iconPlus">
              <FontAwesomeIcon icon="pen" />
            </i>
          </button>
          <button
            onClick={() => {
              toggleShowNewSetModal(true);
              /*props.addSet(props.index)*/
            }}
          >
            <i className="iconPlus">
              <FontAwesomeIcon icon="plus" />
            </i>
          </button>
        </div>
      </div>
      <Modal
        showModal={showNewSetModal}
        toggleShowModal={toggleShowNewSetModal}
      >
        <form
          onSubmit={e => {
            e.preventDefault();
            dispatch(addSet(props.index, newSet));
            toggleShowNewSetModal(false);
          }}
        >
          <label htmlFor="NSreps">Reps:</label>
          <input
            min="1"
            max="999"
            type="number"
            name="NSreps"
            value={NSreps}
            onChange={e => {
              setNewSet({ ...newSet, [e.target.name]: e.target.value });
            }}
          />
          <label htmlFor="NSweight">Weigth:</label>
          <input
            min="1"
            max="999"
            type="number"
            name="NSweight"
            value={NSweight}
            onChange={e => {
              setNewSet({ ...newSet, [e.target.name]: e.target.value });
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

SingleTraining.propTypes = {
  addSet: PropTypes.func.isRequired
};

export default connect(null, { addSet })(SingleTraining);
