import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image,ImageBackground,TouchableHighlight } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import { Avatar} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';

const ProfileScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
         
         <ImageBackground
            source={require('../assets/header.png')}
             style={styles.image}>
            <View style={styles.header}>
            <TouchableOpacity onPress={() => {navigation.toggleDrawer();}}>
            <Image 
              source={require('../assets/drawrIcon.png')}
                style={styles.drawrButton}
            />
                            
            </TouchableOpacity>
            <TouchableOpacity 
             onPress={() => {navigation.navigate('SupportScreen')}}>
            <Image 
              source={require('../assets/supportIcon.png')}
                style={styles.support}
            />
                            
            </TouchableOpacity>
        </View>
        <View style={styles.account} >
            <View>
        <Text style={styles.mainText}>Neeraj Pharia</Text>
        <View style={styles.account}>
        <Image style={styles.flag} source={require('../assets/india.jpg')}/>
                <Text style={styles.number}> 999 240 3542</Text>
               
            </View>
            </View>
            <View>
            <Avatar.Image style={styles.profile}  size={150}
                             source={require('../assets/neeraj.jpg')}/>
            </View>
        </View>
           </ImageBackground>   
      

        <View style={styles.profileBottom}>

        </View>
        <View style={styles.accountBootom}>
            <View style={styles.uinImageView}>
                <Image style={styles.uinImage} source={require('../assets/icon/uin.png')}/>
            </View>
            <View style={styles.Uid}>
                <LinearGradient colors={['#fdf0f0', '#eaeaf1', '#d5e3f2']} style={styles.linearGradient}>
                <Text style={styles.uinText} >UIN : FSTO12521</Text>
</LinearGradient>
</View>
            </View>
            <View style={styles.accountBootomNext}>
            <View style={styles.uinImageView}>
                <Image style={styles.uinImageEmail} source={require('../assets/icon/email.png')}/>
            </View>
            <View style={styles.Uid}>
                <LinearGradient colors={['#fdf0f0', '#eaeaf1', '#d5e3f2']} style={styles.linearGradient}>
                <Text style={styles.uinText} >Email: pharia.ji@gmail.com</Text>
</LinearGradient>
</View>
            </View>
            <View style={styles.accountBootomNext}>
            <View style={styles.uinImageView}>
                <Image style={styles.uinImageEmail} source={require('../assets/icon/address.png')}/>
            </View>
            <View style={styles.Uid}>
                <LinearGradient colors={['#fdf0f0', '#eaeaf1', '#d5e3f2']} style={styles.linearGradient}>
                <Text style={styles.uinText} >Add: Shop No. 18, Fatehab Road </Text>
</LinearGradient>
<View style={styles.account}>
 <LinearGradient colors={['#fdf0f0', '#eaeaf1', '#d5e3f2']} style={styles.linearGradientHalf}>
                <Text style={styles.uinText} >Sirsa </Text>
</LinearGradient>
 <LinearGradient colors={['#fdf0f0', '#eaeaf1', '#d5e3f2']} style={styles.linearGradientHalfSecond}>
                <Text style={styles.uinText} >Hariyana</Text>
</LinearGradient>
</View>
</View>
            </View>
            <View style={styles.uploadAadharView}>
            <TouchableOpacity style={styles.uploadAadhar}>
                <Image style={styles.uploadAadharImage}
                    source={require('../assets/icon/upload.png')}
                 />
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default ProfileScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainText: {
        fontSize:30,
        fontWeight: 'bold',
        marginLeft:20,
        color:'white'    
      },
      account: {
          flexDirection: 'row'
    },
    number: {
        fontWeight: '500',
        marginRight:10,
        marginLeft:10,
        color:'white'
        
    },
    drawrButton: {
        width: 50,
        height:50,
        margin: 10,
    },
    support: {
        width: 35,
        height:52,
        marginTop:10,
        marginRight: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    image: {
        resizeMode: "contain",        
        width:400,
        height:185
      },
      flag: {
        resizeMode: "contain",  
          width: 25,
          height: 17,
          marginTop:3,
          marginLeft:22,
      },
      profile: {
        shadowOffset: { width: 50, height: 20 },
        shadowColor: '#000',
        shadowOpacity: 5,
        elevation: 12,
      },
      accountBootom: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '18%',
    alignItems: 'center'
  },
  accountBootomNext: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '2%',
    alignItems: 'flex-start'
},
  linearGradient: {
    padding:10,
    borderRadius:50,
},
linearGradientHalf: {
    padding:10,
    marginTop:'5%',
    borderRadius:50,
    width:'48%',
},
linearGradientHalfSecond: {
    padding:10,
    marginTop:'5%',
    borderRadius:50,
    width:'48%',
    marginLeft:'3%'
},
Uid: {
    width:'60%',
    marginLeft:10
},
  uinImage : {
      width:50,
      margin:5,
      resizeMode: 'contain'
  },
  uinImageEmail : {
    width:40,
    margin:2,
    resizeMode: 'contain'
},
  uinText : {
    fontWeight : 'bold'
  },
  uinImageView: {
    width:60,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
   
  },
  uploadAadharView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  uploadAadhar : {
      backgroundColor: "#f9f9f9",
      marginTop: '7%',
      width:200,
      height: 100,
      justifyContent: 'center',
      alignItems: 'center',
  },
  uploadAadharImage :  {
      resizeMode: 'contain',
      
  }
});