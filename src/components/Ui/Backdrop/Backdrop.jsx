import React from 'react'

import styles from "./Backdrop.module.css"

export default function Backdrop(props) {
  return (
    props.showBackdrop ? <div className={styles.Backdrop} onClick={props.closeBackdrop}>  </div> : null 
  )
}
