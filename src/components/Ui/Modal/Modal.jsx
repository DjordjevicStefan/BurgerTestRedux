import React from "react";

import styles from "./Modal.module.css";
import Auxe from "../../../hoc/Auxe";
import Backdrop from "../Backdrop/Backdrop";

function Modal(props) {
  const { showModal } = props;

  return (
    <Auxe>
      {console.log("test")}

      <Backdrop showBackdrop={showModal} closeBackdrop={props.closeBackdrop} />
      <div
        className={
          showModal ? styles.ModalShow + " " + styles.Modal : styles.Modal
        }
      >
        {props.children}
      </div>
    </Auxe>
  );
}

export default Modal;
