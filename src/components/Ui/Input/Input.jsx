import React from "react";

import styles from "./Input.module.css";

function Input(props) {
  let inputElement = null;

  let classesArrey = [styles.InputElement] ;
  
  //// testiramo da vidimo da li je dato polje validno ili ne, druga varijabla u kondicinalu je vezana za select input , on nema validaciju samim time ni prop pa ce biti nedefinisan to jest false. 
  //// dodajemo i trecu varijablu touched da bi proveru errora ili validacije krenuli samo kada je user promenio nesto u datom input polju.  
  let validationMassage = null ;
  if (!props.valid && props.validation && props.touched) {
    classesArrey.push(styles.Invalid) ;
    /// moze i ovde da se doda dodatna css klasa za izgled ove poruke
    validationMassage = <p>Please enter a valid {props.inputName}</p>
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={classesArrey.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          onChange={props.changed}
          {...props.elementConfig}
          className={classesArrey.join(" ")}
          value={props.value}
        />
      );
      break;

    case "select":
      inputElement = (
        <select
          className={classesArrey.join(" ")}
          value={props.value}
          onChange={props.changed}
        >
          {props.elementConfig.options.map(option => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;

    default:
      inputElement = (
        <input
          className={classesArrey.join(" ")}
          {...props.elementConfig}
          value={props.value}
          onChange={props.changed}
        />
      );
      break;
  }

  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
      {validationMassage}
    </div>
  );
}

export default Input;
