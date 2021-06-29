import React from 'react';
import {
  StyleSheet, 
  View, 
  Text, 
  Button, 
  TouchableOpacity, 
  StatusBar,  
  Image,
  TextInput,
  ImageBackground
} from 'react-native';
import * as Progress from 'react-native-progress';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


import { useTheme } from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';




import Feather from 'react-native-vector-icons/Feather';

const DetailsScreen = ({navigation}) => {
  const image = require('../assets/backgroundSmall.png');
  const { colors } = useTheme();
    return(
        <View style={styles.container}>        
        <StatusBar 
            backgroundColor='#222546'
            barStyle='light-content'
            />
             <LinearGradient colors={['#222546', '#3a3e66', '#606598']} start={{x: .4, y: 0}} end={{x: 1.5, y: 0}}
            
             style={styles.image}>
             
           <View style={styles.header}>          
           <TouchableOpacity onPress={() => {navigation.toggleDrawer();}}>
            <Image 
              source={require('../assets/drawrIcon.png')}
                style={styles.drawrButton}
            />
                            
            </TouchableOpacity>
            
               <Text style={styles.mainText}> All Orders </Text>              
           </View>
           </LinearGradient>           
           <View style={styles.footer}>           
           <View style={styles.textInput}>            
            <TextInput
             placeholder="Item / Date / Order ID "
                        style={[styles.textInputSearch, {color: colors.text}]}
                        autoCapitalize="none"
           />
           <View>
           <FontAwesome
                            name="search"
                            color='#f9a602'
                            size={20}
                            
                            style={styles.fontIcon}
                 />
                 <Text style={{fontSize:9}}>Search</Text>
                 </View>
           </View>
          <View style={styles.orders}>
            <View style={styles.orderDetails}>
                <Image
                  source={require('../assets/books.jpg')}                  
                  width={55}
                  style={styles.orderImage}
                  />
            
            <View style={styles.details} >
              <Text style={styles.detailsText}>
              
              <Text style={{fontWeight:'bold'}}>Goods Category:  </Text>{'\n'}
              <Text>Stationary  </Text>{'\n'}
                <Text style={{fontWeight:'bold'}}>Order Id:   </Text>{'\n'}
                <Text>5211524  </Text>{'\n'}
                <Text style={{fontWeight:'bold'}}>Date and Time:   </Text>{'\n'}
                <Text>19 March 2021 04:35 PM  </Text>{'\n'}
                <Text ><Text style={{fontWeight:'bold'}}>Qty:</Text> 20pcs</Text> 
              </Text>
            </View>
            <View style={styles.details1} >
              <Text style={styles.detailsText}>              
              <Text style={{fontWeight:'bold'}}>Cash On Delivery</Text> {'\n'} 
                <Text style={{fontWeight:'bold'}}>Total Fair : </Text> {'\n'}
                <Text style={{ width:'100%'}}> ₹ 1,200</Text> {'\n'}
                
              </Text>
            <Image source={require('../assets/icon/confirm.png')}/>
            </View>
           </View>           
           <Progress.Bar progress={0.7} width={null} height={2} borderRadius={12} color={['#f9a602']} />
           
          </View>                  
          
        </View></View>
    );
  }

  export default DetailsScreen;

const styles = StyleSheet.create({
  container: {
    flex:1,
        backgroundColor: '#222546',
  },
  mainText: {
    fontSize:25,
    fontWeight: 'bold',
    marginTop:10,
    color:'white'

  },
  bookNow: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
},
textSign: {
  fontSize: 18,
  fontWeight: 'bold'
},
orderDetails: {
  flexDirection: 'row',  
  padding:10, 
},

orders: { 
  margin:20,  
  padding:10,
  backgroundColor: '#fff',
  borderRadius:10,
  shadowOffset: { width: 40, height: 10 },
  shadowColor: '#000000',
  shadowOpacity: 1,
  elevation: 6,
  zIndex:999, 
},
feather: {
  padding:10,
  backgroundColor: '#fff'
},
details: {
  padding:10,
  width:'50%',
  borderRightWidth:1,
  borderRightColor:'grey'
},
detailsBottom: {
  padding:10,
  width:'33.33%',
  flexDirection: 'row', 
},
details1: {
  padding:10,
  width:'40%',
},
detailsText: {
  color: '#222546'
},
header: {
  flex:1,
  justifyContent: 'flex-end',
  paddingHorizontal: 10,
  paddingBottom: 50
},
footer: {
  flex:3,
  backgroundColor: '#f9f9f9',
  borderTopLeftRadius:30,
  borderTopRightRadius:30,
  paddingHorizontal:20,
  paddingVertical:30,
  marginTop:-22
},
action: {
  flexDirection: 'row',
  marginTop: 10,
  borderBottomWidth: 1,
  borderBottomColor: '#f2f2f2',
  paddingBottom: 5
},
orderImage: {
  width:60,
  height:60,
  borderRadius:10
},
fontIcon: {
  textAlignVertical:'center', 
  paddingTop:10
},
fontIconMarker: {
  textAlignVertical:'center', 
},
fontIconMarkerStatus: {
  textAlignVertical:'center', 
  marginLeft:5
},
textInput: {
  flexDirection:'row',
  marginTop: -12,
  paddingLeft: 10,
  backgroundColor:'white',
  borderRadius:20,
},
textInputSearch: {
  width:'90%',
  height:'100%'
},
image: {
  flex:1,
  resizeMode: 'contain',
  
},
drawrButton: {
  width: 50,
  height:50,
  margin: 0,
},
});