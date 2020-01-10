import React from "react";

import style from "./SideDrawer.module.css";

import Logo from "../../../components/Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Backdrop from "../../Ui/Backdrop/Backdrop";
import Auxe from "../../../hoc/Auxe";

const SideDrawer = props => {
  


  return (
    <Auxe>
      <Backdrop showBackdrop={props.showSideDrawer} closeBackdrop={props.closeBackdrop} />
      <div onClick={props.closeBackdrop} className={style.SideDrawer + " " + (props.showSideDrawer ? style.Open : style.Close)} >
        <Logo height="12%" />

        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Auxe>
  );
};

export default SideDrawer;
