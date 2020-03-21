import React, { useState } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import "./layout.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Msg = ({ msgs }) => {
  /*const [msg, setMsg] = useState([
    {
      warning: true,
      content: "sdadadasdad asdadasd dasdasda"
    },
    {
      warning: false,
      content: "sadasdaddasdad  sdssdsd ddd asdsdsadasd dasdasda"
    }
  ]);*/

  const SingleMsg = props => (
    <div
      className={
        props.warning ? "singleMsg warningMsg" : "singleMsg informationMsg"
      }
    >
      <i>
        {" "}
        <FontAwesomeIcon icon="exclamation-circle" />
      </i>
      {props.content}
    </div>
  );
  const singleMsgMap = () => {
    if (msgs !== null && msgs.length > 0) {
      return msgs.map(msg => {
        return (
          <SingleMsg warning={msg.warning} content={msg.content} key={msg.id} />
        );
      });
    }
  };

  return <div className="msgContainer"> {singleMsgMap()} </div>;
};

Msg.propTypes = {
  msgs: PropTypes.array.isRequired
};

const mapState = state => ({
  msgs: state.msg
});

export default connect(mapState, null)(Msg);
