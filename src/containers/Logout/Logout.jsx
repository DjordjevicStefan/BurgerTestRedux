import React, { Component } from "react";
import { connect } from "react-redux";
import * as actionCreators from "../../store/actions/allActions";
import { Redirect } from "react-router-dom";

export class Logout extends Component {
  ///// Zar se ovo ne okida posle rendera ?  ?  ? ? ? ?
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/"></Redirect>;
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onLogout: () => dispatch(actionCreators.logout())
  };
};

export default connect(null, mapDispatchToProps)(Logout);
