import React, { Component } from "react";

import styles from "./Burger.module.css";

import Auxe from "../../hoc/Auxe";
import { connect } from "react-redux";
import * as burgerBuilderActions from "../../store/actions/allActions";

import { makeOrder, getIngredients } from "../../services/orders";
import Axios from "../../services/orders";

import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/Ui/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/Ui/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

export class BurgerBuilder extends Component {
  state = {
    // ingredients: null,
    // totalPrice: 1,
    // orderBtnState: false,
    showModal: false
    // loading: false,
    // error : false
  };

  componentDidMount() {
    this.props.initialIngredients();

    // getIngredients()
    //  .then( response => {
    //         console.log("response data", response.data );

    //        this.setState({ingredients : response.data})
    //  } ).catch(error => {
    //        this.setState({error : error})
    //  })
  }

  handleShowModal = () => {
    this.setState({
      showModal: true
    });
  };

  hadnleHideModal = () => {
    this.setState({
      showModal: false
    });
  };

  handleContinueOrder = () => {
    ///////===== deo koda koji je obrisan sa queryParams je bitan ako hocemo da imamo u url tacno varijable od kojih je sastavljeno nesto na drugoj strnici.

    // const queryParams = [] ;
    /////===== pravimo prihvatljiv string da bi mogli kroz URL da ga posaljemo u komponentu kojoj te info trebaju a koja se renderuje iz odgovarajuceg Routa
    // for (const i in this.props.ing) {
    //     queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.props.ing[i]) )
    // }

    ////==== ["bacon=1", "cheese=1", "meat=0", "salad=0"]
    // console.log(queryParams);

    ////===== da bi ga dodali u adresu to jest moramo ovakav arej da spojimo sa & !!
    //  const queryString = queryParams.join("&") ;

    this.props.history.replace({
      pathname: "/checkout"
      // search : "?" + queryString ,
      // state: { totalPrice: this.state.totalPrice }
    });
    //////// ===== checkout?bacon=1&cheese=1&meat=0&salad=0
  };

  updateOrderBtnState = ingredientsPreSetState => {
    const ingredientsNumbers = Object.values(ingredientsPreSetState);
    const sum = ingredientsNumbers.reduce((accu, currentValue) => {
      return accu + currentValue;
    });

    return sum > 0;
  };

  // addIngredientHandler = type => {
  //   const ingredientsCopy = { ...this.props.ing };
  //   ingredientsCopy[type] = ingredientsCopy[type] + 1;

  //   const newTotalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];

  //   this.setState({
  //     ingredients: ingredientsCopy,
  //     totalPrice: newTotalPrice
  //   });

  //   this.updateOrderBtnState(ingredientsCopy);
  // };

  // removeIngredientHandler = type => {
  //   const ingredientsCopy = { ...this.props.ing };
  //   if (ingredientsCopy[type] <= 0) {
  //     return;
  //   }

  //   ingredientsCopy[type] = ingredientsCopy[type] - 1;
  //   const newTotalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];

  //   this.setState({
  //     ingredients: ingredientsCopy,
  //     totalPrice: newTotalPrice
  //   });

  //   this.updateOrderBtnState(ingredientsCopy);
  // };

  render() {
    let burger = this.props.error ? <p>Network error</p> : <Spinner />;

    if (this.props.ing) {
      burger = (
        <Auxe>
          {/* {console.log("ing ing",this.state.ingredients)} */}
          <Burger ingredients={this.props.ing} />
          <BuildControls
            totalPrice={this.props.tprice}
            currentIngState={this.props.ing}
            onAdd={this.props.addIngredientHandler}
            onRemove={this.props.removeIngredientHandler}
            orderBtnState={this.updateOrderBtnState(this.props.ing)}
            showModal={this.handleShowModal}
          />
        </Auxe>
      );
    }

    let order;

    if (this.props.ing) {
      order = (
        <OrderSummary
          totalPrice={this.props.tprice}
          cancelOrder={this.hadnleHideModal}
          continuedOrder={this.handleContinueOrder}
          ingredients={this.props.ing}
        />
      );
    }
    if (this.props.loading) {
      order = <Spinner />;
    }

    return (
      <Auxe>
        <Modal
          showModal={this.state.showModal}
          closeBackdrop={this.hadnleHideModal}
        >
          {order}
        </Modal>
        {burger}
      </Auxe>
    );
  }
}

const mapStateToProps = state => {
  return {
    ing: state.ingredients,
    tprice: state.totalPrice,
    loading: state.loading,
    error: state.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addIngredientHandler: ingName =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    removeIngredientHandler: ingName =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    initialIngredients: () => dispatch(burgerBuilderActions.initIngredients())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, Axios));
