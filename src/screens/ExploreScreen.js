import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ExploreScreen = ({navigation}) => {
    return (
        <View style={styles.container}>
            
            <View style={styles.headerMain}>
         <LinearGradient
            colors={['#222546', '#3a3e66', '#606598']} start={{x: .4, y: 0}} end={{x: 1.5, y: 0}}
            style={styles.linearGradientFull} >
            <View style={styles.header}>
            <View style={styles.headerLeft}>
            <TouchableOpacity onPress={() => {navigation.toggleDrawer();}}>
            <Image 
              source={require('../assets/drawrIcon.png')}
                style={styles.drawrButton}
            />
           
            </TouchableOpacity>
            </View>
            <View style={styles.headerRight}>
            <TouchableOpacity 
             onPress={() => {navigation.navigate('SupportScreen')}}>
            <Image 
              source={require('../assets/supportIcon.png')}
                style={styles.support}
            />
                            
            </TouchableOpacity>
            </View>
        </View>
        
           </LinearGradient>  
           </View>
            <View style={styles.paymentStyle}>
                <View style={styles.credit}>
                    <Text style={{fontWeight: 'bold', fontSize:20}}>Fasto Credits</Text>
                    <Text>Balance ₹0.0 </Text>
                </View>
                <View style={styles.addMoney}>
                <TouchableOpacity
                   
                    style={[styles.add, {
                        borderColor: '#000',
                        marginTop: 15,
                        borderWidth: 1
                    }]}
               >
                   <Text style={[styles.textSign, {color:"#fff", fontWeight: 'bold', fontSize:20}]} >Add Money</Text>
               </TouchableOpacity>
               </View>
            </View>          
            <View style={styles.paymentStyle}>
                <View style={styles.credit}>
                    <Text style={{fontWeight: 'bold', fontSize:20}}>Razorpay Wallet</Text>
                    <Text>Balance ₹0.0 </Text>
                </View>
                <View style={styles.addMoney}>
                <TouchableOpacity
                   
                    style={[styles.add1, {
                        borderColor: '#000',
                        marginTop: 15,
                        borderWidth: 1
                    }]}
               >
                   <Text style={[styles.textSign, {color:"#fff", fontWeight: 'bold', fontSize:20}]} >Add Money</Text>
               </TouchableOpacity>
               </View>
            </View>          
        </View>
        
    );
};

export default ExploreScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    mainText: {
        fontSize:20,
        fontWeight: 'bold',
        margin:10    
      },
    paymentStyle: {
        flexDirection: 'row',
        margin:20, 
        borderBottomWidth: 1,
        borderBottomColor: 'grey',
        paddingBottom: 5
    },
    credit: {
        width: '50%'
    },
    addMoney: {
        width: '50%'
    },
    add: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'green',
    borderColor: '#fff',
    padding: 5
},
    add1: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: 'blue',
    borderColor: '#fff',
    padding: 5
},

drawrButton: {
    width: 50,
    height:50,
    margin: 10,
},
support: {
    width: 50,
    height:67,
    resizeMode:'contain',
    marginTop:10,
    marginRight: 20,
},
headerMain: {
    flex:1,
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:60

},
});