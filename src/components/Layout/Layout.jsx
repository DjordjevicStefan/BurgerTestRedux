import React, {Component} from 'react'

import Auxe from "../../hoc/Auxe"
import Toolbar from "../Navigation/Toolbar/Toolbar"
import SideDrawer from "../Navigation/SideDrawer/SideDrawer"

import styles from "./Layout.module.css"


export class  Layout extends Component {
  
  state = {
    showSideDrawer : false 
  }

  hadnleCloseBackdrop = () => {
     this.setState({
      showSideDrawer : false 
     })
  }

  handleToggleMenu = () => {
      this.setState((prevState)=>({
      showSideDrawer : !prevState.showSideDrawer
    }))
  }

  
  render() {
     
    return (
      <Auxe>
      <Toolbar toggleMenu={this.handleToggleMenu} />
      <SideDrawer showSideDrawer={this.state.showSideDrawer} closeBackdrop={this.hadnleCloseBackdrop} />
        <main className={styles.topMargin}>
           {this.props.children}
        </main>
      </Auxe>
      
    )
  }

 
}



export default Layout ;
