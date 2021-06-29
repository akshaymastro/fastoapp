import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { setRideData } from "../../redux/vehicle/action";
import { useDispatch, useSelector } from "react-redux";

const PickupContact = () => {
  const dispatch = useDispatch();
  const { rideData } = useSelector((state) => state.vehicle);
  const [state, setstate] = useState({
    Name: "",
    Mobile: "",
    pickupContact: true,
    passengerBottom: false,
  });

  return (
    <View style={styles.top}>
      {/* Top */}
      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 16,
            color: "#000",
            textAlign: "center",
          }}
        >
          Pickup User Contact
        </Text>
        <Text
          style={{ fontWeight: "normal", fontSize: 16, textAlign: "center" }}
        >
          Driver will call this contact while pickup
        </Text>
      </View>
      {/* Main */}
      <View>
        <TextInput
          placeholder="Name"
          style={styles.TextInput}
          onChangeText={(Name) =>
            setstate({
              ...state,
              Name: Name,
            })
          }
        />
        <TextInput
          placeholder="Mobile"
          style={styles.TextInput}
          onChangeText={(Mobile) => setstate({ ...state, Mobile: Mobile })}
          value={state.Mobile}
        />
      </View>
      <View style={styles.passengerBottomView}>
        <TouchableOpacity
          style={styles.passengerBottomButton}
          onPress={() => {
            dispatch(
              setRideData({
                key: "pickupNumber",
                value: state.Mobile,
              })
            );
            dispatch(
              setRideData({
                key: "pickupName",
                value: state.Name,
              })
            );
            dispatch(
              setRideData({
                key: "pickupContact",
                value: false,
              })
            );
            dispatch(
              setRideData({
                key: "passengerBottom",
                value: true,
              })
            );
          }}
        >
          <Text style={styles.passengerBottomText}>ok</Text>
        </TouchableOpacity>
      </View>
      {/* Bottom */}
    </View>
  );
};

export default PickupContact;

const styles = StyleSheet.create({
  TextInput: {
    height: 45,
    borderWidth: 1,
    width: 250,
    marginTop: 10,
    borderRadius: 5,
    fontSize: 18,
  },
  top: {
    flexDirection: "column",
    marginTop: "auto",
    backgroundColor: "#fff",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  passengerBottom: {
    marginTop: "auto",
    backgroundColor: "white",
  },
  passengerBottomView: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 10,
  },
  passengerBottomButton: {
    backgroundColor: "yellow",
    padding: 10,
    borderRadius: 15,
    width: 150,
    marginHorizontal: 15,
    textAlign: "center",
  },
});
