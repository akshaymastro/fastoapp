import React, { Component } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';

export default class LoginForm extends Component {

    render() {
        return (
            <View>
               <TextInput 
                style={styles.input} 
                placeholder="example@mail.com"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.props.email}
                onChangeText={email => this.props.handleChange("email", email)}
                />
               <TextInput 
               style={styles.input} 
               placeholder="Password"
                autoCapitalize="none"
                secureTextEntry
                autoCorrect={false}
                value={this.props.password}
                onChangeText={password => this.props.handleChange("password", password)}

               /> 
               <TouchableOpacity onPress={this.props.handleSignIn} style={styles.button}>
                   <Text style={styles.buttonText}> Sign In</Text>
               </TouchableOpacity>
               <TouchableOpacity style={styles.button}>
                   <Text style={styles.buttonText}> Creat Account</Text>
               </TouchableOpacity>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    input : {
        height:40,
        backgroundColor: 'white',
        color: "black",
        marginBottom:10
    },
    button: {
        backgroundColor: "green",
        paddingVertical: 20,
        marginVertical:20,
        marginHorizontal:50
    },
    buttonText: {
        textAlign:'center',
        fontSize:20,
        color:"#000"
        
    }
})
