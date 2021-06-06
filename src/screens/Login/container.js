import React, {Component} from 'react';
import Login from './Login';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticateUser} from '../../redux/auth/actions';

class LoginContainer extends Component {
  render() {
    return <Login {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.network.isOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    authenticateUser: bindActionCreators(authenticateUser, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(LoginContainer);
