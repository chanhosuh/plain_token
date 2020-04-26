import React from "react";
import styles from "./ControlButton.module.sass";

const ControlButton = props => {
  return (
    <button className={styles.button} onClick={props.onClick}>
      {props.children}
    </button>
  );
};

export default ControlButton;
