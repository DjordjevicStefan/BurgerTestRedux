import React from "react";

import styles from "./NavigationItems.module.css";

import NavigationItem from "../../Navigation/NavigationItems/NavigationItem/NavigationItem";

const NavigationItems = props => {
  return (
    <ul className={styles.NavigationItems}>
      <NavigationItem link={"/"} exact>
        Burger Builder
      </NavigationItem>
      {props.isAuthenticated ? <NavigationItem link={"/orders"}>Orders</NavigationItem> : null }
      

      {props.isAuthenticated ? (
        <NavigationItem link={"/logout"}>Logout</NavigationItem>
      ) : (
        <NavigationItem link={"/auth"}>Login</NavigationItem>
      )}
    </ul>
  );
};

export default NavigationItems;
