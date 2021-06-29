import React, {useEffect} from 'react';
import {StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';
import {color} from 'react-native-reanimated';
import temp from '../../../utils/Temp.js';
import colors from '../../../utils/Themes/colors';

const SnackBar = props => {
  const {showSnackConfirmation, showConfirmation} = props;

  useEffect(() => {
    if (showSnackConfirmation.status == true) {
      setTimeout(() => {
        dismissSnack();
      }, 5000);
    }
  });

  const dismissSnack = () => {
    const payload = {
      status: false,
      message: null,
    };
    showConfirmation(payload);
  };

  return (
    <Snackbar
      style={{backgroundColor: colors.purple}}
      visible={showSnackConfirmation.status}
      onDismiss={() => dismissSnack()}>
      {showSnackConfirmation.message}
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default SnackBar;
