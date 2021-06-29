import React, { useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  Dimensions,
  Image,
  TouchableOpacity,
  AppRegistry,
  ImageBackground,
} from "react-native";
import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useTheme, CommonActions } from "@react-navigation/native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

const SplashScreen = ({ navigation, common }) => {
  const image = require("../assets/backgroundSmall.png");

  const { colors } = useTheme();

  useEffect(() => {
    // console.log('common props :: ', common);
    if (common.showHome) {
      // navigation.navigate('HomeDrawer');
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {
              name: "HomeDrawer",
              params: null,
            },
          ],
        })
      );
    } else {
    }
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#222546" barStyle="light-content" />
      <ImageBackground source={image} style={styles.image}>
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceInLeft"
            easing="ease-in"
            duration="1500"
            source={require("../assets/logo-white-back.png")}
            style={styles.logo}
            resizeMode="stretch"
          />
          <Text style={styles.mytext}> Fasto Drive Solutions Pvt. Ltd. </Text>
        </View>
      </ImageBackground>

      <Animatable.View
        style={[
          styles.footer,
          {
            backgroundColor: colors.background,
          },
        ]}
        animation="fadeInUpBig"
        duration="1500"
        easing="ease-in"
      >
        <Text style={[styles.title, { color: colors.text }]}>
          Simple! Deliver Your Goods
        </Text>
        <Text style={styles.text}>Sign in with account </Text>
        <View style={styles.button}>
          <TouchableOpacity onPress={() => navigation.navigate("SignInScreen")}>
            <LinearGradient
              colors={["#222546", "#222546"]}
              style={styles.signIn}
            >
              <Text style={styles.textSign}> Get Started </Text>
              <MaterialIcons name="navigate-next" color="#fff" size={20} />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Animatable.View>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    common: state.common,
  };
};

export const mapDispatchToProps = (dispatch) => ({
  // showHome: bindActionCreators(showHome, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);

const { height } = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222546",
  },
  header: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
  },
  // header: {
  //     flex:1,
  //     justifyContent: 'flex-end',
  //     paddingHorizontal: 20,
  //     paddingBottom: 50
  //   }
  footer: {
    flex: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  logo: {
    width: height_logo,
    height: height_logo,
  },
  title: {
    color: "#05375a",
    fontSize: 30,
    fontWeight: "bold",
  },
  text: {
    color: "grey",
    marginTop: 5,
  },
  button: {
    alignItems: "flex-end",
    marginTop: 30,
  },
  signIn: {
    width: 150,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
    flexDirection: "row",
  },
  textSign: {
    color: "white",
    fontWeight: "bold",
  },
  mytext: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10,
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
});

AppRegistry.registerComponent("Fasto", () => Fasto);
