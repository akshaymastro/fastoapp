import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useDispatch, useSelector } from "react-redux";

const BookingConfirm = (props) => {
  // const dispatch = useDispatch();
  // const availableTrips = useSelector(
  //   (state) => state.vehicle.availableTrips[0]
  // );
  // // console.log(availableTrips, "hello-vishal");
  // console.log("\n\r__TEST122__ ", availableTrips.pickUpOtp);
  // const pickUpOtp = availableTrips.pickUpOtp;

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.subContainerTop}>
          <Text style={styles.containerText}> Booking Confirmed</Text>
          <Image
            source={require("../../assets/icon/confirm.png")}
            resizeMode="contain"
            style={styles.image}
            width={40}
            height={40}
          />
        </View>
      </View>
      <View style={styles.subContainerMiddle}>
        <View style={styles.subContainerLeft}>
          <Image
            source={require("../../assets/tempo/tata-ace.png")}
            resizeMode="contain"
            style={styles.image}
            width={80}
            height={80}
          />
          <Text style={styles.containerText}> Ace Helper</Text>
        </View>
        <View style={styles.subContainerRight}>
          <Text style={styles.containerTextOTP}> OTP: 5245</Text>
          <Text style={styles.containerText}> Driver ID: 565656</Text>
          <View style={styles.subContainerRightRatting}>
            <Image
              source={require("../../assets/icon/ratting.png")}
              resizeMode="contain"
              style={styles.image}
              width={24}
              height={24}
            />
            <Text style={styles.containerTextBold}>4.9</Text>
          </View>
        </View>
      </View>
      <View style={styles.subContainerMiddle}>
        <View style={styles.subContainerLeft}>
          <Image
            source={require("../../assets/icon/cash.png")}
            resizeMode="contain"
            style={styles.image}
            width={80}
            height={80}
          />
          <View>
            <Text style={styles.containerTextFair}>
              {" "}
              Total Fair: ₹ {props.ridePrice}
            </Text>
            <Text style={styles.containerTextAddFair}>
              {" "}
              Add ₹ {props.ridePrice} to Avoid Cash
            </Text>
            <TouchableOpacity style={styles.containerTextAddMoney}>
              <Text style={{ color: "white", textAlign: "center" }}>
                Add Money
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.subContainerRight}>
          <Text style={styles.containerText}>Trip ID: 565656</Text>
        </View>
      </View>
      <View style={styles.subContainerBottom}>
        <TouchableOpacity
          style={styles.ButtonCancel}
          onPress={() =>
            props.onChange({
              bookingConfirm: false,
              cancelTrip: true,
            })
          }
        >
          <FontAwesome
            name="window-close"
            color="red"
            size={25}
            borderRadius={15}
          />
          <Text style={styles.ButtonCancelText}>Cancel Trip</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingConfirm;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    marginTop: "auto",
    backgroundColor: "#fff",
    height: 260,
  },
  containerText: {
    fontSize: 20,
  },
  containerTextFair: {
    fontSize: 15,
  },
  containerTextAddFair: {
    fontSize: 10,
    color: "red",
  },
  containerTextAddMoney: {
    fontSize: 10,
    backgroundColor: "#3b316f",
    padding: 5,
    borderRadius: 10,
  },
  containerTextFairBold: {
    fontSize: 15,
    fontWeight: "bold",
  },
  containerTextBold: {
    fontSize: 20,
    fontWeight: "bold",
  },
  containerTextOTP: {
    fontSize: 16,
    backgroundColor: "yellow",
    padding: 3,
    fontWeight: "bold",
  },
  subContainer: {
    flexDirection: "row",
    justifyContent: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 3,
  },
  subContainerMiddle: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 3,
  },
  subContainerBottom: {
    flexDirection: "column",
    paddingHorizontal: 10,
    justifyContent: "center",
  },
  subContainerTop: {
    flexDirection: "row",
    alignItems: "center",
  },
  subContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  subContainerRight: {
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  subContainerRightRatting: {
    flexDirection: "row",
  },
  image: {
    shadowColor: "#000",
    shadowOpacity: 10,
    elevation: 15,
  },
  ButtonCancel: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  ButtonCancelText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 10,
  },
});
