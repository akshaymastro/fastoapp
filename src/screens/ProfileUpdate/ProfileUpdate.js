import React, { useEffect, useState } from 'react';
import {
  Button,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Picker,
  CheckBox
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchUserDetails, updateUserProfile } from '../../redux/auth/actions';
import LinearGradient from 'react-native-linear-gradient';

const { height } = Dimensions.get('screen');
const height_logo = height * 0.19;

function ProfileUpdate(props) {
  const [user, setUser] = useState({
    fName: '',
    lName: '',
    email: '',
    VehicleType: '',
    Terms:false,
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
    <View style={styles.container}>
      <View style={styles.headerMain}>
        <LinearGradient
          colors={['#222546', '#3a3e66', '#606598']} start={{ x: .4, y: 0 }} end={{ x: 1.5, y: 0 }}
          style={styles.linearGradientFull} >

          <View style={styles.aboutHeader}>
            <Text style={styles.uinTextBig} > Pilot</Text>
            <Text style={styles.uinText} > Registration Form</Text>
          </View>
        </LinearGradient>
      </View>

      <View style={styles.footer}>
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
          <View style={styles.inputFieldVehicle}>
            <Text style={styles.formText}>Vehicle Type</Text>
            <Picker
              selectedValue={user.VehicleType}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) => setUser(itemValue)}
            >
              <Picker.Item label="Tata Ace" value="Tata Ace" />
              <Picker.Item label="Tata Ape" value="Tata Ape" />
              <Picker.Item label="Mahindra Pickup" value="Mahindra Pickup" />
            </Picker>
          </View>
          <View style={styles.upload}>
            <View style={styles.uploadAadharView}>
              <TouchableOpacity style={styles.uploadAadhar}>
                <Image style={styles.uploadAadharImage}
                  source={require('../../assets/icon/upload.png')}
                />
                <Text style={styles.uploadText}>Upload Aadhar Card</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadAadhar}>
                <Image style={styles.uploadAadharImage}
                  source={require('../../assets/icon/upload.png')}
                />
                <Text style={styles.uploadText}>Upload R. C.</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.uploadAadhar}>
                <Image style={styles.uploadAadharImage}
                  source={require('../../assets/icon/upload.png')}
                />
                <Text style={styles.uploadText}>Upload Driving Licence</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
          
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
  headerMain: {
  },
  linearGradient: {
    padding: 10,
    borderRadius: 50,
    width: '50%'
  },
  linearGradientFull: {
    height: 150,
    justifyContent: "center",
    paddingLeft: 20
  },
  uinText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 21
  },
  uinTextBig: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 30
  },
  aboutHeader: {
    flexDirection: "column",
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
    marginTop: 5,
  },
  inputFieldVehicle: {
    flexDirection: "row",
    alignItems: "center"
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
  footer: {
    paddingHorizontal: 20,
    marginTop: 10
  },
  uploadAadharView: {
   
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  uploadAadhar : {
      backgroundColor: "#f9f9f9",
      marginTop: '7%',
      width:100,
      height: 100,
      justifyContent: 'flex-start',
      alignItems: 'center',
  },
  uploadAadharImage :  {
      resizeMode: 'contain',
      
  },
  uploadText:{
    textAlign:"center"
  }

});
