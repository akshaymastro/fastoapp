import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from "react-native"

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SearchRide = () => {
    return (

            <View style={styles.container}>
                <View
                    style={styles.subContainer}>
                    <Image
                        source={require('../../assets/tempo/eeco.png')}
                        style={styles.subContainerImage}
                    />
                    <View>
                        <Text style={styles.subContainerImageText}>
                            Ace Helper
                         </Text>
                        <Text style={styles.subContainerImageTextSearching}>
                            Searching for driver...
                         </Text>
                        <Text style={styles.subContainerTimer}>
                            Booking will be cancelled if not allocated in 9:50
                  </Text>
                    </View>
                </View>
                <View
                    style={styles.subContainerSecond}>

                    <View style={styles.subContainerSecondView} >
                        <Image
                            source={require('../../assets/cash1.png')}
                            style={{ width: 50, height: 50, }}
                        />
                        <Text style={styles.subContainerSecondText}>
                            ₹ 920 Cash
                             </Text>
                    </View>
                    <View  style={styles.subContainerSecondView}>
                        <Text>Trip ID: </Text>
                            <Text style={styles.subContainerSecondText}>
                                #FST255541245
                              </Text>
                        
                    </View>
                </View>


            </View>
           

    )
}

export default SearchRide;

const styles = StyleSheet.create({

    container: {
       
    },
    subContainer: {        
        flexDirection: 'row',
        paddingVertical:20,
        paddingHorizontal:20,
        borderBottomColor:"#f2f2f2",
        borderBottomWidth:5
        
    },
    subContainerImage :{ 
        width: 60, 
        height: 60 
    },
    subContainerImageText:{
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 5,
        marginLeft: 10,
    },
    subContainerImageTextSearching:{
        fontWeight: 'normal',
        fontSize: 16,
        color: 'gray',
        marginTop: 5,
        marginLeft: 10,
    },
    subContainerTimer:{
        fontWeight: 'normal',
        fontSize: 12,
        color: '#FF1D6B',
        marginTop: 5,
        marginLeft: 10,
    },
    
    subContainerSecond: {        
        flexDirection: 'row',
        justifyContent:"space-between",
        paddingVertical:20,
        paddingHorizontal:20,
        borderBottomColor:"#f2f2f2",
        borderBottomWidth:5
    },
    subContainerSecondView:{
        flexDirection:"row",
        alignItems:"center"
    },
    subContainerSecondText:{
        fontWeight: 'bold',
        fontSize: 16,
        marginLeft:15
    }
})