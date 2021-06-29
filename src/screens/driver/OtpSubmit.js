import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import io from "socket.io-client";
import LinearGradient from "react-native-linear-gradient";
import { useSelector } from "react-redux";
const socket = io("https://fasto-backend.herokuapp.com/");
const OtpSubmit = (props) => {
  const vehicle = useSelector((state) => state.vehicle);
  const [pickupOtp, setPickupotp] = useState("");
  const startTrip = () => {
    console.log("kskskssk");
    socket.emit("updateRide", {
      id: vehicle.selectedRide._id,
      status: "inprogress",
      StartOpt: pickupOtp,
      loadingTimer: true,
    });
  };
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
                <Text style={styles.uinText}>Distance : 12 km</Text>
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
                <Text style={styles.uinText}>Time : 20:00</Text>
              </LinearGradient>
            </View>
          </View>
          <View style={styles.rideInfo}>
            <View style={styles.rideInfoPickup}>
              <Text style={styles.rideInfoPickupTitle}>Pickup Location :</Text>
              <Text style={styles.rideInfoPickupText}>
                23/20, Patel Nagar, New Delhi New Delhi
              </Text>
            </View>
            <View style={styles.rideInfoPickup}>
              <Text style={styles.rideInfoDropTitle}>Drop Location :</Text>
              <Text style={styles.rideInfoPickupText}>
                23/20, Patel Nagar, New Delhi New Delhi
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.bottom}>
          <TouchableOpacity style={styles.bottomGoods}>
            <Text style={styles.bottomGoodsText}>Goods Information</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.Button}
            onPress={() => {
              props.onChange({
                startTrip: false,
                otpSubmit: true,
              });
            }}
          >
            <Text style={styles.ButtonText}>Call Now</Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.bottom, { marginVertical: 10 }]}>
          <TextInput
            style={{
              width: "40%",
              backgroundColor: "#f9f9f9",
              paddingLeft: 15,
            }}
            onChangeText={(e) => setPickupotp(e)}
            clearTextOnFocus={true}
            placeholder="Enter Pickup otp"
          />
          <TouchableOpacity
            style={styles.submitButton}
            onPress={() => {
              startTrip();
              props.onChange({
                otpSubmit: false,
                dropLocation: true,
              });
            }}
          >
            <Text style={styles.ButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtpSubmit;

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
    marginRight: 30,
    marginTop: -20,
    margin: 10,
    height: 180,
    width: 150,
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
});
