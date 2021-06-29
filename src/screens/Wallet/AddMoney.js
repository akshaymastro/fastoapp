import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput,KeyboardAvoidingView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient';
const AddMoney = (props) => {
    console.log("Add Money", props);

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <View style={styles.subContainerHead}>
                    <TouchableOpacity
                        onPress={() => props.onChange({
                            addMoney: false
                        })}
                        style={styles.subContainerHeadButton}
                    >
                        <Image
                            source={require("../../assets/icon/back.png")}
                            resizeMode="contain"
                            style={styles.subContainerImage}
                        />
                    </TouchableOpacity>
                    <View style={styles.subContainerHeadAdd}>
                        <Text style={styles.subContainerHeadAddText}>Add Money</Text>
                    </View>
                </View>
                <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
                <View style={styles.subContainerMiddle}>
                
                    <TextInput
                        value="500"   
                        style={styles.subContainerMiddleInput} 
                    />
                    
                    <Text style={styles.subContainerMiddleText}>+1000</Text>
                </View>
                </KeyboardAvoidingView>
                <View style={styles.subContainerBottom}>
                    <TouchableOpacity>
                    <LinearGradient
                                    start={{ x: 0.0, y: 3.50 }} end={{ x: 1.6, y: 1.0 }}
                                    locations={[0, 0.5, 0.1]}
                                    colors={['#222546', '#3a3e66', '#71759c']}
                                    style={styles.linearGradient}>
                            <Text style={styles.subContainerBottomText}>+500</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <LinearGradient
                                    start={{ x: 0.0, y: 3.50 }} end={{ x: 1.6, y: 1.0 }}
                                    locations={[0, 0.5, 0.1]}
                                    colors={['#222546', '#3a3e66', '#71759c']}
                                    style={styles.linearGradient}>
                            <Text style={styles.subContainerBottomText}>+1000</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity>
                    <LinearGradient
                                    start={{ x: 0.0, y: 3.50 }} end={{ x: 1.6, y: 1.0 }}
                                    locations={[0, 0.5, 0.1]}
                                    colors={['#222546', '#3a3e66', '#71759c']}
                                    style={styles.linearGradient}>
                            <Text style={styles.subContainerBottomText}>+1500</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                    
                </View>
            </View>
        </View>
    )
}

export default AddMoney;

const styles = StyleSheet.create({
    container: {
        
    },
    subContainer: {
        marginTop:"auto"
    },
    subContainerMiddle:{
        flexDirection:"row",
        justifyContent:"space-around",
        marginVertical:10
    },
    subContainerMiddleInput:{
        backgroundColor:"#f9f9f9",
        width:"50%",
        borderWidth:3,
        borderColor:"#c8c8c8"
    },
    subContainerBottom:{
        flexDirection:"row",
        justifyContent:"space-around"
    },
    subContainerBottomText:{
        fontSize:15,
        fontWeight:"bold",
        color:"white",
        padding:2,
    },
    subContainerHeadButton: {
        width:50
    },
    subContainerHead: {
        flexDirection:"row"
    },
    subContainerImage: {
        width: 25,
        height: 25,
        margin: 10
    },
    subContainerHeadAdd:{
        width:"80%",
        justifyContent:"center"
    },
    subContainerHeadAddText:{
        textAlign:"center",
        fontSize:20,
        fontWeight:"bold"
    },
    linearGradient: {
        borderRadius: 50,
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
})
