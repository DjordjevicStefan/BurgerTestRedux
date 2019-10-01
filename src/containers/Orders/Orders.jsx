import React, { Component } from "react";

import Order from "../../components/Order/Order";

import axios, { getOrders } from "../../services/orders";
import Spinner from "../../components/Ui/Spinner/Spinner";

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler" ;

export class Orders extends Component {
  state = {
    load: true,
    orders: null
  };

  componentDidMount() {
    getOrders()
      .then(res => {
        console.log("res", res.data);
        let ordersArr = [];
        for (const order in res.data) {
          ordersArr.push({ ...res.data[order], key: order });
        }
        this.setState({
          load: false,
          orders: ordersArr
        });
      })
      .catch(err => {
        this.setState({
          load: false,  
        });
      });
  }

  render() {
    let orders = null;
    if (this.state.load) {
      orders = <Spinner />;
    } else {
      orders = (
        <>
        
          {this.state.orders.map(order => {
            return (
              <Order
                key={order.key}
                price={order.price}
                ingredients={order.ingredients}
              />
            );
          })}
        </>
      );
    }

    return <div>{orders}</div>;
  }
}

export default withErrorHandler(Orders, axios)
