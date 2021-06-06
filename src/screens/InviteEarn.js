import React from 'react';
import {View, Text, Button, StyleSheet, TouchableOpacity, Image} from 'react-native';

import { Avatar} from 'react-native-paper';

import LinearGradient from 'react-native-linear-gradient';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';




const InviteEarn = ({navigation}) => {
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
                <Text style={styles.uinText} >Referal & Earn</Text>
        </LinearGradient>
        </View>
           </LinearGradient>  
           </View>

           <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <Image
                        source={require('../assets/referal.jpg')}
                        width={50}
                        style={styles.image}
                     />
                     <Text style={{fontSize:18,paddingVertical:10,textAlign:'center'}}>
                     Invite your Friends and Family {'\n'}and get Rs. 50 cash back on{'\n'}their first booking 

                     </Text>

                     <Text style={{fontSize:18,paddingVertical:10,textAlign:'center',textDecorationLine:'underline'}}>
                     No limitation invite unlimited

                     </Text>
                     <Text style={{fontSize:18,paddingVertical:10,textAlign:'center',}}>
                     Your Referal Link :

                     </Text>
                     <LinearGradient 
                     colors={['#fdf0f0', '#eaeaf1', '#d5e3f2']} 
                     style={styles.linearGradientLink}>
                <Text style={styles.uinTextBlack} >app.fasto.in/ref?125452 
                </Text>
                <TouchableOpacity style={{paddingHorizontal:10}}><Image 
                source={require('../assets/icon/shareIcon.png')}
                style={styles.shareIcon}
                 /></TouchableOpacity>
</LinearGradient>
                </View>
           </View> 
          
        </View>
    );
};

export default InviteEarn;

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
    borderRadius:50,
    marginBottom:5,
    flexDirection:'row',
    paddingHorizontal:20,
    paddingVertical:10
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
  },
  shareIcon : {
    resizeMode: "contain",        
    width:20,
    height:20
  }
});
  