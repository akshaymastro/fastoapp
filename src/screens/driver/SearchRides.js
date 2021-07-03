import jwtDecode from "jwt-decode";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
import AsyncStorage from "@react-native-community/async-storage";
import Geocoder from "react-native-geocoder";
import { getIpAddress } from "react-native-device-info";
import { fetchUserDetails } from "../../redux/auth/actions";
import { selectRide } from "../../redux/vehicle/action";
// import jwtDecode from "jwt-decode";

const socket = io("https://fasto-backend.herokuapp.com/");

const SearchRides = (props) => {
  const dispatch = useDispatch();
  const [driver, setDriver] = useState({});
  const [rides, setRides] = useState([]);
  const { apiToken } = useSelector((state) => state.common);
  const auth = useSelector((state) => state.auth);
  const vehicle = useSelector((state) => state.vehicle);
  useEffect(() => {
    async function getRides() {
      const lat = await AsyncStorage.getItem("lat");
      const long = await AsyncStorage.getItem("long");
      if (lat !== null && long !== null) {
        let decoded;
        if (apiToken !== "") {
          decoded = jwtDecode(apiToken);
          console.log(decoded.user.currentLocation.coordinates, "decodedd");
          console.log(auth, "current Location");
          await dispatch(fetchUserDetails((res) => setDriver(res.data)));
          socket.emit("getRidesForDriver", {
            coordinates: decoded.user.currentLocation.coordinates,
          });
          socket.on("NearByRideList", (res) => setRides(res));
        }
      }
    }
    getRides();
  }, []);
  const acceptRide = () => {
    socket.emit("acceptride", {
      id: vehicle.selectedRide._id,
      status: "accepted",
      driveId: auth?.userDetail?._id,
    });
  };
  const [state, setState] = useState({
    selectedRide: {
      isAlert: false,
      pickupPoint: "",
      dropPoint: "",
      distance: "",
      estFair: "",
      goodsType: "",
    },
    availableRide: [
      {
        id: 1,
        pickupPoint: "Rohini Sector 5",
        dropPoint: "Punjabi Bagh",
        distance: "25",
        estFair: "465",
        goodsType: "surgicle",
      },
      {
        id: 2,
        pickupPoint: "IGI international Airport",
        dropPoint: "Kasmiri Gate",
        distance: "11",
        estFair: "1000",
        goodsType: "food",
      },
      {
        id: 3,
        pickupPoint: "Delhi",
        dropPoint: "Gurugram",
        distance: "50",
        estFair: "800",
        goodsType: "metal",
      },
      {
        id: 4,
        pickupPoint: "Rohini Sector 5",
        dropPoint: "Punjabi Bagh",
        distance: "25",
        estFair: "1200",
        goodsType: "books",
      },
    ],
  });

  const { selectedRide } = state;
  const { availableTrips } = useSelector((state) => state?.vehicle);
  console.log("\n\r__TEST11__ ", availableTrips);

  return (
    <View style={styles.container}>
      {state.selectedRide.isAlert ? (
        <View style={styles.notification}>
          <LinearGradient
            start={{ x: 0.0, y: 3.5 }}
            end={{ x: 1.1, y: 1.0 }}
            locations={[0, 0.5, 0.501]}
            colors={["#222546", "#3a3e66", "#71759c"]}
            style={styles.linearGradient}
          >
            <Text style={styles.uinText}>ALERT</Text>
          </LinearGradient>

          <View style={styles.notificationContent}>
            <Text style={styles.notificationContentHead}>Trip Information</Text>
            <View>
              <LinearGradient
                start={{ x: 0.0, y: 4.5 }}
                end={{ x: 2.1, y: 1.0 }}
                locations={[0, 0.5, 0.6]}
                colors={["#fdfacf", "#fed517", "#fdfacf"]}
                style={styles.notificationContentDetailes}
              >
                <View style={styles.notificationContentDetailesView}>
                  <Text
                    style={[
                      { color: "green" },
                      styles.notificationContentDetailesMainText,
                    ]}
                  >
                    Pickup Point :{" "}
                  </Text>
                  <Text
                    style={styles.notificationContentDetailesText}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                  >
                    {selectedRide.pickupPoint}{" "}
                  </Text>
                </View>
                <View style={styles.notificationContentDetailesView}>
                  <Text
                    style={[
                      { color: "red" },
                      styles.notificationContentDetailesMainText,
                    ]}
                  >
                    Drop Point :{" "}
                  </Text>
                  <Text
                    style={styles.notificationContentDetailesText}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                  >
                    {selectedRide.dropPoint}{" "}
                  </Text>
                </View>
                <View style={styles.notificationContentDetailesView}>
                  <Text
                    style={[
                      { color: "#3b3e67" },
                      styles.notificationContentDetailesMainText,
                    ]}
                  >
                    Distance :{" "}
                  </Text>
                  <Text
                    style={styles.notificationContentDetailesText}
                    numberOfLines={1}
                    ellipsizeMode={"tail"}
                  >
                    {selectedRide.distance} Km
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View>
              <LinearGradient
                start={{ x: 0.0, y: 6.0 }}
                end={{ x: 2.1, y: 1.0 }}
                locations={[0, 0.5, 0.6]}
                colors={["#fdfacf", "#fed517", "#fdfacf"]}
                style={styles.notificationContentDetailes}
              >
                <View style={styles.notificationContentDetailesView}>
                  <Text
                    style={[
                      { color: "#3b3e67" },
                      styles.notificationContentDetailesMainText,
                    ]}
                  >
                    EST. Fair :{" "}
                  </Text>
                  <Text style={styles.notificationContentDetailesText}>
                    ₹ {selectedRide.estFair} /-{" "}
                  </Text>
                </View>
                <View style={styles.notificationContentDetailesView}>
                  <Text
                    style={[
                      { color: "#3b3e67" },
                      styles.notificationContentDetailesMainText,
                    ]}
                  >
                    Goods Type :{" "}
                  </Text>
                  <Text style={styles.notificationContentDetailesText}>
                    {selectedRide.goodsType}
                  </Text>
                </View>
              </LinearGradient>
            </View>
            <View style={styles.acceptView}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => {
                  acceptRide();
                  props.acceptPassengerRequest();
                  props.findPassengers();
                  props.onChange({
                    rideAccept: true,
                    startTrip: true,
                  });
                }}
              >
                <Text style={styles.acceptButtonText}>Accept</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : null}
      <View style={styles.Subcontainer}>
        <View style={styles.availableRides}>
          <View style={styles.availableRidesHead}>
            <Text style={styles.availableRidesHeadText}>Available Trips</Text>
            <Text style={styles.availableRidesHeadNumber}>5</Text>
          </View>

          <View style={styles.availableRidesContent}>
            {rides?.map((ride, id) => {
              return (
                <TouchableOpacity
                  style={styles.availableRidesContentButton}
                  onPress={() => {
                    dispatch(selectRide(ride));
                    setState({
                      ...state,
                      selectedRide: {
                        isAlert: true,
                        pickupPoint: ride.pickupPoint,
                        dropPoint: ride.dropPoint,
                        distance: ride.distance,
                        estFair: ride.estFair,
                        goodsType: ride.goodsType,
                      },
                    });
                  }}
                  key={id}
                >
                  <View style={styles.availableRidesContentButtonBox}></View>
                  <Text
                    style={styles.availableRidesContentButtonText}
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    Fare {ride.estFair}, {ride.distance}Km, From{" "}
                    {ride.pickupPoint} to {ride.dropPoint}
                  </Text>
                  {/* <Text
                    style={styles.availableRidesContentButtonText}
                    numberOfLines={2}
                    ellipsizeMode={"tail"}
                  >
                    Fare {selectedRide.estFair}, {selectedRide.distance} Km,
                    From {selectedRide.pickupPoint} to {selectedRide.dropPoint}
                  </Text> */}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </View>
    </View>
  );
};

export default SearchRides;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  Subcontainer: {
    alignItems: "center",
    marginTop: "auto",
  },
  notification: {
    backgroundColor: "white",
    width: "95%",
  },
  linearGradient: {
    padding: 10,
    width: "100%",
  },
  uinText: {
    fontWeight: "bold",
    color: "white",
    textAlign: "center",
    fontSize: 21,
  },
  notificationContent: {
    paddingHorizontal: 10,
  },
  notificationContentHead: {
    textDecorationLine: "underline",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  notificationContentDetailes: {
    width: "100%",
    backgroundColor: "#ffd306",
    padding: 10,
    borderRadius: 15,
    marginTop: 10,
  },
  notificationContentDetailesView: {
    flexDirection: "row",
  },
  notificationContentDetailesMainText: {
    fontWeight: "bold",
    fontSize: 15,
    width: 110,
  },
  notificationContentDetailesText: {
    fontSize: 15,
  },
  acceptView: {
    alignItems: "center",
    marginVertical: 10,
  },
  acceptButton: {
    backgroundColor: "#3b3e67",
    padding: 10,
    fontSize: 15,
    width: 100,
    borderRadius: 10,
  },
  acceptButtonText: {
    textAlign: "center",
    color: "white",
  },
  availableRides: {
    marginTop: "auto",
    backgroundColor: "white",
    padding: 10,
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
    width: "100%",
    height: 250,
  },
  availableRidesHead: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  availableRidesHeadNumber: {
    backgroundColor: "red",
    color: "white",
    borderRadius: 20,
    width: 30,
    height: 30,
    textAlign: "center",
    textAlignVertical: "center",
    marginLeft: 10,
  },
  availableRidesHeadText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    textDecorationLine: "underline",
  },
  availableRidesContent: {},
  availableRidesContentButtonBox: {
    width: 10,
    height: 10,
    backgroundColor: "#3b316e",
    marginHorizontal: 5,
  },
  availableRidesContentButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f2f2f2",
    paddingVertical: 8,
    borderBottomColor: "#fff",
    borderBottomWidth: 2,
  },
  availableRidesContentButtonText: {},
});
