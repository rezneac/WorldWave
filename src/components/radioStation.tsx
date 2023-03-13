import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";

const radioStation = (prop: any) => {
  return (
    <View style={styles.mainView}>
      <View style={styles.stationView}>
        <View style={styles.imageView}>
          <Image source={require("../../assets/favicon.png")} />
        </View>

        <View style={styles.stationNameView}>
          <Text>{prop.details[prop.index].stationName}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    height: 120,
    width: 100,
    backgroundColor: "#ffffff",
    borderRadius: 3.5,
  },
  stationView: {
    flexDirection: "column",
    flex: 1,
  },
  stationNameView: {
    height: 20,
    width: 100,
    backgroundColor: "#C5C5C5",
    alignItems: "center",
    flex: 1,
    borderBottomStartRadius: 3.5,
    borderBottomEndRadius: 3.5,
    opacity: 50,
  },
  imageView: {
    height: 53,
    width: 100,
    flex: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default radioStation;
