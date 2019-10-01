import React from 'react'

import styles from "../Toolbar/Toolbar.module.css"

import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle"

export default function Toolbar(props) {


  return (
    <header className={styles.Toolbar}>
       <DrawerToggle toggleMenu={props.toggleMenu}/>
      <Logo height="80%" /> 
      <nav className={styles.DesktopOnly}>
      <NavigationItems />
      </nav>
      
    </header>
  )
}



