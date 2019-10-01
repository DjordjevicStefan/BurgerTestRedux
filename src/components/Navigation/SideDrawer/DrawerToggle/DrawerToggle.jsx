import React from 'react';

import styles from "./DrawerToggle.module.css"

export default function DrawerToggle(props) {
  return (
    <div className={styles.DrawerToggle} onClick={props.toggleMenu}>
       <div></div>
       <div></div>
       <div></div>
    </div>
  )
}
