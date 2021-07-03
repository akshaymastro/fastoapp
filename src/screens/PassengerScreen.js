import React, { Component } from "react";
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
  BackHandler,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Feather from "react-native-vector-icons/Feather";
import MapView, { Marker, Callout, Polyline, Polygon } from "react-native-maps";
import Geolocation from "@react-native-community/geolocation";
import apiKey from "./google_api_key";
import _ from "lodash";
import socketIO from "socket.io-client";
import BottomButton from "../component/BottomButton";
import RBSheet from "react-native-raw-bottom-sheet";
import Geocoder from "react-native-geocoding";

import PassengerBottom from "./Passenger/passengerBottom";
import PickupContact from "./Passenger/PickupContact";
import DeliverContact from "./Passenger/DeliverContact";
import SelectCategory from "./Passenger/SelectCategory";
import SearchRide from "./Passenger/SearchRide";
import PaymentMethod from "./Passenger/PaymentMethod";
import BookingConfirm from "./Passenger/BookingConfirm";
import BookingConfirmMessage from "./Passenger/BookingConfirmMessage";
import CancelTrip from "./Passenger/CancelTrip";
import io from "socket.io-client";
import { connect } from "react-redux";
import { setRideData, bookRide } from "../redux/vehicle/action";
import jwtDecode from "jwt-decode";
import { getDistance } from "geolib";
import { getFare } from "../redux/ride/actions";
import { threadId } from "worker_threads";
import RestClient from "../utils/RestClient";
import axios from "axios";

const socket = io("https://fasto-backend.herokuapp.com/");

class PassengerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ridePrice: "",
      rideVehicalPrice: "",
      lookingForDriver: false,
      loadingTimer: false,

      driverIsOnTheWay: false,
      predictions: [],
      pickupPredictions: [],
      isModalVisible: false,
      isNextActive: false,
      pickupContact: false,
      selectCategory: false,
      passengerBottom: true,
      paymentMethod: false,
      searchRide: false,
      bookingConfirm: false,
      bookingConfirmMessage: false,
      cancelTrip: false,
      cancelRideReason: {
        id: "",
        name: "",
        Message: "",
      },
      RecInfo: "8909330839",
      RecInfo2: "Vikas Gupta",
      pickupDestination: "",
      pickUpLocation: {
        latitude: 12.9,
        longitude: 12.9,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0161,
      },
      VehicalSelected: {
        name: "",
        time: "",
        price: "",
        id: "",
        checked: "first",
        setChecked: "",
      },
      CouponInputVisible: false,
      coupon: "",
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000
    );
    this.onChangePickupDestinationDebounced = _.debounce(
      this.onChangePickupDestination,
      1000
    );
  }
  calcPrice = async () => {
    var getCurrentDisance = await axios.get(
      `https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${this.props?.vehicle?.rideData?.pickUpLocation?.coordinates[0]},${this.props?.vehicle?.rideData?.pickUpLocation?.coordinates[1]}&destinations=${this.props?.vehicle?.rideData?.dropLocation?.coordinates[0]},${this.props?.vehicle?.rideData?.dropLocation?.coordinates[1]}&key=AIzaSyCdX116ggJ_oadelay7Q5Sqme72S046Ch8`
    );

    // getDistance(
    //   (latitudeLocationPick = {
    //     lat: this.props?.vehicle?.currentRide?.pickUpLocation?.coordinates[0],
    //     long: this.props?.vehicle?.currentRide?.pickUpLocation?.coordinates[1],
    //   }),
    //   (latitudeLocationDrop = {
    //     lat: this.props?.vehicle?.currentRide?.dropLocation?.coordinates[0],
    //     long: this.props?.vehicle?.currentRide?.dropLocation?.coordinates[1],
    //   })
    // );
    const rideDistance =
      parseInt(getCurrentDisance?.data?.rows[0]?.elements[0]?.distance?.text) *
      1.60934;
    const vehiclePrice = this.state.rideVehicalPrice;

    if (rideDistance > 40) {
      const distance = parseInt(rideDistance) - 40;
      const params = {
        km: distance,
        city_name: this.state.pickupDestination,
      };
      const response = await fetch(
        "https://fasto-backend.herokuapp.com/basefare/getfare/",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(params),
        }
      );
      console.log(params, "paramsss");
      const result = await response.json();
      console.log(result, "result");
      const fuelCharge = result?.data[0]?.fuelcharge.fuelcharge || 0;
      this.setState({
        ridePrice: +fuelCharge + Math.floor(rideDistance * vehiclePrice),
      });
    } else {
      this.setState({
        ridePrice: Math.floor(rideDistance * vehiclePrice),
      });
    }
  };

  onBackPress = () => {
    BackHandler.exitApp();
    // Alert.alert(
    //   "Do you wish to exit the app?",
    //   "exit app",
    //   [
    //     {
    //       text: "Cancel",
    //       onPress: () => null,
    //       style: "cancel",
    //     },
    //     {
    //       text: "Yes",
    //       onPress: () => {
    //         BackHandler.exitApp();
    //       },
    //     },
    //   ],
    //   { cancelable: false }
    // );
  };

  componentDidMount() {
    Geocoder.init(apiKey); // use a valid API key
    BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    const lat = this.props.latitude;
    const long = this.props.longitude;
    const latLong = {
      latitude: lat,
      longitude: long,
    };

    lat &&
      long &&
      this.setState({
        pickUpLocation: latLong,
      });
    const token = jwtDecode(this.props.common.apiToken);
    this.props.setRideData({ key: "ByUserID", value: token.user._id });
    this.props.setRideData({ key: "passengerBottom", value: true });
    this.props.setRideData({ key: "pickupContact", value: false });
    // this.props.changeLocationPickUp(latLong);
  }
  componentDidUpdate(preProps, nextProps) {
    const lat = this.props.latitude;
    const long = this.props.longitude;

    if (
      lat != this.state.pickUpLocation.latitude ||
      long != this.state.pickUpLocation.longitude
    ) {
      const latLong = {
        latitude: lat,
        longitude: long,
      };
      lat &&
        long &&
        this.setState({
          pickUpLocation: latLong,
        });
    }
  }

  handleShow = () => {
    this.setState({
      isActive: true,
    });
  };

  handleHide = () => {
    this.setState({
      isActive: false,
    });
  };

  setChecked = (val) => {
    this.setState({
      setChecked: val,
    });
    // console.log(this.state.setChecked);
  };

  openModal() {
    this.setState({ isModalVisible: true });
  }

  closeModal() {
    this.setState({ isModalVisible: false });
  }

  ApplyCoupon = () => {
    this.setState({ CouponInputVisible: true });
  };

  _menu = null;

  setMenuRef = (ref) => {
    this._menu = ref;
  };

  hideMenu = () => {
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  async onChangePickupDestination(pickupDestination) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
    &input=${pickupDestination}&location=${this.props.latitude},${this.props.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        pickupPredictions: json.predictions,
      });
      // console.log("onChangePickupDestination ", json.predictions);
      //   Geocoder.from()
      // .then(json => {
      // 	var location = json.results[0].geometry.location;
      // 	console.log(location);
      // })
      // .catch(error => console.warn(error));
    } catch (err) {
      console.error(err);
    }
  }

  handleRegionChange = (data) => {
    // console.log(data);
  };

  async onChangeDestination(destination) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
        &input=${destination}&location=${this.props.latitude},${this.props.longitude}&radius=2000`;
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async requestDriver() {
    this.setState({ lookingForDriver: true });
    var socket = socketIO.connect("https://fasto-backend.herokuapp.com");

    socket.on("connect", () => {
      // console.log("client connected");
      //Request a taxi!
      socket.emit("taxiRequest", this.props.routeResponse);
    });

    socket.on("driverLocation", (driverLocation) => {
      const pointCoords = [...this.props.pointCoords, driverLocation];
      this.map.fitToCoordinates(pointCoords, {
        edgePadding: { top: 140, bottom: 20, left: 20, right: 20 },
      });
      this.setState({
        lookingForDriver: false,
        driverLocation,
        driverIsOnTheWay: true,
      });
    });
  }

  render() {
    const { navigation } = this.props;
    const { checked } = this.state;
    let marker = null;
    let getDriver = null;
    let cnfBooking = null;
    let findingDriverActIndicator = null;
    let driverMarker = null;

    if (this.props.latitude === null) return null;

    if (this.state.driverIsOnTheWay) {
      driverMarker = (
        <Marker coordinate={this.state.driverLocation}>
          <Image
            source={require("../assets/ace.png")}
            style={{ width: 40, height: 80 }}
          />
        </Marker>
      );
    }

    if (this.state.lookingForDriver) {
      findingDriverActIndicator = (
        <ActivityIndicator
          size="large"
          animating={this.state.lookingForDriver}
        />
      );
    }

    if (this.props.pointCoords.length > 1) {
      marker = (
        <Marker
          coordinate={this.props.pointCoords[this.props.pointCoords.length - 1]}
        />
      );

      cnfBooking = (
        <RBSheet
          ref={(ref) => {
            this[RBSheet + 7] = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: "center",
              alignItems: "center",
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
          }}
        >
          <View style={{ flex: 1 }}>
            {/* Top */}
            <View style={{ marginTop: 10 }}>
              {/* <Text style={{fontWeight:'bold',fontSize:16,color:'#3FC5EE'}}>Delivery Contact</Text> */}
              <Text style={{ fontWeight: "normal", fontSize: 16 }}>
                Driver will call this contact while delivery
              </Text>
            </View>
            {/* Main */}
            <View style={{ marginTop: 50 }}>
              <TextInput
                style={{
                  height: 45,
                  borderColor: "gray",
                  borderWidth: 1,
                  width: styles.ex.width - 30,
                  borderRadius: 15,
                  paddingLeft: 15,
                }}
                onChangeText={(RecInfo) => this.setState({ RecInfo })}
                value={this.state.RecInfo}
              />
              <TextInput
                style={{
                  height: 45,
                  borderColor: "gray",
                  borderWidth: 1,
                  width: styles.ex.width - 30,
                  marginTop: 30,
                  borderRadius: 15,
                  paddingLeft: 15,
                }}
                onChangeText={(RecInfo2) => this.setState({ RecInfo2 })}
                value={this.state.RecInfo2}
              />
            </View>
            {/* Bottom */}
            <View style={{ marginTop: 30 }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this[RBSheet + 8].open()}
              >
                <Text style={styles.buttonText}>CONFIRM BOOKING</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.requestDriver()}
              >
                <Text style={styles.buttonText}>Delete this button</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      );

      getDriver = (
        <View style={styles.InputField}>
          {/* Coupon Code */}
          <View
            style={{
              height: 50,
              width: "100%",
              backgroundColor: "#fff",
              justifyContent: "space-between",
              flexDirection: "row",
              paddingTop: 10,
              paddingLeft: 50,
              paddingRight: 30,
            }}
          >
            <FontAwesome name="gift" color="#f9a602" size={25} />
            <TouchableOpacity onPress={() => this.ApplyCoupon()}>
              {this.state.CouponInputVisible ? (
                <TextInput
                  style={{
                    height: 35,
                    borderColor: "gray",
                    borderWidth: 1,
                    width: 150,
                    borderRadius: 15,
                    paddingLeft: 15,
                  }}
                  onChangeText={(coupon) => this.setState({ coupon })}
                  value={this.state.coupon}
                  placeholder="APPLY COUPON"
                  autoCapitalize="characters"
                  returnKeyType="done"
                />
              ) : (
                <Text style={{ color: "#222546", fontWeight: "bold" }}>
                  Apply Coupon
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: "#cecece",
              borderBottomWidth: 1.5,
            }}
          />
          <View style={styles.InputAreaContact}>
            <View style={styles.InputAreaContactDetailsPickup}>
              <Text style={{ color: "#222546", fontWeight: "bold" }}>
                Pickup Contact
              </Text>
            </View>
            <View style={styles.InputAreaContactDetails}>
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {this.state.RecInfo == "8909330839" &&
                this.state.RecInfo2 == "Vikas Gupta" ? (
                  <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableOpacity
                      onPress={() => this.RBSheet.open()}
                      style={{
                        alignItems: "center",
                        justifyContent: "center",
                        paddingBottom: 20,
                      }}
                    >
                      <Text>
                        <Text style={{ color: "#222546", fontWeight: "bold" }}>
                          {this.state.RecInfo}
                        </Text>
                        <Text
                          style={{
                            color: "#222546",
                            fontWeight: "bold",
                            fontSize: 40,
                          }}
                        >
                          .
                        </Text>
                        <Text style={{ color: "#222546", fontWeight: "bold" }}>
                          {this.state.RecInfo2}
                        </Text>
                      </Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View>
                    <TouchableOpacity onPress={() => this.RBSheet.open()}>
                      <Text>
                        {this.state.RecInfo},{this.state.RecInfo2}
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "stretch",
              justifyContent: "space-between",
              paddingTop: 10,
            }}
          >
            {/* Payment Modal */}
            <TouchableOpacity
              style={{ marginLeft: 20, marginBottom: 20 }}
              onPress={() => this[RBSheet + 2].open()}
            >
              <View
                style={{
                  flex: 1,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <FontAwesome
                  name="credit-card"
                  color="#5BDC4E"
                  size={18}
                  style={{ paddingLeft: 10 }}
                />
                <Text style={{ paddingLeft: 10 }}>Cash</Text>
                <FontAwesome
                  name="chevron-up"
                  color="#BDBDBD"
                  size={12}
                  style={{ paddingLeft: 10 }}
                />
              </View>
            </TouchableOpacity>

            <BottomButton
              //onPressFunction={() => this.requestDriver()}
              onPressFunction={() => this[RBSheet + 7].open()}
              buttonText={"Book" + " " + this.state.VehicalSelected.name}
            >
              {findingDriverActIndicator}
            </BottomButton>
          </View>
        </View>
      );
    }

    const pickupPredictions = this.state.pickupPredictions.map((prediction) => (
      <TouchableHighlight
        key={prediction.id}
        onPress={async () => {
          const pickupDestinationName =
            prediction.structured_formatting.main_text;
          this.setState({
            pickupPredictions: [],
            pickupDestination: pickupDestinationName,
            pickupContact: true,
            passengerBottom: false,
          });

          //TODO
          Geocoder.from(pickupDestinationName)
            .then((json) => {
              var location = json.results[0].geometry.location;

              // console.log("geocode location :: ", location);
              let locationPayload = {
                latitude: location.lat,
                longitude: location.lng,
              };
              this.props.changeLocationPickUp(locationPayload);
              this.props.setRideData({
                key: "pickUpLocation",
                value: {
                  type: "Point",
                  coordinates: [location.lat, location.lng],
                },
              });
              this.setState({ pickUpLocation: locationPayload });
              var newRegion = {
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0161,
              };
              this.map.animateToRegion(newRegion, 1000);
            })
            .catch((error) => console.warn(error));
        }}
      >
        <Text style={styles.suggestions}>
          {prediction.structured_formatting.main_text}
        </Text>
      </TouchableHighlight>
    ));

    const predictions = this.state.predictions.map((prediction) => (
      <TouchableHighlight
        onPress={async () => {
          const destinationName = await this.props.getRouteDirections(
            prediction.place_id,
            prediction.structured_formatting.main_text
          );

          this.setState({
            predictions: [],
            destination: destinationName,
            passengerBottom: false,
            deliverContact: true,
          });

          //TODO
          Geocoder.from(destinationName)
            .then((json) => {
              var location = json.results[0].geometry.location;

              // console.log("geocode Drop location :: ", location);
              let droplocationPayload = {
                latitude: location.lat,
                longitude: location.lng,
              };

              this.props.setRideData({
                key: "dropLocation",
                value: {
                  type: "Point",
                  coordinates: [location.lat, location.lng],
                },
              });
              this.setState({ dropLocation: droplocationPayload });
            })
            .catch((error) => console.warn(error));

          this.map.fitToCoordinates(this.props.pointCoords, {
            edgePadding: { top: 20, bottom: 20, left: 20, right: 20 },
          });
          this[RBSheet + 4].open();
        }}
        key={prediction.id}
      >
        <View>
          <Text style={styles.suggestions}>
            {prediction.structured_formatting.main_text}
          </Text>
        </View>
      </TouchableHighlight>
    ));
    return (
      <View style={styles.top}>
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
        </View>
        <View style={[styles.actionLocker, { paddingHorizontal: 10 }]}>
          <View style={styles.action_first_search}>
            <Feather
              name="search"
              color="green"
              size={20}
              style={styles.feather}
            />
            <TextInput
              placeholder="Pickup Location.."
              value={this.state.pickupDestination}
              style={styles.textInput}
              clearButtonMode="always"
              onChangeText={(pickupDestination) => {
                this.setState({ pickupDestination });
                this.onChangePickupDestinationDebounced(pickupDestination);
                Geolocation.getCurrentPosition(
                  (position = this.state.pickupDestination) =>
                    console.log("DataLocation", position)
                );
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ passengerBottom: false, pickupContact: true });
                this.props.setRideData({
                  key: "pickupContact",
                  value: true,
                });
                this.props.setRideData({
                  key: "passengerBottom",
                  value: false,
                });
              }}
            >
              <Image
                source={require("../assets/phone-book-icon.png")}
                style={styles.phone_book}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.action, { marginLeft: 10 }]}>
            <Feather
              name="search"
              color="green"
              size={20}
              style={styles.feather}
            />
            <TextInput
              placeholder="Drop Location"
              value={this.state.destination}
              style={styles.textInput}
              clearButtonMode="always"
              onChangeText={(destination) => {
                this.setState({ destination });
                this.onChangeDestinationDebounced(destination);
              }}
            />
            <TouchableOpacity
              onPress={() => {
                this.setState({ passengerBottom: false, deliverContact: true });
                this.props.setRideData({
                  key: "deliverContact",
                  value: true,
                });
              }}
            >
              <Image
                source={require("../assets/phone-book-icon.png")}
                style={styles.phone_book}
              />
            </TouchableOpacity>
          </View>
        </View>
        {predictions}
        {pickupPredictions}

        {/* <TouchableOpacity 
     style={styles.bottomButton}
     onPress={()=>  this[RBSheet + 4].open()}
     >
          <Text style={styles.bottomButtonText}>Next</Text>
      </TouchableOpacity> 

         */}

        {/* <Button
           title="Go to Details Screen"
           onPress={() => navigation.navigate("Details")}
         />   */}

        {/* <View style={styles.action}>
         <Text >Turn On Device Location </Text>
         <MaterialIcons 
          name="navigate-next"
         color="blue"
          size={20}
         />
         </View>  */}
        <MapView
          ref={(map) => {
            this.map = map;
          }}
          zoomEnabled={true}
          style={styles.map}
          //  customMapStyle={theme =(theme.dark ? mapDarkStyle : mapStanderedStyle)}
          initialRegion={{
            latitude: this.props.latitude,
            longitude: this.props.longitude,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0161,
          }}
          showsUserLocation={true}
          paddingAdjustmentBehavior="always"
          showsCompass={true}
          followUserLocation={true}
          loadingEnabled={true}
          onRegionChangeComplete={this.handleRegionChange}
        >
          <Polyline
            coordinates={this.props.pointCoords}
            strokeWidth={4}
            strokeColor="#f9a602"
          />
          {marker}
          {driverMarker}

          <Marker
            position={"center"}
            draggable
            onDragEnd={(e) => {
              this.props.changeLocationPickUp(e.nativeEvent.coordinate);
              Geocoder.from(
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude
              )
                .then((json) => {
                  var addressComponent = json.results[0].address_components[0];
                  // console.log("addressComponent :: ", addressComponent);
                  this.setState({
                    pickupDestination: addressComponent.short_name,
                  });
                })
                .catch((error) => console.warn(error));
            }}
            coordinate={
              this.state && this.state.pickUpLocation != null
                ? this.state.pickUpLocation
                : {
                    latitude: 26.46289,
                    longitude: 86.462899,
                  }
            }
            // coordinate = {this.props}
            image={require("../assets/marker.png")}
            title="Location Title"
            description="this is the discription"
          >
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}> Favorite Location </Text>
                  {/* <Text>A Short description</Text>   */}
                  <Image
                    style={styles.image}
                    source={require("../assets/logo-white-back.png")}
                    resizeMode="stretch"
                  />
                </View>
                <View style={styles.arrowBorder} />
                <View style={styles.arrow} />
              </View>
            </Callout>
          </Marker>

          {/* <StatusBar barStyle={theme.dark ? "light-content" : "dark-content"} /> */}
        </MapView>

        {this.props.vehicle.rideData.pickupContact !== false ? (
          <View style={styles.passengerBottom}>
            <PickupContact />
          </View>
        ) : null}
        {!this.props.vehicle.rideData.deliverContact === false ? (
          <View style={styles.passengerBottom}>
            <DeliverContact />
          </View>
        ) : null}
        {!this.state.selectCategory === false ? (
          <View style={styles.passengerBottom}>
            <SelectCategory />
            <View style={styles.passengerBottomViewAlone}>
              <TouchableOpacity
                style={styles.passengerBottomButton}
                onPress={() => {
                  this.setState({
                    selectCategory: false,
                    passengerBottom: true,
                  });
                }}
              >
                <Text style={styles.passengerBottomText}>Ok</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}
        {this.props.vehicle.rideData.passengerBottom ? (
          <View style={styles.passengerBottom}>
            <PassengerBottom
              getVehiclePrice={(rideVehicalPrice) =>
                this.setState({ rideVehicalPrice })
              }
            />
            <View style={styles.passengerBottomView}>
              <TouchableOpacity
                style={styles.passengerBottomButton}
                onPress={() => {
                  this.setState({
                    selectCategory: true,
                    passengerBottom: false,
                  });
                }}
              >
                <Text style={styles.passengerBottomText}>Goods Category</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.passengerBottomButton}
                onPress={() => {
                  // this.props.bookRide(this.props.vehicle.rideData);
                  this.props.setRideData({
                    key: "paymentMethod",
                    value: true,
                  });
                  this.props.setRideData({
                    key: "passengerBottom",
                    value: false,
                  });
                  this.calcPrice();
                }}
              >
                <Text style={styles.passengerBottomText}>Next</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {this.props.vehicle.rideData.searchRide ? (
          <View style={styles.passengerBottom}>
            <SearchRide ridePrice={this.state.ridePrice} />
            <View style={styles.passengerBottomView}>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={styles.passengerBottomButtonCancel}
                  onPress={() => {
                    this.setState({ searchRide: false, cancelTrip: true });
                  }}
                >
                  <FontAwesome
                    name="window-close"
                    color="red"
                    size={25}
                    borderRadius={15}
                  />
                  <Text style={styles.passengerBottomTextCancel}>
                    Cancel Trip
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity
                  style={styles.passengerBottomButton}
                  onPress={() => {
                    this.setState({
                      searchRide: false,
                      bookingConfirmMessage: true,
                      bookingConfirm: true,
                    });
                  }}
                >
                  <Text style={styles.passengerBottomTextCancel}>
                    Cnf Booking
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        ) : null}

        {this.props.vehicle.rideData.paymentMethod ? (
          <View style={styles.passengerBottom}>
            <PaymentMethod />
            <View style={styles.passengerBottomViewAlone}>
              <TouchableOpacity
                style={styles.passengerBottomButton}
                onPress={() => {
                  this.props.setRideData({
                    key: "paymentMethod",
                    value: false,
                  });
                  this.props.setRideData({
                    key: "searchRide",
                    value: true,
                  });
                  this.props.bookRide(this.props.vehicle.rideData);
                  this.requestDriver();
                }}
              >
                <Text style={styles.passengerBottomText}>Book Now</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {this.state.bookingConfirm ? (
          <BookingConfirm
            ridePrice={this.state.ridePrice}
            onChange={(value) => this.setState(value)}
          />
        ) : null}

        {this.props.vehicle.rideStatus === true ? (
          <BookingConfirmMessage onChange={(value) => this.setState(value)} />
        ) : null}

        {this.state.cancelTrip ? (
          <CancelTrip onChange={(value) => this.setState(value)} />
        ) : null}

        {cnfBooking}
      </View>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    vehicle: state.vehicle,
    common: state.common,
    fare: state.ride,
  };
};
export default connect(mapStateToProps, { setRideData, bookRide, getFare })(
  PassengerScreen
);
const styles = StyleSheet.create({
  suggestions: {
    backgroundColor: "white",
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
  bottomButton: {
    backgroundColor: "black",
    marginTop: "auto",
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: "center",
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 10,
    color: "black",
  },
  action: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 1,
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    borderLeftWidth: 15,
    borderLeftColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  action_first_search: {
    flexDirection: "row",
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#f2f2f2",
    paddingBottom: 1,
    width: "48%",
    backgroundColor: "white",
    borderRadius: 10,
    borderLeftWidth: 15,
    borderLeftColor: "#47e11d",
    justifyContent: "center",
    alignItems: "center",
  },
  actionLocker: {
    flexDirection: "row",
  },
  top: {
    flex: 1,
  },
  feather: {
    marginLeft: 2,
  },
  opneLocation: {
    color: "blue",
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    height: "100%",
    zIndex: -9999,
  },
  bubble: {
    flexDirection: "column",
    alignSelf: "flex-start",
    backgroundColor: "#fff",
    borderRadius: 6,
    borderColor: "#ccc",
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#fff",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: "transparent",
    borderColor: "transparent",
    borderTopColor: "#007a87",
    borderWidth: 16,
    alignSelf: "center",
    marginTop: -0.5,
  },
  name: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 150,
    height: 80,
  },
  textStyle: {
    marginLeft: 30,
    padding: 5,
    color: "black",
    backgroundColor: "white",
    fontSize: 14,
    borderWidth: 1,
  },
  InputArea: {
    flexDirection: "row",
    marginTop: "auto",
    backgroundColor: "#fff",
  },
  InputField: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginTop: "auto",
  },
  TouchableOpacity: {
    padding: 10,
    width: "25%",
    alignItems: "center",
  },
  tempoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  toselected: {
    fontWeight: "bold",
  },
  tempoImageSelected: {
    width: 80,
    height: 80,
    borderRadius: 0,
    borderColor: "black",
    borderWidth: 1,
  },
  InputAreaContact: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomColor: "grey",
    borderBottomWidth: 1,
  },
  InputAreaContactDetails: {
    width: "50%",
    alignItems: "center",
    flexDirection: "row",
    color: "blue",
    justifyContent: "center",
  },
  InputAreaContactDetailsPickup: {
    width: "50%",
    alignItems: "center",
    fontSize: 15,
  },
  InputAreaContactDetailsText: {
    fontWeight: "bold",
  },
  category: {
    padding: 20,
    textAlignVertical: "center",
    textAlign: "center",
  },
  categoryItem: {
    padding: 5,
    textAlignVertical: "center",
  },
  ex: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
  view: {
    justifyContent: "flex-end",
    margin: 0,
  },
  button: {
    backgroundColor: "#FF9633",
    width: Dimensions.get("window").width - 30,
    height: 40,
    borderRadius: 25,
    justifyContent: "center",
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  column: {
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    flexWrap: "wrap",
    flex: 1,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  boldText: {
    fontWeight: "bold",
  },
  normalText: {},

  textCenter: {
    textAlign: "center",
    fontSize: 18,
    marginTop: 15,
  },
  selectCategory: {
    borderRadius: 5,
    borderColor: "#fff",
    color: "#000",
    textAlign: "center",
    width: "100%",
  },
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  drawrButton: {
    width: 50,
    height: 50,
    margin: 0,
  },
  phone_book: {
    width: 20,
    height: 25,
    marginRight: 8,
  },
  headerNav: {
    justifyContent: "flex-start",
    padding: 10,
    width: 65,
  },
  capacity: {
    flexDirection: "row",
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
  passengerBottomViewAlone: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 10,
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
  passengerBottomButtonCancel: {
    alignItems: "center",
    textAlign: "center",
    width: 100,
    flexDirection: "row",
  },
  passengerBottomTextCancel: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "left",
    color: "black",
    marginLeft: 10,
  },
  passengerBottomButtonInfo: {
    backgroundColor: "green",
    padding: 10,
    borderRadius: 15,
    width: 150,
  },
  passengerBottomTextInfo: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  passengerBottomText: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
  cross: {
    borderRadius: 25,
  },
});
