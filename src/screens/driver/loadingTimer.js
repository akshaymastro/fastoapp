import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";

import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { exit } from "process";

const LoadingTimer = (props) => {
  // My-name

  // second

  const [[hrs, mins, secs], setTime] = React.useState([0, 0, 0]);

  const tick = () => {
    if (mins === 59 && secs === 59) {
      setTime([hrs + 1, 59, 59]);
    } else if (secs === 59) {
      setTime([hrs, mins + 1, 0]);
    } else {
      setTime([hrs, mins, secs + 1]);
    }
  };

  const reset = () =>
    setTime([parseInt(hours), parseInt(minutes), parseInt(seconds)]);

  React.useEffect(() => {
    const timerId = setInterval(() => tick(), 1000);
    return () => clearInterval(timerId);
  });

  // my-name

  const Nav = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.subContainerHead}>Ride Information </Text>
        <View style={styles.subContainerContent}>
          <View style={styles.selectedView}>
            <Text style={styles.selectedViewText}>Tata Ace</Text>
            <Image
              source={require("../../assets/tempo/tata-ace.png")}
              width={45}
              style={styles.selectedViewImage}
            />
            <View style={styles.capacity}>
              <LinearGradient
                start={{ x: 0.0, y: 3.5 }}
                end={{ x: 1.3, y: 1.0 }}
                locations={[0, 0.5, 0.501]}
                colors={["#222546", "#3a3e66", "#71759c"]}
                style={styles.linearGradient}
              >
                <Text style={styles.uinText}>Distance : 2 km</Text>
              </LinearGradient>
            </View>
            <View style={styles.capacity}>
              <LinearGradient
                start={{ x: 0.0, y: 3.5 }}
                end={{ x: 1.3, y: 1.0 }}
                locations={[0, 0.5, 0.501]}
                colors={["#222546", "#3a3e66", "#71759c"]}
                style={styles.linearGradient}
              >
                <Text style={styles.uinText}>Time : 1:00</Text>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.rideInfo}>
            <View style={styles.rideInfoPickup}>
              <Text style={styles.rideInfoDropTitle}>Drop Location :</Text>
              <Text style={styles.rideInfoPickupText}>
                23/20, Patel Nagar, New Delhi New Delhi
              </Text>
            </View>
            <View style={styles.rideInfoPickup}>
              <Text style={styles.rideInfoDropTitle}>Reciever Details</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View>
                  <Text style={styles.rideInfoPickupText1}>
                    Name: Ramesh Kumar
                  </Text>
                  <Text style={styles.rideInfoPickupText1}>
                    Mobile:7017364693
                  </Text>
                </View>
                <TouchableOpacity>
                  <Image
                    source={require("../../assets/icon/call-now.png")}
                    width={45}
                    style={styles.callNow}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={[styles.bottom, { marginVertical: 10 }]}>
          <View style={styles.timer}>
            <Text style={styles.timerText}>Loading Timer</Text>
            <Text style={styles.timerText}>
              {mins} min {secs} secs
            </Text>
          </View>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() =>
              props.onChange({ loadingTimer: false, dropLocation: true })
            }
          >
            <Text style={styles.ButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default LoadingTimer;

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    backgroundColor: "white",

    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  subContainerHead: {
    textAlign: "right",
    backgroundColor: "#eeb000",
    paddingRight: "15%",
    paddingVertical: 5,
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 16,
  },
  selectedView: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: "#f9f9f9",
    shadowOffset: { width: 1, height: 1 },
    shadowColor: "black",
    shadowOpacity: 10,
    elevation: 15,
    zIndex: 9999,
    marginRight: 20,
    marginTop: -20,
    margin: 10,
    height: 180,
    width: 140,
    padding: 0,
    alignItems: "center",
    backgroundColor: "white",
  },
  selectedViewText: {
    fontSize: 20,
  },
  selectedViewImage: {
    width: 80,
    height: 80,
  },
  callNow: {
    width: 40,
    height: 40,
    marginLeft: 10,
  },
  capacity: {
    flexDirection: "row",
  },
  linearGradient: {
    padding: 5,
    width: "100%",
    borderRadius: 10,
  },
  uinText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 15,
  },
  subContainerContent: {
    flexDirection: "row",
  },
  rideInfo: {
    marginTop: 10,
  },
  rideInfoPickup: {
    marginTop: 5,
  },
  rideInfoPickupText: {
    width: 200,
  },
  rideInfoPickupText1: {
    width: 160,
    backgroundColor: "#3b3170",
    color: "white",
    padding: 5,
    borderRadius: 5,
    marginTop: 5,
  },
  rideInfoPickupTitle: {
    borderLeftWidth: 5,
    borderLeftColor: "green",
    paddingLeft: 8,
    fontWeight: "bold",
    fontSize: 15,
  },
  rideInfoDropTitle: {
    borderLeftWidth: 5,
    borderLeftColor: "red",
    paddingLeft: 8,
    fontWeight: "bold",
    fontSize: 15,
  },
  Button: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    marginHorizontal: 20,
    marginTop: 5,
    paddingHorizontal: 10,
  },
  ButtonText: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 20,
    color: "white",
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  bottomGoods: {
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  bottomGoodsText: {
    fontSize: 15,
  },
  submitButton: {
    backgroundColor: "#eeb000",
    padding: 10,
    borderRadius: 10,
    marginTop: 5,
    alignItems: "center",
  },
  timerText: {
    textAlign: "center",
    fontSize: 17,
    fontWeight: "bold",
  },
});
