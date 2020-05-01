import React from "react";
import styles from "./ControlButton.module.sass";

const ControlButton = (props) => {
  if (!props.disabled)
    return (
      <button className={styles.button} onClick={props.onClick}>
        {props.children}
      </button>
    );
  else
    return (
      <button disabled className={styles.button}>
        {props.children}
      </button>
    );
};

export default ControlButton;
