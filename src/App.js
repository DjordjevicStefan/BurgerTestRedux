import React from 'react';

import Layout from "./components/Layout/Layout"
import BurgerBuilder from "../src/containers/BurgerBuilder/BurgerBuilder"
import Checkout from "../src/containers/Checkout/Checkout" ;
import Orders from "../src/containers/Orders/Orders" ;
import Logout from "../src/containers/Logout/Logout" ;
import {Route , Switch} from "react-router-dom" ;
import Auth from "./containers/Auth/Auth" ;


function App() {
  return (
    <div >
      <Layout>
        <Switch>
        <Route path="/checkout" component={Checkout} /> 
        <Route path="/orders" component={Orders} /> 
        <Route path="/auth" exact component={Auth} /> 
        <Route path="/logout" exact component={Logout} /> 
        <Route path="/" exact component={BurgerBuilder} /> 
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
