import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import NetInfo from "@react-native-community/netinfo";
import Navigation from "./Navigation";
import { networkReachability } from "./redux/network/actions";

class AppNavigator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSyncRunning: false,
    };
  }

  componentDidMount() {
    NetInfo.fetch().then((state) => {
      this.updateNetworkState(state);
    });
    this.unsubscribe = NetInfo.addEventListener((state) => {
      this.updateNetworkState(state);
    });
  }

  updateNetworkState = (state) => {
    let isConnected = state.isConnected;
    if (state && state.type && state.type == "cellular") {
      if (
        state &&
        state.details &&
        state.details.cellularGeneration &&
        state.details.cellularGeneration == "2g"
      ) {
        //|| state.details.cellularGeneration == '3g'
        isConnected = false;
      }
    }
    this.props.networkReachability(isConnected);
    // console.log('your internet connection status ', this.props.isOnline);
  };

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    // this.props.isOnline == undefined ?
    return <>{<Navigation {...this.props} />}</>;
  }
}

function mapStateToProps(state) {
  return {
    isOnline: state.network.isOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    networkReachability: bindActionCreators(networkReachability, dispatch),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigator);
