import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity } from 'react-native'

const BookingConfirmMessage = (props) => {

    console.log("hello",props);
    

    return (
        <View style={styles.top}>
            <Image
                source={require("../../assets/Congratulations.png")}
                style={{ width: "100%", zIndex: 9999 }}
                resizeMode="stretch"
            />
            <View style={styles.container}>
                <Text style={styles.title}>Booking Confirmed</Text>
                <Image
                    source={require("../../assets/icon/confirm.png")}
                    resizeMode="stretch"
                    style={styles.image}
                />
                <Text style={styles.title}>Enjoy your Hazzle Free Transportation</Text>
            
                <TouchableOpacity
                onPress={()=> props.onChange({
                    bookingConfirmMessage:false
                })}
              >
                <Text>Ok</Text>
              </TouchableOpacity>
            </View>          
        </View>
    )
}

export default BookingConfirmMessage;

const styles = StyleSheet.create({
    top:{        
        justifyContent:"center",        
        position:"absolute",
        height:"100%",
        width:"100%",
        backgroundColor:'rgba(52, 52, 52, 0.5)',
    },
    container: {
        width: "80%",
        height: 300,
        backgroundColor: "white",
        paddingHorizontal: 20,
        alignItems: "center",
        marginHorizontal: "10%",
        marginTop: -60,
        paddingTop: "20%"
    },
    title: {
        fontSize: 25,
        textAlign: "center"
    },
    image: {
        margin: 12
    }
})
