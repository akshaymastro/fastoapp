import React, {Component, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  Text,
  Button,
  Image,
  TextInput,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  Dimensions,
  Platform,
} from 'react-native';
import {usetheme} from '@react-navigation/native';

import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from '../node_modules/react-native-paper';
import MapView, {
  PROVIDER_GOOGLE,
  Marker,
  Callout,
  Polyline,
} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import apiKey from './google_api_key';
import _ from 'lodash';
import socketIO from 'socket.io-client';
import BottomButton from '../component/BottomButton';
import Select2 from 'react-native-select-two';
import RBSheet from 'react-native-raw-bottom-sheet';
import {Divider, List, RadioButton} from 'react-native-paper';
import Menu, {MenuItem, MenuDivider} from 'react-native-material-menu';
import Geocoder from 'react-native-geocoding';

import PassengerBottom from './Passenger/passengerBottom';
import PickupContact from './Passenger/PickupContact';
import DeliverContact from './Passenger/DeliverContact';
import SelectCategory from './Passenger/SelectCategory';

export default class PassengerScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lookingForDriver: false,
      driverIsOnTheWay: false,
      predictions: [],
      pickupPredictions: [],
      isModalVisible: false,
      isNextActive: false,
      pickupContact: false,
      selectCategory: false,
      passengerBottom: true,
      RecInfo: '8909330839',
      RecInfo2: 'Vikas Gupta',
      pickupDestination: '',
      pickUpLocation: {
        latitude: 12.9,
        longitude: 12.9,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0161,
      },
      VehicalSelected: {
        name: '',
        time: '',
        price: '',
        id: '',
        checked: 'first',
        setChecked: '',
      },
      CouponInputVisible: false,
      coupon: '',
    };
    this.onChangeDestinationDebounced = _.debounce(
      this.onChangeDestination,
      1000,
    );
    this.onChangePickupDestinationDebounced = _.debounce(
      this.onChangePickupDestination,
      1000,
    );
  }

  componentDidMount() {
    Geocoder.init(apiKey); // use a valid API key

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
    console.log('checking props :: ', this.props);
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

  setChecked = val => {
    this.setState({
      setChecked: val,
    });
    console.log(this.state.setChecked);
  };

  openModal() {
    this.setState({isModalVisible: true});
  }

  closeModal() {
    this.setState({isModalVisible: false});
  }

  ApplyCoupon = () => {
    this.setState({CouponInputVisible: true});
  };

  _menu = null;

  setMenuRef = ref => {
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
    console.log(' This is pickup Destination url', apiUrl);
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        pickupPredictions: json.predictions,
      });
      console.log('onChangePickupDestination ', json.predictions);
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

  handleRegionChange = data => {
    console.log(data);
  };

  async onChangeDestination(destination) {
    const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${apiKey}
        &input=${destination}&location=${this.props.latitude},${this.props.longitude}&radius=2000`;
    console.log(apiUrl);
    try {
      const result = await fetch(apiUrl);
      const json = await result.json();
      this.setState({
        predictions: json.predictions,
      });
      console.log(json);
    } catch (err) {
      console.error(err);
    }
  }

  async requestDriver() {
    this.setState({lookingForDriver: true});
    var socket = socketIO.connect(
      'https://CanineHopefulFonts--thevisionclicks.repl.co',
    );

    socket.on('connect', () => {
      console.log('client connected');
      //Request a taxi!
      socket.emit('taxiRequest', this.props.routeResponse);
    });

    socket.on('driverLocation', driverLocation => {
      const pointCoords = [...this.props.pointCoords, driverLocation];
      this.map.fitToCoordinates(pointCoords, {
        edgePadding: {top: 140, bottom: 20, left: 20, right: 20},
      });
      this.setState({
        lookingForDriver: false,
        driverIsOnTheWay: true,
        driverLocation,
      });
    });
  }

  render() {
    const {navigation} = this.props;
    const {checked} = this.state;
    let marker = null;
    let getDriver = null;
    let srchRide = null;
    let paymentMode = null;
    let cnfBooking = null;

    let findingDriverActIndicator = null;
    let driverMarker = null;

    if (this.props.latitude === null) return null;

    if (this.state.driverIsOnTheWay) {
      driverMarker = (
        <Marker coordinate={this.state.driverLocation}>
          <Image
            source={require('../assets/ace.png')}
            style={{width: 40, height: 80}}
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

      srchRide = (
        <RBSheet
          ref={ref => {
            this[RBSheet + 8] = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
          }}>
          <View style={{flex: 1}}>
            {/* Top */}
            <View style={{marginTop: 10}}>
              {/* <Text style={{fontWeight:'bold',fontSize:16,color:'#3FC5EE'}}>Delivery Contact</Text> */}
              <View
                style={{
                  height: 5,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <FontAwesome
                  name="window-minimize"
                  color="#D7D7D7"
                  size={25}
                  style={{paddingLeft: 10, paddingRight: 10}}
                />
              </View>
            </View>
            {/* Main */}
            <View style={{marginTop: 30}}>
              <View
                style={{
                  height: 60,
                  borderColor: 'gray',
                  width: styles.ex.width - 30,
                  paddingLeft: 10,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/tempo/eeco.png')}
                  style={{width: 60, height: 60}}
                />
                <View>
                  <Text
                    style={{
                      fontWeight: 'bold',
                      fontSize: 16,
                      marginTop: 5,
                      marginLeft: 10,
                    }}>
                    Ace Helper
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 16,
                      color: 'gray',
                      marginTop: 5,
                      marginLeft: 10,
                    }}>
                    Searching for driver...
                  </Text>
                  <Text
                    style={{
                      fontWeight: 'normal',
                      fontSize: 12,
                      color: '#FF1D6B',
                      marginTop: 5,
                      marginLeft: 10,
                    }}>
                    Booking will be cancelled if not allocated in 9:50
                  </Text>
                </View>
              </View>
              <View
                style={{
                  borderBottomColor: '#cecece',
                  borderBottomWidth: 1,
                  marginTop: 20,
                }}
              />
              <View
                style={{
                  height: 60,
                  borderColor: 'gray',
                  width: styles.ex.width - 30,
                  paddingLeft: 10,
                  backgroundColor: '#fff',
                  flexDirection: 'row',
                }}>
                <Image
                  source={require('../assets/cash1.png')}
                  style={{width: 50, height: 50, marginTop: 10}}
                />
                <View style={{marginTop: 20, marginLeft: 10}}>
                  <Text style={{fontWeight: 'bold', fontSize: 16}}>
                    ₹ 920 Cash
                  </Text>
                </View>
              </View>
            </View>
            <View
              style={{
                borderBottomColor: '#cecece',
                borderBottomWidth: 1,
                marginTop: 20,
              }}
            />
            {/* Bottom */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 50,
              }}>
              <TouchableOpacity
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <FontAwesome
                  name="window-close"
                  color="#5BDC4E"
                  size={18}
                  style={{paddingLeft: 10, paddingRight: 10}}
                />
                <Text>CANCEL TRIP</Text>
              </TouchableOpacity>
              <Text
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  fontSize: 25,
                  color: '#D7D7D7',
                }}>
                |
              </Text>
              <TouchableOpacity
                style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                <FontAwesome
                  name="info-circle"
                  color="#5BDC4E"
                  size={18}
                  style={{paddingRight: 10}}
                />
                <Text style={{paddingRight: 20}}>INFO</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      );
      cnfBooking = (
        <RBSheet
          ref={ref => {
            this[RBSheet + 7] = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
          }}>
          <View style={{flex: 1}}>
            {/* Top */}
            <View style={{marginTop: 10}}>
              {/* <Text style={{fontWeight:'bold',fontSize:16,color:'#3FC5EE'}}>Delivery Contact</Text> */}
              <Text style={{fontWeight: 'normal', fontSize: 16}}>
                Driver will call this contact while delivery
              </Text>
            </View>
            {/* Main */}
            <View style={{marginTop: 50}}>
              <TextInput
                style={{
                  height: 45,
                  borderColor: 'gray',
                  borderWidth: 1,
                  width: styles.ex.width - 30,
                  borderRadius: 15,
                  paddingLeft: 15,
                }}
                onChangeText={RecInfo => this.setState({RecInfo})}
                value={this.state.RecInfo}
              />
              <TextInput
                style={{
                  height: 45,
                  borderColor: 'gray',
                  borderWidth: 1,
                  width: styles.ex.width - 30,
                  marginTop: 30,
                  borderRadius: 15,
                  paddingLeft: 15,
                }}
                onChangeText={RecInfo2 => this.setState({RecInfo2})}
                value={this.state.RecInfo2}
              />
            </View>
            {/* Bottom */}
            <View style={{marginTop: 30}}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this[RBSheet + 8].open()}>
                <Text style={styles.buttonText}>CONFIRM BOOKING</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.button}
                onPress={() => this.requestDriver()}>
                <Text style={styles.buttonText}>Delete this button</Text>
              </TouchableOpacity>
            </View>
          </View>
        </RBSheet>
      );

      paymentMode = (
        <RBSheet
          ref={ref => {
            this[RBSheet + 2] = ref;
          }}
          height={300}
          openDuration={250}
          customStyles={{
            container: {
              justifyContent: 'center',
              alignItems: 'center',
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
            },
          }}>
          <View style={{flex: 1}}>
            {/* Top */}
            <View style={{marginTop: 20, marginLeft: 20, flexDirection: 'row'}}>
              <Text>
                <Text style={{fontWeight: 'bold', fontSize: 16, color: '#000'}}>
                  Credits
                </Text>
                <Text style={{color: '#fff'}}>---</Text>
                <Text>₹ 0.00</Text>
              </Text>
              <TouchableOpacity style={{marginTop: 20, marginLeft: 3}}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 16, color: '#51DF3F'}}>
                  Add money
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{marginTop: 20, marginLeft: 3}}
                onPress={() => this[RBSheet + 7].open()}>
                <Text
                  style={{fontWeight: 'bold', fontSize: 16, color: '#51DF3F'}}>
                  Next
                </Text>
              </TouchableOpacity>
            </View>
            {/* Main */}
            <View style={{marginTop: 10}}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
                onPress={() => {
                  this.setState({checked: 'first'});
                }}>
                <Image
                  source={require('../assets/paytmlogo.jpg')}
                  style={{width: 100, height: 30}}
                />
                <Text style={{fontWeight: 'bold', fontSize: 18}}>
                  Paytm Wallet
                </Text>
                <RadioButton
                  value="first"
                  status={checked === 'first' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({checked: 'first'});
                  }}
                />
              </TouchableOpacity>
              <View
                style={{
                  borderBottomColor: '#cecece',
                  borderBottomWidth: 1,
                }}
              />
              <TouchableOpacity
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: 100,
                }}
                onPress={() => {
                  this.setState({checked: 'second'});
                }}>
                <Image
                  source={require('../assets/cash1.png')}
                  style={{width: 100, height: 55}}
                />
                <Text style={{fontWeight: 'bold', fontSize: 18}}>Cash</Text>
                <RadioButton
                  value="second"
                  status={checked === 'second' ? 'checked' : 'unchecked'}
                  onPress={() => {
                    this.setState({checked: 'second'});
                  }}
                />
              </TouchableOpacity>
            </View>
            {/* Bottom */}
            <View style={{marginTop: 30}}>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Update</Text>
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
              width: '100%',
              backgroundColor: '#fff',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingTop: 10,
              paddingLeft: 50,
              paddingRight: 30,
            }}>
            <FontAwesome name="gift" color="#f9a602" size={25} />
            <TouchableOpacity onPress={() => this.ApplyCoupon()}>
              {this.state.CouponInputVisible ? (
                <TextInput
                  style={{
                    height: 35,
                    borderColor: 'gray',
                    borderWidth: 1,
                    width: 150,
                    borderRadius: 15,
                    paddingLeft: 15,
                  }}
                  onChangeText={coupon => this.setState({coupon})}
                  value={this.state.coupon}
                  placeholder="APPLY COUPON"
                  autoCapitalize="characters"
                  returnKeyType="done"
                />
              ) : (
                <Text style={{color: '#222546', fontWeight: 'bold'}}>
                  Apply Coupon
                </Text>
              )}
            </TouchableOpacity>
          </View>
          <View
            style={{
              borderBottomColor: '#cecece',
              borderBottomWidth: 1.5,
            }}
          />
          <View style={styles.InputAreaContact}>
            <View style={styles.InputAreaContactDetailsPickup}>
              <Text style={{color: '#222546', fontWeight: 'bold'}}>
                Pickup Contact
              </Text>
            </View>
            <View style={styles.InputAreaContactDetails}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                {this.state.RecInfo == '8909330839' &&
                this.state.RecInfo2 == 'Vikas Gupta' ? (
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <TouchableOpacity
                      onPress={() => this.RBSheet.open()}
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingBottom: 20,
                      }}>
                      <Text>
                        <Text style={{color: '#222546', fontWeight: 'bold'}}>
                          {this.state.RecInfo}
                        </Text>
                        <Text
                          style={{
                            color: '#222546',
                            fontWeight: 'bold',
                            fontSize: 40,
                          }}>
                          .
                        </Text>
                        <Text style={{color: '#222546', fontWeight: 'bold'}}>
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
              flexDirection: 'row',
              alignItems: 'stretch',
              justifyContent: 'space-between',
              paddingTop: 10,
            }}>
            {/* Payment Modal */}
            <TouchableOpacity
              style={{marginLeft: 20, marginBottom: 20}}
              onPress={() => this[RBSheet + 2].open()}>
              <View
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <FontAwesome
                  name="credit-card"
                  color="#5BDC4E"
                  size={18}
                  style={{paddingLeft: 10}}
                />
                <Text style={{paddingLeft: 10}}>Cash</Text>
                <FontAwesome
                  name="chevron-up"
                  color="#BDBDBD"
                  size={12}
                  style={{paddingLeft: 10}}
                />
              </View>
            </TouchableOpacity>

            <BottomButton
              //onPressFunction={() => this.requestDriver()}
              onPressFunction={() => this[RBSheet + 7].open()}
              buttonText={'Book' + ' ' + this.state.VehicalSelected.name}>
              {findingDriverActIndicator}
            </BottomButton>
          </View>
        </View>
      );
    }

    const pickupPredictions = this.state.pickupPredictions.map(prediction => (
      <TouchableHighlight
        key={prediction.id}
        onPress={async () => {
          const pickupDestinationName =
            prediction.structured_formatting.main_text;
          this.setState({
            pickupPredictions: [],
            pickupDestination: pickupDestinationName,
          });

          //TODO
          Geocoder.from(pickupDestinationName)
            .then(json => {
              var location = json.results[0].geometry.location;

              console.log('geocode location :: ', location);
              let locationPayload = {
                latitude: location.lat,
                longitude: location.lng,
              };
              this.props.changeLocationPickUp(locationPayload);
              this.setState({pickUpLocation: locationPayload});
              var newRegion = {
                latitude: location.lat,
                longitude: location.lng,
                latitudeDelta: 0.015,
                longitudeDelta: 0.0161,
              };
              this.map.animateToRegion(newRegion, 1000);
            })
            .catch(error => console.warn(error));
        }}>
        <Text style={styles.suggestions}>
          {prediction.structured_formatting.main_text}
        </Text>
      </TouchableHighlight>
    ));

    const predictions = this.state.predictions.map(prediction => (
      <TouchableHighlight
        onPress={async () => {
          const destinationName = await this.props.getRouteDirections(
            prediction.place_id,
            prediction.structured_formatting.main_text,
          );

          this.setState({predictions: [], destination: destinationName});
          this.map.fitToCoordinates(this.props.pointCoords, {
            edgePadding: {top: 20, bottom: 20, left: 20, right: 20},
          });
          this[RBSheet + 4].open();
        }}
        key={prediction.id}>
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
            }}>
            <Image
              source={require('../assets/drawrIcon.png')}
              style={styles.drawrButton}
            />
          </TouchableOpacity>
        </View>
        <View style={[styles.actionLocker, {paddingHorizontal: 10}]}>
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
              onChangeText={pickupDestination => {
                console.log(pickupDestination);
                this.setState({pickupDestination});
                this.onChangePickupDestinationDebounced(pickupDestination);
              }}
            />
            <TouchableOpacity onPress={() => this[RBSheet + 15].open()}>
              <Image
                source={require('../assets/phone-book-icon.png')}
                style={styles.phone_book}
              />
            </TouchableOpacity>
          </View>

          <View style={[styles.action, {marginLeft: 10}]}>
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
              onChangeText={destination => {
                console.log(destination);
                this.setState({destination});
                this.onChangeDestinationDebounced(destination);
              }}
            />
            <TouchableOpacity onPress={() => this[RBSheet + 3].open()}>
              <Image
                source={require('../assets/phone-book-icon.png')}
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
          ref={map => {
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
          onRegionChangeComplete={this.handleRegionChange}>
          <Polyline
            coordinates={this.props.pointCoords}
            strokeWidth={4}
            strokeColor="#f9a602"
          />
          {marker}
          {driverMarker}

          <Marker
            position={'center'}
            // draggable

            onDragEnd={e => {
              this.props.changeLocationPickUp(e.nativeEvent.coordinate);
              Geocoder.from(
                e.nativeEvent.coordinate.latitude,
                e.nativeEvent.coordinate.longitude,
              )
                .then(json => {
                  var addressComponent = json.results[0].address_components[0];
                  console.log('addressComponent :: ', addressComponent);
                  this.setState({
                    pickupDestination: addressComponent.short_name,
                  });
                })
                .catch(error => console.warn(error));
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
            image={require('../assets/marker.png')}
            title="Location Title"
            description="this is the discription">
            <Callout tooltip>
              <View>
                <View style={styles.bubble}>
                  <Text style={styles.name}> Favorite Location </Text>
                  {/* <Text>A Short description</Text>   */}
                  <Image
                    style={styles.image}
                    source={require('../assets/logo-white-back.png')}
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

        {!this.state.pickupContact === false ? <PickupContact /> : null}
        {!this.state.deliverContact === false ? <DeliverContact /> : null}
        {!this.state.selectCategory === false ? <SelectCategory /> : null}
        {this.state.passengerBottom ? (
          <View style={styles.passengerBottom}>
            <PassengerBottom />
            <View style={styles.passengerBottomView}>
              <TouchableOpacity
                style={styles.passengerBottomButton}
                onPress={() => {
                  this.setState({selectCategory: true, passengerBottom: false});
                }}>
                <Text style={styles.passengerBottomText}>Goods Category</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : null}

        {cnfBooking}
        {srchRide}
        {paymentMode}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  suggestions: {
    backgroundColor: 'white',
    padding: 5,
    fontSize: 18,
    borderWidth: 0.5,
    marginLeft: 5,
    marginRight: 5,
  },
  bottomButton: {
    backgroundColor: 'black',
    marginTop: 'auto',
    margin: 20,
    padding: 15,
    paddingLeft: 30,
    paddingRight: 30,
    alignSelf: 'center',
  },
  bottomButtonText: {
    color: 'white',
    fontSize: 20,
  },
  destinationInput: {
    height: 40,
    borderWidth: 1,
    marginTop: 50,
    marginLeft: 5,
    marginRight: 5,
    backgroundColor: 'white',
  },
  textInput: {
    flex: 1,
    marginTop: 5,
    paddingLeft: 10,
    color: 'black',
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 1,
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderLeftWidth: 15,
    borderLeftColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
  action_first_search: {
    flexDirection: 'row',
    marginTop: 0,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
    paddingBottom: 1,
    width: '48%',
    backgroundColor: 'white',
    borderRadius: 10,
    borderLeftWidth: 15,
    borderLeftColor: '#47e11d',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionLocker: {
    flexDirection: 'row',
  },
  top: {
    flex: 1,
  },
  feather: {
    marginLeft: 2,
  },
  opneLocation: {
    color: 'blue',
  },

  map: {
    ...StyleSheet.absoluteFillObject,
    height: '100%',
    zIndex: -9999,
  },
  bubble: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderRadius: 6,
    borderColor: '#ccc',
    borderWidth: 0.5,
    padding: 15,
    width: 150,
  },
  arrow: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#fff',
    borderWidth: 16,
    alignSelf: 'center',
    marginTop: -32,
  },
  arrowBorder: {
    backgroundColor: 'transparent',
    borderColor: 'transparent',
    borderTopColor: '#007a87',
    borderWidth: 16,
    alignSelf: 'center',
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
    color: 'black',
    backgroundColor: 'white',
    fontSize: 14,
    borderWidth: 1,
  },
  InputArea: {
    flexDirection: 'row',
    marginTop: 'auto',
    backgroundColor: '#fff',
  },
  InputField: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 'auto',
  },
  TouchableOpacity: {
    padding: 10,
    width: '25%',
    alignItems: 'center',
  },
  tempoImage: {
    width: 80,
    height: 80,
    borderRadius: 20,
  },
  toselected: {
    fontWeight: 'bold',
  },
  tempoImageSelected: {
    width: 80,
    height: 80,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  InputAreaContact: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
  },
  InputAreaContactDetails: {
    width: '50%',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'blue',
    justifyContent: 'center',
  },
  InputAreaContactDetailsPickup: {
    width: '50%',
    alignItems: 'center',
    fontSize: 15,
  },
  InputAreaContactDetailsText: {
    fontWeight: 'bold',
  },
  category: {
    padding: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
  categoryItem: {
    padding: 5,
    textAlignVertical: 'center',
  },
  ex: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  view: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  button: {
    backgroundColor: '#FF9633',
    width: Dimensions.get('window').width - 30,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
  },
  bullet: {
    width: 10,
  },
  bulletText: {
    flex: 1,
  },
  boldText: {
    fontWeight: 'bold',
  },
  normalText: {},

  textCenter: {
    textAlign: 'center',
    fontSize: 18,
    marginTop: 15,
  },
  selectCategory: {
    borderRadius: 5,
    borderColor: '#fff',
    color: '#000',
    textAlign: 'center',
    width: '100%',
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },

  selectedView: {
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#f9f9f9',
    shadowOffset: {width: 50, height: 20},
    shadowColor: '#fff',
    shadowOpacity: 10,
    elevation: 15,
    zIndex: 9999,
    marginTop: -30,
    margin: 10,
    height: 150,
    width: 120,
    padding: 0,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  selectedViewText: {
    flexDirection: 'row',
  },
  selectedViewImage: {
    width: 80,
    height: 80,
  },

  selectedViewImageSelected: {
    width: 80,
    height: 80,
    borderRadius: 0,
    borderColor: 'black',
    borderWidth: 1,
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
    justifyContent: 'flex-start',
    padding: 10,
    paddingTop: 40,
  },
  capacity: {
    flexDirection: 'row',
  },
  passengerBottom: {
    marginTop: 'auto',
    backgroundColor: 'transparent',
  },
  passengerBottomView: {
    alignItems: 'flex-end',
  },
  passengerBottomButton: {
    backgroundColor: 'yellow',
    padding: 10,
    borderRadius: 15,
  },
  passengerBottomText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});
