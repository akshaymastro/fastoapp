import React from 'react';
import {
  KeyboardAvoidingView,
  Text,
  TouchableOpacity,
  ImageBackground,
  StatusBar,
  View,
} from 'react-native';
import {heights as DHeight} from '../../common/heights';
import OTPInputView from '../../common/components/OtpInput';
import styles from './styles';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {verifyOtpHandler} from '../../redux/auth/actions';
import {saveApiToken} from '../../redux/common/actions';

const image = require('../../assets/backgroundSmall.png');

const dafaultTime = 29;

class PhoneVerify extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enteredOtp: '',
      verifyBtnDisabled: false,
      resendBtnDisabled: false,
      resendTimer: dafaultTime,
      countryCode: '',
      mobileNumber: '',
      formattedNumber: '',
      isLoading: false,
      errorMessage: '',
      successMessage: '',
      mobileNumber: '',
    };
  }

  componentDidMount() {
    console.log('checking props :: ', this.props);
    this.setState({mobileNumber: this.props.route.params.mobileNumber});
    this.resetTimer();
  }

  formatPhoneNumber = number => {
    let newText = '';
    let cleaned = ('' + number).replace(/\D/g, '');
    for (var i = 0; i < cleaned.length; i++) {
      if (i == 2) {
        newText = newText + ' ';
      } else if (i == 6) {
        newText = newText + ' ';
      }
      newText = newText + cleaned[i];
    }
    return newText;
  };

  handleBack = () => {
    // goBack();
  };

  onCodeChange = code => {
    if (code.length == 6) {
      this.setState({verifyBtnDisabled: true});
      this.onVerifyPhoneNumber();
    } else {
      this.setState({verifyBtnDisabled: false, errorMessage: ''});
    }
  };

  countdownTimer() {
    clearInterval(this.timer);
    const {resendTimer} = this.state;
    this.timer = setInterval(() => {
      if (!resendTimer || this.state.resendTimer <= 1) {
        this.clearTimer();
        return false;
      }
      this.setState(prevState => {
        return {resendTimer: prevState.resendTimer - 1};
      });
    }, 1000);
  }

  clearTimer = () => {
    this.setState({resendBtnDisabled: false});
    clearInterval(this.timer);
  };

  resetTimer = () => {
    this.setState({resendBtnDisabled: true, resendTimer: dafaultTime}, () => {
      this.countdownTimer();
    });
  };

  onVerifyPhoneNumber = () => {
    const request = {
      country_code: this.state.countryCode,
      phone: this.state.mobileNumber,
      code: this.state.enteredOtp,
    };

    this.setState({isLoading: true, errorMessage: ''});
    this.props.verifyOtpApiCheck(
      request,
      result => {
        this.setState({isLoading: false, errorMessage: ''});
        if (result.status === 'success') {
          // LocalStorage.save('isLoggedIn', true);
          this.props.navigation.navigate('Explore', {locationData: ''});
        } else {
          this.setState(
            {isLoading: false, errorMessage: result.message},
            () => {},
          );
        }
      },
      () => {
        this.setState({
          isLoading: false,
          errorMessage: 'Something went wrong. Try again.',
        });
      },
    );
    this.resetTimer();
  };

  onResendPress = () => {
    const request = {
      country_code: this.state.countryCode,
      phone: this.state.mobileNumber,
    };

    this.setState({errorMessage: '', enteredOtp: ''});
    this.props.loginApiPhoneCheck(request, result => {
      if (result.status === 'success') {
        this.setState({
          successMessage: 'Verification code resent successfully.',
        });
        setTimeout(() => {
          this.setState({successMessage: ''});
        }, 3000);
      }
    });
    this.resetTimer();
  };

  otpHandler = code => {
    const {mobileNumber} = this.state;
    // alert(`your code is ${code} and this step is in progress`);
    const payload = {
      Mobile: parseInt(mobileNumber),
      Otp: parseInt(code),
    };
    console.log('checking payload :: ', payload);
    this.props.verifyOtpHandler(payload, res => {
      if (res.responseCode == 200) {
        if (!res.data.is_profileUpdated) {
          this.props.saveApiToken(res.data.token);
          this.props.navigation.navigate('ProfileUpdate');
        } else {
          this.props.navigation.navigate('HomeDrawer');
        }
      } else {
        alert('Please fill correct otp');
      }
      console.log('res from verify api :: ', res);
    });
  };

  render() {
    const {
      resendTimer,
      resendBtnDisabled,
      countryCode,
      errorMessage,
      formattedNumber,
      successMessage,
    } = this.state;
    const remainingTime = resendTimer <= 9 ? `0${resendTimer}` : resendTimer;
    return (
      <View style={styles.container}>
        <StatusBar backgroundColor="#222546" barStyle="light-content" />
        <KeyboardAvoidingView
          behavior={Platform.OS == 'ios' ? 'padding' : 'padding'}
          enabled
          keyboardVerticalOffset={0}
          style={{
            flexGrow: 1,
          }}>
          <ImageBackground source={image} style={styles.image}>
            <View style={{paddingHorizontal: 20}}>
              <View style={styles.toolbarContainer}>
                <TouchableOpacity onPress={this.handleBack}></TouchableOpacity>
              </View>
              <Text style={{fontSize: 20, color: 'white'}}>
                {'Verify your phone number'}
              </Text>
              <Text
                style={{fontSize: 20, color: 'white', marginTop: DHeight(8)}}>
                {`We have sent you an SMS with a code to number ${countryCode} ${formattedNumber}`}
              </Text>
              <OTPInputView
                style={styles.containerStyle}
                pinCount={5}
                keyboardType={'number-pad'}
                onCodeChanged={this.onCodeChange}
                autoFocusOnLoad
                codeInputFieldStyle={styles.underlineStyleBase}
                codeInputHighlightStyle={styles.underlineStyleHighLighted}
                bgSelectedColor={'#ffaf54'}
                bgUnselectedColor={'white'}
                onCodeFilled={code => {
                  this.otpHandler(code);
                }}
              />
              {errorMessage ? (
                <Text style={[{fontSize: 18, color: 'red'}]}>
                  {errorMessage}
                </Text>
              ) : null}
              {successMessage ? (
                <Text style={[{fontSize: 18, color: 'black'}]}>
                  {successMessage}
                </Text>
              ) : null}
              <View style={{marginTop: DHeight(12)}}>
                {resendBtnDisabled ? (
                  <Text
                    style={{
                      fontSize: 18,
                      color: 'white',
                      marginVertical: DHeight(20),
                    }}>
                    Resend code in{' '}
                    <Text
                      style={{
                        fontSize: 18,
                        color: 'white',
                      }}>{` 00:${remainingTime} `}</Text>
                  </Text>
                ) : (
                  <TouchableOpacity onPress={this.onResendPress}>
                    <Text
                      style={[
                        {
                          fontSize: 18,
                          color: 'white',
                          marginVertical: DHeight(20),
                          textAlign: 'center',
                        },
                      ]}>
                      {'Resend'}
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </ImageBackground>
        </KeyboardAvoidingView>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => ({
  verifyOtpHandler: bindActionCreators(verifyOtpHandler, dispatch),
  saveApiToken: bindActionCreators(saveApiToken, dispatch),
  // verifyOtpApiCheck: bindActionCreators(verifyOtpApi, dispatch),
  // loginApiPhoneCheck: bindActionCreators(loginApiPhoneCheck, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PhoneVerify);
