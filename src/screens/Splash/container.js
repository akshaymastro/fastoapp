import React, {Component} from 'react';
import Splash from './Splash';
import {connect, useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticateUser} from '../../redux/auth/actions';

class SplashScreen extends Component {
  render() {
    return <Splash {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
