import React from "react";
import {
  StyleSheet,
  View,
  Text,
  KeyboardAvoidingView,
  Button,
  AsyncStorage,
  TouchableOpacity,
  TextInput,
  StatusBar,
  ImageBackground,
  ScrollView,
} from "react-native";

import * as Animatable from "react-native-animatable";
import LinearGradient from "react-native-linear-gradient";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import { CommonActions, useTheme } from "@react-navigation/native";
import { fontSizes } from "../../common/fontSizes";

const Login = (props) => {
  const { colors } = useTheme();

  const image = require("../../assets/backgroundSmall.png");

  const [data, setData] = React.useState({
    mobile: "",
    username: "",
    password: "",
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });
  const [view, changeView] = React.useState({
    viewTitle: "Mobile no.",
    viewPlaceholder: "+91-00000-00000",
  });

  const changeMobileNumberHandler = (value) => {
    setData({
      ...data,
      mobile: value,
    });
  };

  const validation = () => {
    if (data.mobile == "" || data.mobile == null) {
      alert("Please fill mobile number");
      return false;
    } else if (data.mobile.length < 10) {
      alert("Please fill correct mobile number");
      return false;
    }
    return true;
  };

  const Login = () => {
    console.log("checking login props :: ", props);
    const payload = {
      Mobile: data.mobile,
      userType: "driver",
    };
    if (validation()) {
      props.authenticateUser(payload, (res) => {
        console.log("res auth :: ", res);
        if (res.responseCode == 200) {
          props.navigation.navigate("PhoneVerify", {
            mobileNumber: data.mobile,
          });
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#222546" barStyle="light-content" />
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "padding"}
        enabled
        keyboardVerticalOffset={0}
        style={{
          flexGrow: 1,
        }}
      >
        {/* <ScrollView showsVerticalScrollIndicator={false} style={{flex: 1}}> */}
        <ImageBackground source={image} style={styles.image}>
          <View style={styles.header}>
            <Text style={styles.text_header}> Welcome! </Text>
          </View>
        </ImageBackground>
        <Animatable.View
          animation="fadeInUpBig"
          style={[styles.footer, { backgroundColor: colors.background }]}
        >
          <Text style={[styles.text_footer, { color: colors.text }]}>
            {" "}
            {view.viewTitle}{" "}
          </Text>
          <View style={styles.action}>
            <FontAwesome name="phone" color={colors.text} size={22} />
            <TextInput
              onChangeText={(value) => changeMobileNumberHandler(value)}
              keyboardType="number-pad"
              maxLength={10}
              placeholder={view.viewPlaceholder}
              style={[styles.textInput, { color: colors.text }]}
              autoCapitalize="none"
              // onEndEditing={e => handleValiUser(e.nativeEvent.text)}
            />
            {data.mobile.length == 10 ? (
              <Animatable.View>
                <Feather name="check-circle" color="green" size={20} />
              </Animatable.View>
            ) : null}
          </View>
          {data.isValidUser ? null : (
            <Animatable.View animation="fadeInLeft" duration={500}>
              <Text style={styles.errorMsg}>
                Username must be 4 charachters long
              </Text>
            </Animatable.View>
          )}

          <View style={styles.button}>
            <TouchableOpacity
              style={styles.signIn}
              onPress={() => {
                Login();
              }}
            >
              <LinearGradient
                colors={["#222546", "#222546"]}
                style={styles.signIn}
              >
                <Text style={[styles.textSign, { color: "#fff" }]}>
                  Sign In
                </Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </Animatable.View>
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#222546",
  },
  header: {
    flex: 3,
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  text_header: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 30,
  },
  text_footer: {
    color: "#05375a",
    fontWeight: "bold",
    fontSize: 18,
  },
  action: {
    flexDirection: "row",
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 5,
    paddingVertical: 20,
    justifyContent: "center",
    paddingBottom: 20,
  },
  textInput: {
    flex: 1,
    fontSize: fontSizes(18),
    // marginTop: -12,
    paddingLeft: 10,
  },
  button: {
    alignItems: "center",
    marginTop: 50,
  },
  signIn: {
    width: "100%",
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  textSign: {
    fontSize: 18,
    fontWeight: "bold",
  },
  errorMsg: {
    color: "#FF0000",
    fontSize: 14,
  },
  image: {
    flex: 1,
    resizeMode: "stretch",
  },
});
