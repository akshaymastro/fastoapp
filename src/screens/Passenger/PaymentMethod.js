import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity, Image } from "react-native";
import { RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setRideData } from "../../redux/vehicle/action";
const PaymentMethod = () => {
  const dispatch = useDispatch();
  const { rideData } = useSelector((state) => state.vehicle);
  const [state, setState] = useState({
    paymentMode: "paytm",
  });

  const { paymentMode } = state;

  console.log("Payment Mode", state);

  return (
    <View style={styles.container}>
      {/* Top */}
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <View style={styles.headerFirst}>
            <Text>
              <Text style={styles.credits}>Credits</Text>

              <Text>₹ 0.00</Text>
            </Text>
            <TouchableOpacity style={styles.addMoney}>
              <Text style={styles.addMoneyText}>Add money</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerSecond}>
            <TouchableOpacity style={styles.headerSecondButton}>
              <Text>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
        {/* Containt */}
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.contentButton}
            onPress={() => {
              setState({
                ...state,
                paymentMode: "paytm",
              });
              dispatch(
                setRideData({
                  key: "paymentType",
                  value: state.paymentMode,
                })
              );
            }}
          >
            <View style={styles.contentButtonView}>
              <Image
                source={require("../../assets/paytmlogo.jpg")}
                style={styles.contentButtonViewImage}
              />
              <Text style={styles.contentButtonViewText}>Wallet</Text>
            </View>
            <RadioButton
              status={paymentMode === "paytm" ? "checked" : "unchecked"}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.contentButton}
            onPress={() => {
              setState({
                ...state,
                paymentMode: "cash",
              });
              dispatch(
                setRideData({
                  key: "paymentType",
                  value: state.paymentMode,
                })
              );
            }}
          >
            <View style={styles.contentButtonView}>
              <Image
                source={require("../../assets/cash1.png")}
                style={styles.contentButtonViewImageCash}
              />
              <Text style={styles.contentButtonViewText}>Cash</Text>
            </View>
            <RadioButton
              status={paymentMode === "cash" ? "checked" : "unchecked"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default PaymentMethod;

const styles = StyleSheet.create({
  container: {},
  subContainer: {
    flexDirection: "column",
    marginTop: "auto",
    backgroundColor: "#fff",
    height: 220,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    zIndex: 99999999,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    alignItems: "center",
    borderBottomColor: "#f2f2f2",
    borderBottomWidth: 5,
  },
  headerFirst: {
    flexDirection: "column",
  },
  credits: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#000",
  },
  addMoney: {
    marginTop: 20,
    marginLeft: 3,
  },
  addMoneyText: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#51DF3F",
  },
  content: {
    flexDirection: "column",
    paddingHorizontal: 20,
  },
  contentButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  contentButtonView: {
    flexDirection: "row",
  },
  contentButtonViewImage: {
    width: 100,
    height: 30,
    marginRight: 10,
  },
  contentButtonViewImageCash: {
    width: 100,
    height: 55,
    marginRight: 10,
  },
  contentButtonViewText: {
    fontWeight: "bold",
    fontSize: 18,
  },
});
