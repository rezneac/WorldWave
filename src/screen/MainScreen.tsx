import React from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import RadioStation from "../components/radioStation";

const MainScreen = () => {
  const sound = new Audio.Sound();

  const radioStation = require("../content/radio_info.json");

  async function playSound(uri: string) {
    try {
      await sound.loadAsync({ uri });
      await sound.playAsync();
    } catch (error) {
      console.log("Error loading or playing sound", error);
    }
  }

  async function stopSound() {
    try {
      await sound.stopAsync();
      await sound.unloadAsync();
    } catch (error) {
      console.log("Error stopping or unloading sound", error);
    }
  }

  return (
    <View style={styles.container}>

      {/* Displays list of radio stations */}
      <FlatList
        data={radioStation}
        keyExtractor={(item) => item.stationName}
        numColumns={3}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => playSound(radioStation[index].url)}
            >
              <View style={styles.radioStationView}>
                <RadioStation details={radioStation} index={index} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  radioStationView: {
    margin: 10,
  },
});

export default MainScreen;
