import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from "react-native";

import FontAwesome from "react-native-vector-icons/FontAwesome";
import AboutVehicle from "./AboutVehicle";
import { getVehicleList, setRideData } from "../../redux/vehicle/action";
import { useDispatch, useSelector } from "react-redux";
const PassengerBottom = (props) => {
  const dispatch = useDispatch();
  const { vehicle, rideData } = useSelector((state) => state.vehicle);

  useEffect(() => {
    async function getVehicle() {
      await dispatch(getVehicleList());
    }
    getVehicle();
  }, []);
  const [selectedVehical, setselctedVehical] = useState({
    Name: "Select Vehicle",
    url: "",
    urlImage: require(`../../assets/tempo/default.jpg`),
    Capacity: "...",
    Size: "...",
    Time: "5 Mins",
    Cost: "600",
    select: "",
    aboutVehicle: false,
    list: [
      // {
      //   id: 1,
      //   Name: "Tata Ace",
      //   Capacity: "750Kg",
      //   Size: "7x4x5 FT.",
      //   urlImage: require(`../../assets/tempo/tata-ace.png`),
      //   isSlected: false,
      //   Time: "5 Mins",
      //   Cost: "600",
      // },
      // {
      //   id: 2,
      //   Name: "Tata Ape",
      //   Capacity: "850Kg",
      //   Size: "8x6x8 FT.",
      //   urlImage: require(`../../assets/tempo/pick-up.png`),
      //   isSlected: false,
      //   Time: "8 Mins",
      //   Cost: "800",
      // },
      // {
      //   id: 3,
      //   Name: "Eco",
      //   Capacity: "950Kg",
      //   Size: "9x6x5 FT.",
      //   urlImage: require(`../../assets/tempo/eeco.png`),
      //   isSlected: false,
      //   Time: "10 Mins",
      //   Cost: "1000",
      // },
      // {
      //   id: 4,
      //   Name: "Pickup",
      //   Capacity: "1050Kg",
      //   Size: "5x4x3 FT.",
      //   urlImage: require(`../../assets/tempo/tata-ace.png`),
      //   isSlected: false,
      //   Time: "15 Mins",
      //   Cost: "1200",
      // },
    ],
  });

  const { Name, urlImage, Capacity, Size, list, select, aboutVehicle, url } =
    selectedVehical;

  // console.log("this", vehicle);
  // console.log("this riderdata", rideData);

  return (
    <View>
      {aboutVehicle ? (
        <AboutVehicle onChange={(value) => setselctedVehical(value)} />
      ) : (
        <View style={styles.InputArea}>
          <View style={styles.selectedView}>
            <View style={styles.selectedViewText}>
              <Text>{Name}</Text>
              <TouchableOpacity
                style={{ marginLeft: 5 }}
                onPress={() => this[RBSheet + 1].open()}
              >
                <FontAwesome name="info-circle" color="#f9a602" size={18} />
              </TouchableOpacity>
            </View>

            <Image
              source={url !== "" ? { uri: url } : urlImage}
              width={45}
              style={styles.selectedViewImage}
            />
            <View style={styles.capacity}>
              <Text>Capacity:</Text>
              <Text>{Capacity}</Text>
            </View>
            <View style={styles.capacity}>
              <Text>Size:</Text>
              <Text>{Size}</Text>
            </View>
          </View>

          <ScrollView horizontal={true} invertStickyHeaders={true}>
            {vehicle?.map((lists, id) => {
              return (
                <TouchableOpacity
                  style={styles.ScrollVehicleItem}
                  onPress={() => {
                    setselctedVehical({
                      ...selectedVehical,
                      Name: lists.vehical_name,
                      Size: lists.vehical_size,
                      Capacity: lists.vehical_capacity,
                      select: lists._id,
                      url: lists.vehical_image,
                    });
                    props.getVehiclePrice(lists.vehical_KM);
                    props.calPrice(lists.vehical_KM);
                    dispatch(
                      setRideData({
                        key: "vehicalSelected",
                        value: lists._id,
                      })
                    );
                  }}
                  key={id}
                >
                  <Text style={select === lists._id ? styles.toselected : null}>
                    {lists.vehical_name}
                  </Text>

                  <Image
                    source={{ uri: lists.vehical_image }}
                    width={55}
                    style={styles.tempoImageSelected}
                  />
                  <Text style={select === lists._id ? styles.toselected : null}>
                    ₹ {props.ridePrice}
                  </Text>
                  {!select > 0 ? null : (
                    <View style={{ flex: 1 }}>
                      <Text
                        style={select === lists._id ? styles.toselected : null}
                      >
                        {lists.Time}
                      </Text>
                      <View style={{ flex: 1, flexDirection: "row" }}>
                        <Text
                          style={
                            select === lists._id ? styles.toselected : null
                          }
                        >
                          ₹ {props.ridePrice}
                        </Text>

                        <TouchableOpacity
                          style={{ marginLeft: 5 }}
                          onPress={() =>
                            setselctedVehical({
                              ...selectedVehical,
                              aboutVehicle: true,
                            })
                          }
                        >
                          <FontAwesome
                            name="info-circle"
                            color="#f9a602"
                            size={18}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default PassengerBottom;

const styles = StyleSheet.create({
  top: {
    flex: 1,
  },
  InputArea: {
    flexDirection: "row",
    marginTop: "auto",
    backgroundColor: "#fff",
    height: 150,
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
    height: 150,
    width: 120,
    padding: 0,
    alignItems: "center",
    backgroundColor: "white",
  },
  selectedViewText: {
    flexDirection: "row",
  },
  selectedViewImage: {
    width: 80,
    height: 80,
  },

  selectedViewImageSelected: {
    width: 80,
    height: 80,
    borderRadius: 0,
    borderColor: "black",
    borderWidth: 1,
  },
  ScrollVehicleItem: {
    padding: 5,
    alignItems: "center",
    justifyContent: "center",
    width: 100,
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
  capacity: {
    flexDirection: "row",
  },
});
