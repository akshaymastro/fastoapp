import React, {Component} from 'react';
import InviteEarn from '../InviteEarn';
import {connect, useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticateUser} from '../../redux/auth/actions';

class InviteEarnContainer extends Component {
  render() {
    return <InviteEarn {...this.props} />;
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
export default connect(mapStateToProps, mapDispatchToProps)(InviteEarnContainer);
