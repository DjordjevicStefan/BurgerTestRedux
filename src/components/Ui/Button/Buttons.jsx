import React from "react";

import styles from "./Buttons.module.css";

export default function Button(props) {
  return (
    <button
      disabled={props.disabled}
      className={styles.Button + " " + styles[props.btnType]}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
}
