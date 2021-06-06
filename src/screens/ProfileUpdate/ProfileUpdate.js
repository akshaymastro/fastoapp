import React, {useEffect, useState} from 'react';
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
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {fetchUserDetails, updateUserProfile} from '../../redux/auth/actions';

const {height} = Dimensions.get('screen');
const height_logo = height * 0.18;

function ProfileUpdate(props) {
  const [user, setUser] = useState({
    fName: '',
    lName: '',
    email: '',
  });
  useEffect(() => {
    props.fetchUserDetails(res => {
      console.log('res :: ', res);
    });
  }, []);

  const userDetailsUpdateHandler = () => {
    const payload = {
      firstName: user.fName,
      lastName: user.lName,
      email: user.email,
      is_profileUpdated: true,
    };
    props.updateUserProfile(payload, res => {
      if (res.responseCode == 200) {
        props.navigation.navigate('HomeDrawer');
      }
    });
  };
  return (
    <View style={{paddingTop: 50}}>
      <View style={styles.header}>
        <Text style={styles.text}>Welcome To Fasto</Text>
        <Image source={require('../../assets/logo.png')} style={styles.image} />
      </View>
      <View style={{paddingHorizontal: 20}}>
        <View>
          <View style={styles.inputField}>
            <Text style={styles.formText}>First Name</Text>
            <TextInput
              style={{
                height: 40,
                backgroundColor: '#f9f9f9',
                paddingLeft: 15,
              }}
              clearTextOnFocus={true}
              placeholder="Your First Name Here"
              onChangeText={value => {
                setUser({
                  ...user,
                  fName: value,
                });
              }}
            />
          </View>
          <View style={styles.inputField2}>
            <Text style={styles.formText}>Last Name</Text>
            <TextInput
              style={{
                height: 40,
                backgroundColor: '#f9f9f9',
                paddingLeft: 15,
              }}
              clearTextOnFocus={true}
              placeholder="Your Last Name Here"
              onChangeText={value => {
                setUser({
                  ...user,
                  lName: value,
                });
              }}
            />
          </View>

          <View style={styles.inputField2}>
            <Text style={styles.formText}>Email</Text>
            <TextInput
              style={{
                height: 40,
                backgroundColor: '#f9f9f9',
                paddingLeft: 15,
              }}
              clearTextOnFocus={true}
              placeholder="Your Email Here"
              onChangeText={value => {
                setUser({
                  ...user,
                  email: value,
                });
              }}
            />
          </View>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            userDetailsUpdateHandler();
          }}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

function mapStateToProps(state) {
  return {
    isOnline: state.network.isOnline,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    fetchUserDetails: bindActionCreators(fetchUserDetails, dispatch),
    updateUserProfile: bindActionCreators(updateUserProfile, dispatch),
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProfileUpdate);

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    paddingLeft: 15,
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
