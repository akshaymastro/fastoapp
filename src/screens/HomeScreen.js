import React, {Component} from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
} from 'react-native';
import {usetheme} from '@react-navigation/native';

import PassengerScreen from './PassengerScreen';
import DriverScreen from './DriverScreen';
import genericContainer from '../component/GenericContainer';
import Modal from 'react-native-modal';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {showHome} from '../redux/common/actions';

const DriverWithGenericContainer = genericContainer(DriverScreen);
const PassengerWithGenericContainer = genericContainer(PassengerScreen);

// const HomeScreen = ({navigation}) => {
class HomeScreen extends Component {
  state = {
    isVisible: false,
  };

  componentDidMount() {
    this.props.showHome(true);
  }

  displayModal(show) {
    this.setState({isVisible: show});
  }

  constructor(props) {
    super(props);
    this.state = {
      isDriver: false,
      isPassenger: false,
    };
  }

  render() {
    if (this.state.isDriver) {
      return <DriverWithGenericContainer />;
    }
    if (this.state.isPassenger) {
      return <PassengerWithGenericContainer />;
    }

    const {navigation} = this.props;

   // return <DriverWithGenericContainer {...this.props} />;

   return (<View> 
            <Button 
        title="Passenger"
        onPress={() => this.setState({ isPassenger: true })}
         />
        <Button
         title="Driver"
         onPress={() => this.setState({ isDriver: true })}
          />
          </View>)
  }
}

const mapStateToProps = state => {
  return {};
};

export const mapDispatchToProps = dispatch => ({
  showHome: bindActionCreators(showHome, dispatch),
  // verifyOtpApiCheck: bindActionCreators(verifyOtpApi, dispatch),
  // loginApiPhoneCheck: bindActionCreators(loginApiPhoneCheck, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const {height} = Dimensions.get('screen');
const height_logo = height * 0.18;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
  button: {
    display: 'flex',
    height: 40,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: 'orange',
    shadowColor: '#2AC062',
    shadowOpacity: 0.5,
    shadowOffset: {
      height: 10,
      width: 0,
    },
    marginTop: 25,
    shadowRadius: 25,
  },

  buttonText: {
    color: '#FFFFFF',
    fontSize: 22,
  },

  text: {
    fontSize: 24,
    textAlign: 'center',
    padding: 15,
  },
  closeText: {
    fontSize: 24,
    color: '#00479e',
    textAlign: 'center',
  },
  formText: {
    fontSize: 18,
  },
  inputField2: {
    marginTop: 15,
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: height_logo,
    height: height_logo,
  },
  drawrButton: {
    width: 50,
    height: 50,
    margin: 0,
  },
  headerNav: {
    justifyContent: 'flex-start',
    padding: 10,
  },
});
