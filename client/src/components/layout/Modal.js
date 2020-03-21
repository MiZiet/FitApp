import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Modal = ({ showModal, children, toggleShowModal }) => (
  <div className={showModal ? "modal display-block" : "modal display-none"}>
    <section className="modal-main">
      <button
        className="closeButton"
        onClick={() => {
          toggleShowModal(false);
        }}
      >
        <i>
          <FontAwesomeIcon icon="times" />
        </i>
      </button>
      {children}
    </section>
  </div>
);

export default Modal;
