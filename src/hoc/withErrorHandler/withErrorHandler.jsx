import React, { Component } from "react";

import Modal from "../../components/Ui/Modal/Modal";
import Auxe from "../Auxe";

function withErrorHandler(WrappedComponent, axios) {
  return class extends Component {
    constructor(props) {
      super(props);
      this.state = {
         error: null
       };
       this.reqInterseptor = axios.interceptors.request.use(req => {
         this.setState({error: null});
         return req;
        });
         this.responseInterseptor = axios.interceptors.response.use(res => res, error => {
         this.setState({error: error});
       });
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInterseptor);
      axios.interceptors.response.eject(this.responseInterseptor);
    }

  

    handleErrorMsg = () => {
      this.setState({ error: false });
    };

    render() {
      return (
        <Auxe>
          <Modal
            showModal={this.state.error}
            closeBackdrop={this.handleErrorMsg}
          >
            { this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </Auxe>
      );
    }
  };
}

export default withErrorHandler;
