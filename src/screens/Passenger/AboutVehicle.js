import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";

import { Divider } from "react-native-paper";

const AboutVehicle = (props) => {
  console.log("about", props);

  return (
    <View style={styles.container}>
      {/* Top */}
      <View style={{ marginTop: 10 }}>
        <Text>
          <Image
            source={require("../../assets/tempo/eeco.png")}
            style={{ width: 30, height: 30, paddingLeft: 20 }}
          />
          <Text style={{ color: "#fff" }}>--</Text>
          <Text style={{ fontWeight: "bold", fontSize: 16 }}>Tata Ace</Text>
        </Text>
        <Text style={{ fontWeight: "normal", fontSize: 16 }}>
          Driver will call this contact while pickup
        </Text>
      </View>
      {/* Main */}
      <View style={{ marginTop: 50 }}>
        <View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 40,
              backgroundColor: "#EEEEEE",
            }}
          >
            <Text>Capacity</Text>
            <Text>750 KGS</Text>
          </View>
          <Divider />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              height: 40,
              backgroundColor: "#EEEEEE",
            }}
          >
            <Text>Size</Text>
            <Text>7 X 4 X 5</Text>
          </View>
        </View>
        <View>
          <View>
            <Text>
              {"\u2022"}
              <Text style={styles.boldText}>
                Fare includes 60 mins free loading & unloading time
              </Text>
            </Text>
            <Text>
              {"\u2022"}
              <Text style={styles.boldText}>
                Fare includes 60 mins free loading & unloading time
              </Text>
            </Text>
            <Text>
              {"\u2022"}
              <Text style={styles.boldText}>
                Fare includes 60 mins free loading & unloading time
              </Text>
            </Text>
            <Text>
              {"\u2022"}
              <Text style={styles.boldText}>
                Fare includes 60 mins free loading & unloading time
              </Text>
            </Text>
            <Text>
              {"\u2022"}
              <Text style={styles.boldText}>
                Fare includes 60 mins free loading & unloading time
              </Text>
            </Text>
            <Text>
              {"\u2022"}
              <Text style={styles.boldText}>
                Fare includes 60 mins free loading & unloading time
              </Text>
            </Text>
            <Text>
              {"\u2022"}
              <Text style={styles.boldText}>
                Fare includes 60 mins free loading & unloading time
              </Text>
            </Text>
          </View>
        </View>
      </View>
      {/* Bottom */}
      <View style={{ marginTop: 100 }}>
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            props.onChange({
              aboutVehicle: false,
            })
          }
        >
          <Text style={styles.buttonText}>Okay</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AboutVehicle;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: "#fff",
  },
  boldText: {
    fontWeight: "bold",
  },
});
