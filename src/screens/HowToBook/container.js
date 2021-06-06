import React, {Component} from 'react';
import HowToBook from './HowToBook';
import {connect, useSelector, useDispatch} from 'react-redux';
import {bindActionCreators} from 'redux';
import {authenticateUser} from '../../redux/auth/actions';

class HowToBookContainer extends Component {
  render() {
    return <HowToBook {...this.props} />;
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.network.isOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
   // authenticateUser: bindActionCreators(authenticateUser, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(HowToBookContainer);
