import React, {Component} from 'react';
import Support from '../Support';
import {connect, useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticateUser} from '../../redux/auth/actions';

class SupportScreen extends Component {
  render() {
    return <Support {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(SupportScreen);
