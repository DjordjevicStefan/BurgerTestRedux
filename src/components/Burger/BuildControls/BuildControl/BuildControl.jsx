import React from "react";

import styles from "./BuildControl.module.css";

export default function BuildControl(props) {
  return (
    <div className={styles.contolWrapper}>
      <span className={styles.label}>{props.label}</span>
      <button className={styles.less} onClick={props.onRemove} disabled={(props.disableCheck === 0 ? true : false )}>less</button>
      <button className={styles.more} onClick={props.onAdd}>more</button>
    </div>
  );
}
