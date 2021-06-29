import React from 'react';
import {ActivityIndicator, Modal, View} from 'react-native';
import {connect} from 'react-redux';
import {Colors} from '../../../utils/Themes';

class AppLoader extends React.Component {
  render() {
    if (!this.props.loading) return null;

    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)',
        }}>
        <View
          style={{
            backgroundColor: '#ffffff',
            width: 80,
            height: 80,
            justifyContent: 'center',
            borderRadius: 5,
          }}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log('checking state :: ', state);
  return {
    loading: state.common.loading,
    isOnline: state.network.isOnline,
  };
}

export default connect(mapStateToProps)(AppLoader);
