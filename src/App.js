import React, {component, Component} from 'react';

import { connect } from "react-redux"

import Layout from "./components/Layout/Layout"
import BurgerBuilder from "../src/containers/BurgerBuilder/BurgerBuilder"
import Checkout from "../src/containers/Checkout/Checkout" ;
import Orders from "../src/containers/Orders/Orders" ;
import Logout from "../src/containers/Logout/Logout" ;
import {Route , Switch , withRouter , Redirect} from "react-router-dom" ;
import Auth from "./containers/Auth/Auth" ;
import * as actionCreators from "../src/store/actions/allActions" ;


class App extends Component {

  componentDidMount() {
     this.props.onRefresh() ;
  }
   
  render() {

    let routes = (
      <Switch>
      <Route path="/auth" exact component={Auth} /> 
      <Route path="/" exact component={BurgerBuilder} /> 
      <Redirect to="/" />
      </Switch>
    )
    
    if (this.props.isAuthenticated) {
     routes = (
      <Switch>
      <Route path="/checkout" component={Checkout} /> 
      <Route path="/orders" component={Orders} /> 
      <Route path="/logout" component={Logout} /> 
      <Route path="/auth" exact component={Auth} /> 
      <Route path="/" exact component={BurgerBuilder} /> 
      <Redirect to="/" />
      </Switch>
     )   
    }



    return (
      <div >
        <Layout>
           {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated : state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onRefresh : () => dispatch(actionCreators.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
