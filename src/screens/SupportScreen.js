import React, { Component } from "react";
import {View, Text, Button, StyleSheet, TextInput,TouchableOpacity,Image} from 'react-native';
import io from "socket.io-client";

import LinearGradient from 'react-native-linear-gradient';


export default class SupportScreen extends Component {

    constructor(props) {
        super(props);   
        this.state ={
            chatMessage: "",
            chatMessages: []
        }     
    }
   
    
  
    componentDidMount() {
        this.socket = io("http://192.168.43.75:3000");
        this.socket.on("chat message", msg => {
            this.setState({ chatMessages: [...this.state.chatMessages, msg]})
        })
    
    }

    submitChatMessage() {
        this.socket.emit("chat message", this.state.chatMessage);
        this.setState({ chatMessage: "" });
    }

    render() {

        const {navigation} = this.props;

        const chatMessages = this.state.chatMessages.map(chatMessage => (
        <Text key={chatMessage}> {chatMessage} </Text> 
    ));
      
  
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
            <Text style={styles.uinTextBig}>Welcome to Fasto</Text>
            <Text style={styles.uinText}>Customer Service</Text>
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
           <View style={styles.content}>
           <View style={styles.id}>
                    <View >
                        <Text style={styles.ticketID}>
                            Your Ticket ID :
                        </Text>
                        <Text>
                            FSTHLP021210221
                        </Text>
                    </View>
                    <View style={styles.orderID}>
                         <Text  style={styles.orderID}>
                            Order ID:
                         </Text>
                         <Text>
                            FDTID1515155
                         </Text>
                    </View>
                </View>
           </View>
           <View style={styles.footer}>
            <View style={styles.footerContent}>
               
                <View style={styles.typeBox}>
                
                {chatMessages}
                    <TextInput
                    style={styles.textInput}
                        autoCorrect={false}
                        value={this.state.chatMessage}
                        onSubmitEditing= {() => this.submitChatMessage()}
                        onChangeText={chatMessage => {
                            this.setState({ chatMessage });
                        }}

                    />
                       <TouchableOpacity>
                        <Image style={styles.sendButton} source={require('../assets/icon/send.png')} />
                        </TouchableOpacity>
                        </View>
                </View>
            </View>
        </View>
      );
    }
  }

 const styles = StyleSheet.create({
   container: {
     flex: 1, 
   },
   headerMain: {
    flex:1,
},
header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom:60

},
headerLeft: {
    
},
headerRight: {

},
id : {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
},
ticketID: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'bold'
},
orderID : {
    textAlign: 'center',
    fontSize: 16,
    fontWeight:'bold'
},
   drawrButton: {
    width: 50,
    height:50,
    margin: 10,
},
support: {
    width: 100,
    height:117,
    resizeMode:'contain',
    marginTop:10,
    marginRight: 20,
},
image: {
    resizeMode: "contain",        
    width:350
  },
  footer: {
    backgroundColor: '#fff',
    
    paddingHorizontal:20,
    paddingVertical:30,
},
footerContent: {
    flexDirection:'column',
    paddingHorizontal:10,
},    
linearGradient: {
padding:10,
borderRadius:50,
width:'50%'
},


uinText : {
fontWeight : 'bold',
color:'white',
fontSize:21,
marginLeft:20
},
uinTextBig : {
fontWeight : 'bold',
color:'white',
fontSize:17,
marginLeft:20
},
aboutHeader:{
  flexDirection:'column',
  alignItems:'center',
  justifyContent:'center'
},
shareIcon : {
resizeMode: "contain",        
width:100,
height:100
},
typeBox: {
    flexDirection:'row',
    justifyContent:'space-between',
    
    backgroundColor:'#f2f2f2',
    marginTop:'auto'
},
sendButton : {
    width:50,
    height:50,
},
textInput: {      
    flex:1,
    color: 'black',
    fontSize: 18
},
content : {
    flex:2.5,
    backgroundColor:'#fff',
    borderTopLeftRadius:30,
    borderTopRightRadius:30,
    paddingHorizontal:20,
    paddingVertical:30,
}

 });
