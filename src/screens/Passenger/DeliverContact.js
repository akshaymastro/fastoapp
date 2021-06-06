import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';

const DeliverContact = () => {
  const [state, setState] = useState({
    Name: '',
    Mobile: '',
  });

  return (
    <View style={{flex: 1, backgroundColor: '#fff'}}>
      {/* Top */}
      <View style={{marginTop: 10}}>
        <Text style={{fontWeight: 'bold', fontSize: 16, color: '#3FC5EE'}}>
          Pickup Contact
        </Text>
        <Text style={{fontWeight: 'normal', fontSize: 16}}>
          Driver will call this contact while pickup
        </Text>
      </View>
      {/* Main */}
      <View style={{marginTop: 50}}>
        <TextInput
          style={{
            height: 45,
            borderColor: 'gray',
            borderWidth: 1,
            width: styles.ex.width - 30,
            borderRadius: 15,
            paddingLeft: 15,
          }}
          onChangeText={Name => setState({Name})}
          value={state.Name}
        />
        <TextInput
          style={{
            height: 45,
            borderColor: 'gray',
            borderWidth: 1,
            width: styles.ex.width - 30,
            marginTop: 30,
            borderRadius: 15,
            paddingLeft: 15,
          }}
          onChangeText={Mobile => this.setState({Mobile})}
          value={state.Mobile}
        />
      </View>
      {/* Bottom */}
      <View style={{marginTop: 30}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => alert('button clicked')}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DeliverContact;

const styles = StyleSheet.create({
  ex: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    backgroundColor: '#FF9633',
    width: Dimensions.get('window').width - 30,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
});
