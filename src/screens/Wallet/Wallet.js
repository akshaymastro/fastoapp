import React, { useState } from 'react'
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import AddMoney from "./AddMoney"

const Wallet = ({ navigation }) => {

    const [state, setState] = useState({
        addMoney: true
    })

    const {addMoney} = state;

    return (
        <View style={styles.container}>
            <View style={styles.headerMain}>
                <LinearGradient
                    colors={['#222546', '#3a3e66', '#606598']} start={{ x: .4, y: 0 }} end={{ x: 1.5, y: 0 }}
                    style={styles.linearGradientFull} >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => { navigation.toggleDrawer(); }}>
                            <Image
                                source={require('../../assets/drawrIcon.png')}
                                style={styles.drawrButton}
                            />

                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('SupportScreen') }}>
                            <Image
                                source={require('../../assets/supportIcon.png')}
                                style={styles.support}
                            />

                        </TouchableOpacity>
                    </View>

                </LinearGradient>
            </View>

            <View style={styles.footer}>
                <View style={styles.footerContent}>
                    <View style={styles.footerContentCard}>
                        <ImageBackground
                            source={require('../../assets/member.png')}

                            style={styles.imageBackground}
                        >
                            <View>
                                <Text></Text>
                                <Text style={styles.imageBackgroundTextID}>5854525</Text>
                                <Text style={styles.imageBackgroundText}>Neeraj Pharia</Text>
                            </View>
                        </ImageBackground>
                    </View>
                    <View style={styles.addMoney}>
                        <View>
                            <Text style={styles.addMoneyText}>Fasto Balance</Text>
                            <Text style={styles.addMoneyText}>500/-</Text>
                        </View>
                        <View>
                            <TouchableOpacity
                                onPress={() => setState({
                                    addMoney: true
                                })}
                            >
                                <LinearGradient
                                    start={{ x: 0.0, y: 3.50 }} end={{ x: 1.3, y: 1.0 }}
                                    locations={[0, 0.5, 0.1]}
                                    colors={['#222546', '#3a3e66', '#71759c']}
                                    style={styles.linearGradient}>
                                    <Text style={styles.uinText} >Add Money</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.addMoney}>
                        <View>
                            <Image
                                source={require('../../assets/paytmlogo.jpg')}
                                resizeMode="contain"
                                style={styles.imagePtm}
                            />
                        </View>
                        <View>
                            <TouchableOpacity>
                                <LinearGradient
                                    start={{ x: 0.0, y: 3.50 }} end={{ x: 1.3, y: 1.0 }}
                                    locations={[0, 0.5, 0.1]}
                                    colors={['#222546', '#3a3e66', '#71759c']}
                                    style={styles.linearGradient}>
                                    <Text style={styles.uinText} >Link Wallet</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                {addMoney ? (<AddMoney onChange={Value => setState(Value)} />) : null}
            </View>
        </View>
    )
}

export default Wallet;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222546'
    },
    headerMain: {
        flex: 1,
    },
    drawrButton: {
        width: 50,
        height: 50,
        margin: 10,
    },
    support: {
        width: 35,
        height: 52,
        marginTop: 10,
        marginRight: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    addMoney: {
        flexDirection: 'row',
        justifyContent: "space-around",
        borderBottomWidth: 3,
        borderBottomColor: "#f2f2f2",
        paddingVertical: 10,
        alignItems: "center"
    },
    addMoneyText: {
        fontSize: 18,
        fontWeight: "bold"
    },
    imageBackground: {
        resizeMode: "contain",
        width: 350,
        height: 245,
        justifyContent: "center",
        marginTop: -70
    },
    imageBackgroundText: {
        color: "white",
        fontSize: 16,
        marginLeft: "12%",
        marginTop: 6
    },
    imageBackgroundTextID: {
        color: "white",
        fontSize: 16,
        marginLeft: "12%",
        marginTop: 20
    },
    footer: {
        flex: 3,
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },

    footerContent: {
        flexDirection: 'column',
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    footerContentCard: {
        alignItems: 'center'
    },
    linearGradient: {
        borderRadius: 50,
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 5,
    },

    linearGradientLink: {
        padding: 10,
        borderRadius: 50,
        marginBottom: 5
    },

    linearGradientFull: {
        height: '100%'
    },

    uinText: {
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
        fontSize: 21
    },
    uinTextBlack: {
        fontWeight: 'bold',
        color: 'black',
        textAlign: 'center',
        fontSize: 15
    },
    aboutHeader: {
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    imagePtm: {
        width: 100,
        height: 50
    }
})
