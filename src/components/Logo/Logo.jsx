import React from 'react';

import apkLogo from "../../assets/images/burger-logo.png" ;

import styles from "./Logo.module.css" 

function Logo(props) {
  return (
    <div className={styles.Logo} style={{height : props.height}}>
      <img src={apkLogo} alt=""/>
    </div>
  )
}

export default Logo ;
