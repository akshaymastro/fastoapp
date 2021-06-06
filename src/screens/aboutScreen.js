import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';

import { Avatar} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';


const AboutScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
        <View style={styles.headerMain}>
         <LinearGradient
            colors={['#222546', '#3a3e66', '#606598']} start={{x: .4, y: 0}} end={{x: 1.5, y: 0}}
            style={styles.linearGradientFull} >
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
        <View style={styles.aboutHeader}>
        <LinearGradient 
             start={{x: 0.0, y: 3.50}} end={{x: 1.3, y: 1.0}}
             locations={[0,0.5,0.1]}
             colors={['#222546', '#3a3e66', '#71759c']}
            style={styles.linearGradient}>
                <Text style={styles.uinText} >About Fasto</Text>
        </LinearGradient>
        </View>
           </LinearGradient>  
           </View>

           <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <Image
                        source={require('../assets/aboutFasto.jpg')}
                        width={50}
                        style={styles.image}
                     />
                     <Text style={{fontSize:18,paddingVertical:10}}>
                     At <Text style={{fontWeight: "bold"}}> FASTO</Text> , we’re more than just 
connecting. We aspire to build a fresh Ecosystem in Logistic sector and through sustainable job 
creation, we empower our drivers, customers, transporters and 
aggregators to build a better future together.
                     </Text>
                     <LinearGradient colors={['#fdf0f0', '#eaeaf1', '#d5e3f2']} style={styles.linearGradientLink}>
                <Text style={styles.uinTextBlack} >For More Information Visit <Text style={{color: 'blue'}}
      onPress={() => Linking.openURL('http://google.com')}>
  www.fasto.in
</Text> </Text>
</LinearGradient>
                </View>
           </View> 
          
        </View>
    );
};

export default AboutScreen;

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: '#222546'
    },
    headerMain: {
        flex:1,
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
        width:350
      },
      footer: {
        flex:3,
        backgroundColor: '#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30,
    },
     
    footerContent: {
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        borderWidth: 3,
        borderColor: 'grey',
        paddingHorizontal:10,
         borderRadius:5,
    },    
  linearGradient: {
    padding:10,
    borderRadius:50,
    width:'50%'
},

linearGradientLink : {
    padding:10,
    borderRadius:50,
    marginBottom:5
},

linearGradientFull : {  
    height:'100%'  
},

uinText : {
    fontWeight : 'bold',
    color:'white',
    textAlign: 'center',
    fontSize:21
  },
  uinTextBlack : {
    fontWeight : 'bold',
    color:'black',
    textAlign: 'center',
    fontSize:15
  },
  aboutHeader:{
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center'
  }
});
  