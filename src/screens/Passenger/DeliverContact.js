import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setRideData } from "../../redux/vehicle/action";

const DeliverContact = () => {
  const dispatch = useDispatch();
  const { rideData } = useSelector((state) => state.vehicle);
  const [state, setdefaultstate] = useState({
    Name: "",
    Mobile: "",
    deliverContact: true,
    passengerBottom: false,
  });
  console.log(rideData, "datatta");
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
          Deliver User Contact
        </Text>
        <Text
          style={{ fontWeight: "normal", fontSize: 16, textAlign: "center" }}
        >
          Driver will call this contact while Dropoff
        </Text>
      </View>
      {/* Main */}
      <View>
        <TextInput
          style={styles.TextInput}
          placeholder="Name"
          onChangeText={(Name) =>
            setdefaultstate({
              ...state,
              Name: Name,
            })
          }
          value={state.Name}
        />
        <TextInput
          style={styles.TextInput}
          placeholder="Mobile"
          onChangeText={(Mobile) =>
            setdefaultstate({
              ...state,
              Mobile: Mobile,
            })
          }
          value={state.Mobile}
        />
      </View>
      <View style={styles.passengerBottom}>
        <View style={styles.passengerBottomView}>
          <TouchableOpacity
            style={styles.passengerBottomButton}
            onPress={() => {
              console.log("hello");
              dispatch(
                setRideData({
                  key: "receivrNumber",
                  value: state.Mobile,
                })
              );
              dispatch(
                setRideData({
                  key: "receivrName",
                  value: state.Name,
                })
              );
              dispatch(
                setRideData({
                  key: "deliverContact",
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
      </View>
      {/* Bottom */}
    </View>
  );
};

export default DeliverContact;

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
