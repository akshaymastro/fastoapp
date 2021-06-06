import React from 'react'
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

const UpdateProfile = () => {
    return (
        <View style={styles.container}>   
          <View style={styles.header}>
        <Text style = { styles.text }>
          Welcome To Fasto
        </Text>
        <Image 
          source={require('../../assets/logo.png')}
          style = { styles.image }

        />
      </View>
      <View>
            <View style={styles.inputField}>
              <Text style ={styles.formText}>First Name</Text>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor:'#f9f9f9'
                }}
                clearTextOnFocus = {true}
                placeholder = "Your First Name Here"
              />
             </View>     
             <View style={styles.inputField2}>
              <Text style ={styles.formText}>Last Name</Text>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor:'#f9f9f9'
                }}
                clearTextOnFocus = {true}
                placeholder = "Your Last Name Here"
              />
             </View>    

              <View style={styles.inputField2}>
              <Text style ={styles.formText}>Email</Text>
              <TextInput
                style={{
                  height: 40,
                  backgroundColor:'#f9f9f9'
                }}
                clearTextOnFocus = {true}
                placeholder = "Your Email Here"
              />
             </View> 
                
      </View>

                   <TouchableOpacity
              style={styles.button}
              onPress={() => { alert("Updated")
              }}>
              <Text style={styles.buttonText}>Update</Text>
          </TouchableOpacity>
          
        
      </View>
    
    )
}

export default UpdateProfile

const {height} = Dimensions.get('screen');
const height_logo = height * 0.18; 

const styles = StyleSheet.create({
    container: {
      flex:1,
      paddingLeft:20,
      paddingRight:20,
      justifyContent: 'center',
      
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
        width: 0 
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
      padding: 15

    },
    closeText: {
      fontSize: 24,
      color: '#00479e',
      textAlign: 'center',
    },
    formText : {
      fontSize:18
    },
    inputField2 : {
      marginTop: 15
    },
    header : {
      justifyContent: 'center',
    alignItems: 'center',
    },
    image: {
      width: height_logo,
      height: height_logo,
     
          
    },
    drawrButton: {
      width: 50,
      height:50,
      margin: 0,
    },
    headerNav: {
      justifyContent: 'flex-start',
      padding: 10
    },
   
  });
