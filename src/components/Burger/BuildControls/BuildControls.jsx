import React from "react";

import styles from "./BuildControls.module.css";

import BuildControl from "./BuildControl/BuildControl";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" }
];

export default function BuildControls(props) {
  // const {  } = props ;

  return (
    <div className={styles.BuildControlsWrapper}>
      <p>Burger total price : {props.totalPrice.toFixed(1)} &#36;</p>
      {controls.map(contr => (
        <BuildControl
          disableCheck={props.currentIngState[contr.type]}
          label={contr.label}
          key={contr.type}
          onAdd={() => props.onAdd(contr.type)}
          onRemove={() => props.onRemove(contr.type)}
        />
      ))}
      <button
        onClick={props.showModal}
        disabled={!props.orderBtnState}
        className={styles.OrderButton}
      >
        {props.isAuthenticated ? "Order now" : "Sign in"}
      </button>
    </div>
  );
}
