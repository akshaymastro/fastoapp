import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, TextInput } from 'react-native'
import { RadioButton } from 'react-native-paper';


const CancelTrip = (props) => {

    const [state, setState] = useState({
        selectReason:{
            id:0,
            Name:'',
            message:''
        },
        Reasons:[
            {
                id:1,
                Name:"Inapropiate vehicle / wrong vehicle"
            },
            {
                id:2,
                Name:"Driver Asked me to cancel"
            },
            {
                id:3,
                Name:"I change my mind"
            },
            {
                id:4,
                Name:"Driver Said he will be late"
            }
        ]
    })

    const {selectReason,Reasons} = state;

    console.log("reson", selectReason );
    

    return (
        <View style={styles.container}>
            <View style={styles.subContainer}>
                <TouchableOpacity
                    onPress={() => props.onChange({
                        cancelTrip: false,
                        bookingConfirm: true
                    })}
                >
                    <Image
                        source={require("../../assets/icon/back.png")}
                        resizeMode="contain"
                        width={25}
                        height={25}
                        style={styles.image}
                    />
                </TouchableOpacity>
                <View style={{ width: "90%" }}>
                    <Text style={styles.containerHeadText}>Cancel Order</Text>
                </View>
            </View>
            <View style={styles.subContainerRadio}>
                {state.Reasons.map((Reason, id) => {
                return (
                    <View key={id}>
                    <TouchableOpacity
                    style={styles.subContainerRadioView}
                    
                    onPress={() => setState({
                        ...state,
                        selectReason:{
                            id:Reason.id,
                            Name:Reason.Name
                        }

                    })}
                >
                    <RadioButton
                        status={selectReason.id === Reason.id ? "checked" : "unchecked"}
                    />
                    <Text style={styles.subContainerRadioViewText}>
                       {Reason.Name}</Text>
                </TouchableOpacity>
                </View>
                )
            })}
            </View>
            <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.TextInput}
                    placeholder={"Write Message ..."}
                    value={selectReason.Message}
                    onChangeText = {(value) => setState({
                        ...state,
                        selectReason:{
                            message:value
                        }
                    })}

                />
            <View style={styles.subContainerBottom}>
                    <TouchableOpacity
                        style={styles.SubmitButton}
                        onPress={() => props.onChange({
                            cancelRideReason:{
                            name:selectReason.Name,
                            message:selectReason.message,
                            id:selectReason.id
                    },
                            passengerBottom:true,
                            cancelTrip:false
                        })}
                    >
                        <Text style={styles.SubmitButtonText}> Submit</Text>
                    </TouchableOpacity>
            </View>
        </View>
    )
}

export default CancelTrip;

const styles = StyleSheet.create({
    container: {
        marginTop: "auto",
        height: 350,
        backgroundColor: "white",
        padding: 10
    },
    subContainer: {
        flexDirection: "row",
    },
    subContainerBottom: {
        flexDirection: "row",
        justifyContent:"flex-end",
        paddingVertical:10
    },
    subContainerRadio: {
        flexDirection: "column",
        marginVertical: 10
    },
    subContainerRadioView: {
        flexDirection: "row",
        alignItems: "center"
    },
    subContainerRadioViewText: {
        fontSize: 15,
        fontWeight: "bold"
    },
    containerHeadText: {
        fontSize: 18,
        fontWeight: "bold",
        textAlign: "center"

    },
    image: {
        width: 25,
        height: 25,
    },
    TextInput:{
        backgroundColor:"#f9f9f9",
        marginHorizontal:10
    },
    SubmitButton:{
        backgroundColor:"yellow",
        padding:5,
        borderRadius:10,
        width:100
    },
    SubmitButtonText:{
       color:"black",
       textAlign:"center"
    }
})
