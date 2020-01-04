import React, { Component } from "react";

import Order from "../../components/Order/Order";

import axios from "../../services/orders";
import Spinner from "../../components/Ui/Spinner/Spinner";

import { connect } from "react-redux"

import { fetchOrders } from "../../store/actions/allActions"

import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler" ;

export class Orders extends Component {
  state = {
    load: true,
    orders: null
  };

  componentDidMount() {

     this.props.fetchOrders()
    
    /// stari kod bez async poziva u actionCreators 
     
    // getOrders()
    //   .then(res => {
    //     console.log("res", res.data);
    //     let ordersArr = [];
    //     for (const order in res.data) {
    //       ordersArr.push({ ...res.data[order], key: order });
    //     }
    //     this.setState({
    //       load: false,
    //       orders: ordersArr
    //     });
    //   })
    //   .catch(err => {
    //     this.setState({
    //       load: false,  
    //     });
    //   });
  }

  render() {
    let orders = null;
    if (this.props.load) {
      orders = <Spinner />;
    } else {
      orders = (
        <>
        
          {this.props.orders.map(order => {
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

const mapStateToProps = (state) => {
  return {
    load : state.orders.load, 
    orders : state.orders.orders
  }
}


const mapDispatchToProps = dispatch => {
  return {
      fetchOrders : () => dispatch(fetchOrders()) 
  }
}

export default  connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios)) ;
