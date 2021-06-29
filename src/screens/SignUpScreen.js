import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Dimensions, TextInput, StatusBar } from 'react-native';

import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather'

const SignInScreen = ({navigation}) => {

    const [data, setData] = React.useState({
        email: '',
        password: '',
        confirm_password: '',
        check_textInputChange: false,
        secureTextEntry: true,
        confirm_secureTextEntry: true,

    });

    const textInputChange = (val) => {
        if( val.length !== 0 ) {
            setData({
                ...data,
                email: val,
                check_textInputChange: true

            });
        } else {
            setData({
                ...data,
                email: val,
                check_textInputChange: false
            });
        }
    }

    const handlePasswordChnage = (val) => {
        setData({
            ...data,
            password: val,            
        });
    }

    const handleConfirmPasswordChnage = (val) => {
        setData({
            ...data,
            confirm_password: val,            
        });
    }

    const updateScecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry

        });
    }
    const updateConfirmScecureTextEntry = () => {
        setData({
            ...data,
            confirm_secureTextEntry: !data.confirm_secureTextEntry

        });
    }
    return(
        <View style={styles.container}>
        <StatusBar 
            backgroundColor='#f9a602' 
            barStyle='light-content'
            />
           <View style={styles.header}>
               <Text style={styles.text_header}> Register Now </Text>
           </View>
           <Animatable.View
            animation="fadeInUpBig"
            style={styles.footer}
            >
               <Text style={styles.text_footer}> Email </Text>
               <View style={styles.action}>
                    <FontAwesome
                        name="user-o"
                        color="#05375a"
                        size={20}
                     />
                     <TextInput 
                        placeholder="Your Email"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => textInputChange(val)}
                    />
                    {data.check_textInputChange ? 
                    <Animatable.View>
                    <Feather 
                        name="check-circle"
                        color="#f9a602"
                        size={20}
                    />
                    </Animatable.View>
                    :null}
                    
                    </View>
               <Text style={[styles.text_footer, {marginTop:35}]}> Password </Text>
               <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                     />
                     <TextInput 
                        placeholder="Your Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.secureTextEntry ? true: false}
                        onChangeText={(val) => handlePasswordChnage(val)}
                    />
                    <TouchableOpacity
                        onPress={updateScecureTextEntry}
                    >

                    {data.secureTextEntry ?
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />:
                    <Feather 
                        name="eye"
                        color="#f9a602"
                        size={20}
                    />
                    }
                    </TouchableOpacity>
                    
               </View>
               <Text style={[styles.text_footer, {marginTop:35}]}> Confirm Password </Text>
               <View style={styles.action}>
                    <FontAwesome
                        name="lock"
                        color="#05375a"
                        size={20}
                     />
                     <TextInput 
                        placeholder="Confirm Your Password"
                        style={styles.textInput}
                        autoCapitalize="none"
                        secureTextEntry={data.confirm_secureTextEntry ? true: false}
                        onChangeText={(val) => handleConfirmPasswordChnage(val)}
                    />
                    <TouchableOpacity
                        onPress={updateConfirmScecureTextEntry}
                    >

                    {data.confirm_secureTextEntry ?
                    <Feather 
                        name="eye-off"
                        color="grey"
                        size={20}
                    />:
                    <Feather 
                        name="eye"
                        color="#f9a602"
                        size={20}
                    />
                    }
                    </TouchableOpacity>
                    
               </View>
               <View>
               <LinearGradient
                colors={['#f9a602','#f9b502']}
                style={styles.signIn}
               >
               <Text style={[styles.textSign, {color:'#fff'}]} >Sign Up</Text>

               </LinearGradient>

               <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={[styles.signIn, {
                        borderColor: '#f9a602',
                        marginTop: 15,
                        borderWidth: 1
                    }]}
               >
                   <Text style={[styles.textSign, {color:"#f9a602"}]} >Sign In</Text>
               </TouchableOpacity>
               </View>
           </Animatable.View>
        </View>
    );
};

export default SignInScreen;

const styles = StyleSheet.create ({
    container: {
        flex:1,
        backgroundColor: '#f9a602'
    },
    header: {
        flex:1,
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        paddingBottom: 50
    },
    footer: {
        flex:3,
        backgroundColor: '#fff',
        borderTopLeftRadius:30,
        borderTopRightRadius:30,
        paddingHorizontal:20,
        paddingVertical:30
    },
    text_header: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 30
    },
    text_footer: {
        color: '#05375a',
        fontWeight: 'bold',
        fontSize: 18
    },
    action: {
        flexDirection: 'row',
        marginTop: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#f2f2f2',
        paddingBottom: 5
    },
    textInput: {
        flex: 1,
        marginTop: -12,
        paddingLeft: 10,
        color: '#05375a'
    },
    button: {
        alignItems: 'center',
        marginTop: 50
    },
    signIn: {
        width: '100%',
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    },
    textSign: {
        fontSize: 18,
        fontWeight: 'bold'
    }
});