import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { showConfirmation } from "../../../redux/Toast/actions";
import SnackBar from "./SnackBar";

class SnackBarContainer extends Component {
  render() {
    return <SnackBar {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    showSnackConfirmation: state.toastReducer.showSnackConfirmation,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    showConfirmation: bindActionCreators(showConfirmation, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(SnackBarContainer);
