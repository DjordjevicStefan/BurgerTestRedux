import React, { Component } from "react";

import { Route , Redirect} from "react-router-dom";

import { connect } from "react-redux"

import styles from "./Checkout.module.css";
import CheckoutSummary from "../../components/Order/CheckoutSummary";
import Spinner from "../../components/Ui/Spinner/Spinner";

import query from "query-string";
import ContactData from "./ContactData/ContactData";

export class Checkout extends Component {
  state = {
   
    load: false
  };

  componentDidMount() {
    
    
    this.setState({
      // ingredients: query.parse(this.props.location.search),
      // totalPrice : this.props.location.state ,
      load: true
    });
  }

  handleCheckoutCancel = () => {
    this.props.history.push("/");
  };

  handleCheckoutContinue = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let redirect = null ;

    //// ridajrektujemo i ako nema propsa ,za svaki slucaj , i ako je prosao req za formu kako treba u bazu- za njega vezan ovaj prop finished
    if (!this.props.ing || this.props.finished) {
      redirect = <Redirect to="/"/>
    }

    let checkout = null;
    if (this.state.load) {
      checkout = (
        <> 
          
          <CheckoutSummary
            cancelOrder={this.handleCheckoutCancel}
            continueOrder={this.handleCheckoutContinue}
            ingredients={this.props.ing}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </>
      );
    } else {
      checkout = <Spinner />;
    }

    return (
      <div>
        {redirect}
        {checkout}
        {/* {console.log("lokacija stizanja do ovde", this.props)} */}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing : state.burgerBuilder.ingredients,
    tprice : state.burgerBuilder.totalPrice,
    finished : state.orders.finished
  }
}

export default  connect(mapStateToProps)(Checkout);
