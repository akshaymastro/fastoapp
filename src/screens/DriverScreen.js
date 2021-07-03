import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  ActivityIndicator,
  Linking,
  Platform,
  Alert,
  TouchableOpacity,
} from "react-native";
import MapView, { Polyline, Marker } from "react-native-maps";
import BottomButton from "../component/BottomButton";
import io from "socket.io-client";
import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import Geolocation from "@react-native-community/geolocation";
import SearchRides from "./driver/SearchRides";
import RideInfo from "./driver/RideInfo";
import OtpSubmit from "./driver/OtpSubmit";
import DropLocation from "./driver/DropLocation";
import UnloadingTimer from "./driver/UnloadingTimer";
import TripInvoice from "./invoice/TripInvoice";
import { connect } from "react-redux";
import AsyncStorage from "@react-native-community/async-storage";
import jwtDecode from "jwt-decode";
import LoadingTimer from "./driver/loadingTimer";
import { rideAccepted } from "../redux/vehicle/action";
const socket = io("https://fasto-backend.herokuapp.com/");
class Driver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookingForPassengers: false,
      onlineStatus: false,
      rideAccept: false,
      startTrip: false,
      otpSubmit: false,
      dropLocation: false,
      unloadingTimer: false,
      loadingTimer: false,
      tripInvoice: false,
    };
    this.acceptPassengerRequest = this.acceptPassengerRequest.bind(this);
    this.findPassengers = this.findPassengers.bind(this);
  }

  async componentDidMount() {
    BackgroundGeolocation.configure({
      desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
      stationaryRadius: 50,
      distanceFilter: 50,
      debug: false,
      startOnBoot: false,
      stopOnTerminate: true,
      locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
      interval: 10000,
      fastestInterval: 5000,
      activitiesInterval: 10000,
      stopOnStillActivity: false,
    });
    const lat = await AsyncStorage.getItem("lat");
    const long = await AsyncStorage.getItem("long");
    console.log(lat, "latitude");
    console.log(long, "long");
    console.log(this.props.common.apiToken, "long");
    const decoded = jwtDecode(this.props.common.apiToken);
    console.log(decoded.user._id, "decodedd");
    socket.emit("updateRiderLocation", {
      id: decoded.user._id,
      type: "Point",
      coordinates: { lat: JSON.parse(long), long: JSON.parse(lat) },
    });
    BackgroundGeolocation.on("authorization", (status) => {
      console.log(
        "[INFO] BackgroundGeolocation authorization status: " + status
      );
      if (status !== BackgroundGeolocation.AUTHORIZED) {
        // we need to set delay or otherwise alert may not be shown
        setTimeout(
          () =>
            Alert.alert(
              "App requires location tracking permission",
              "Would you like to open app settings?",
              [
                {
                  text: "Yes",
                  onPress: () => BackgroundGeolocation.showAppSettings(),
                },
                {
                  text: "No",
                  onPress: () => console.log("No Pressed"),
                  style: "cancel",
                },
              ]
            ),
          1000
        );
      }
    });
    console.log(this.props.pointCoords, "pointcoords");
  }

  findPassengers = () => {
    console.log("helllllllo");
    socket.emit("passengerRequest");

    socket.on("taxiRequest", async (routeResponse) => {
      console.log(routeResponse, "aeddasdasd");
      this.setState({
        lookingForPassengers: false,
        passengerFound: true,
        routeResponse,
      });
      console.log(this.props.common.apiToken);
      let decoded = jwtDecode(this.props.common.apiToken);
      console.log(decoded.user.currentLocation.coordinates, "decodedd");
      const res = await this.props.getRoutedriverDirections(
        this.props?.vehicle?.selectedRide?.pickUpLocation?.coordinates[0],
        this.props?.vehicle?.selectedRide?.pickUpLocation?.coordinates[1],
        decoded.user.currentLocation.coordinates[0],
        decoded.user.currentLocation.coordinates[1]
      );
      console.log(res, "jasjdjsdjs");
      this.map.fitToCoordinates(this.props.pointCoords, {
        edgePadding: { top: 20, bottom: 20, left: 20, right: 20 },
      });
    });
    this.props.rideAccepted();
  };

  acceptPassengerRequest = () => {
    console.log(this.props.latitude, "latititue");
    socket.emit("driverLocation", {
      latitude: this.props.latitude,
      longitude: this.props.longitude,
    });

    const passengerLocation = this.props?.vehicle?.selectedRide;
    console.log(passengerLocation.pickUpLocation.coordinates[0], "location");
    console.log(passengerLocation.pickUpLocation.coordinates[1], "location");

    BackgroundGeolocation.on("location", (location) => {
      //Send driver location to passenger
      socket.emit("driverLocation", {
        latitude: location.latitude,
        longitude: location.longitude,
      });
    });

    BackgroundGeolocation.checkStatus((status) => {
      // you don't need to check status before start (this is just the example)
      if (!status.isRunning) {
        BackgroundGeolocation.start(); //triggers start on start event
      }
    });

    if (Platform.OS === "ios") {
      Linking.openURL(
        `http://maps.apple.com/?daddr=${passengerLocation.pickUpLocation.coordinates[0]},${passengerLocation.pickUpLocation.coordinates[1]}`
      );
    } else {
      Linking.openURL(
        `geo:0,0?q=${passengerLocation.pickUpLocation.coordinates[0]},${passengerLocation.pickUpLocation.coordinates[1]}(Passenger)`
      );
    }
  };
  render() {
    console.log(this.props?.vehicle?.current, "current location");
    let endMarker = null;
    let startMarker = null;
    let findingPassengerActIndicator = null;
    let passengerSearchText = "FIND PASSENGERS 👥";
    let bottomButtonFunction = this.findPassengers;
    const { navigation } = this.props;

    if (this.props.latitude === null) return null;

    if (this.state.lookingForPassengers) {
      passengerSearchText = "FINDING PASSENGERS...";
      findingPassengerActIndicator = (
        <ActivityIndicator
          size="large"
          animating={this.state.lookingForPassengers}
        />
      );
    }

    if (this.state.passengerFound) {
      passengerSearchText = "FOUND PASSENGER! ACCEPT RIDE?";
      bottomButtonFunction = this.acceptPassengerRequest;
    }

    if (this.props.pointCoords.length > 1) {
      endMarker = (
        <Marker
          coordinate={this.props.pointCoords[this.props.pointCoords.length - 1]}
        >
          <Image
            style={{ width: 40, height: 40 }}
            source={require("../assets/map_marker.png")}
          />
        </Marker>
      );
    }

    return (
      <View style={styles.container}>
        <View style={styles.headerNav}>
          <TouchableOpacity
            onPress={() => {
              navigation.toggleDrawer();
            }}
          >
            <Image
              source={require("../assets/drawrIcon.png")}
              style={styles.drawrButton}
            />
          </TouchableOpacity>
          {!this.state.rideAccept ? (
            <View style={styles.bottomButton}>
              <TouchableOpacity
                style={styles.online}
                onPress={() => {
                  this.setState({
                    onlineStatus: false,
                  });
                }}
              >
                <Text style={styles.onlineText}>offline</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.offline}
                onPress={() => {
                  this.setState({
                    onlineStatus: true,
                  });
                }}
              >
                <Text style={styles.offlineText}>online</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
        <MapView
          ref={(map) => {
            this.map = map;
          }}
          style={styles.map}
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          showsUserLocation={true}
        >
          <Polyline
            coordinates={this.props.pointCoords}
            strokeWidth={4}
            strokeColor="red"
          />
          {endMarker}
          {startMarker}
        </MapView>
        {/* <BottomButton
          onPressFunction={bottomButtonFunction}
          buttonText={passengerSearchText}>
          {findingPassengerActIndicator}
        </BottomButton> */}

        {!this.state.onlineStatus ? <View style={styles.back}></View> : null}
        {this.state.onlineStatus ? (
          <View style={{ flex: 1 }}>
            {!this.state.rideAccept ? (
              <SearchRides
                onChange={(value) => this.setState(value)}
                acceptPassengerRequest={this.acceptPassengerRequest}
                findPassengers={this.findPassengers}
              />
            ) : null}
          </View>
        ) : null}

        {this.state.startTrip ? (
          <RideInfo onChange={(value) => this.setState(value)} />
        ) : null}
        {this.state.otpSubmit ? (
          <OtpSubmit onChange={(value) => this.setState(value)} />
        ) : null}
        {this.state.dropLocation ? (
          <DropLocation onChange={(value) => this.setState(value)} />
        ) : null}
        {this.state.loadingTimer ? (
          <LoadingTimer onChange={(value) => this.setState(value)} />
        ) : null}
        {this.state.unloadingTimer ? (
          <UnloadingTimer onChange={(value) => this.setState(value)} />
        ) : null}
        {this.state.tripInvoice ? (
          <TripInvoice onChange={(value) => this.setState(value)} />
        ) : null}
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    common: state.common,
    vehicle: state.vehicle,
  };
};
export default connect(mapStateToProps, { rideAccepted })(Driver);
const styles = StyleSheet.create({
  findDriver: {
    backgroundColor: "black",
    marginTop: "auto",
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center",
  },
  findDriverText: {
    fontSize: 20,
    color: "white",
    fontWeight: "600",
  },
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
  destinationInput: {
    height: 40,
    borderWidth: 0.5,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    padding: 5,
    backgroundColor: "white",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  headerNav: {
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 10,
    zIndex: 9999,
  },
  drawrButton: {
    width: 50,
    height: 50,
    margin: 0,
  },
  bottomButton: {
    flexDirection: "row",
    justifyContent: "flex-start",
    zIndex: 9999,
    width: "100%",
  },
  online: {
    backgroundColor: "red",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 5,
    marginLeft: 20,
  },
  onlineText: {
    fontSize: 18,
    color: "white",
  },
  offline: {
    backgroundColor: "green",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginVertical: 5,
    marginLeft: 20,
  },
  offlineText: {
    fontSize: 18,
    color: "white",
  },
  back: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 99,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    height: "100%",
  },
});
