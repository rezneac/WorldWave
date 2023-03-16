import React, { useState } from "react";
import { View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import { Audio } from "expo-av";
import RadioStation from "../components/radioStation";

const MainScreen = () => {
  const [SwitchMode, SetSwitchMode] = useState(false);
  const sound = new Audio.Sound();

  const radioStation = require("../content/radio_info.json");

  async function manageSound(uri: string) {
    try {
      if (!sound._loaded) {
        await sound.loadAsync({ uri });
        await sound.playAsync();
      } else {
        await sound.stopAsync();
        await sound.unloadAsync();
      }
    } catch (error) {
      console.log("Error loading or playing sound", error);
    }
  }

  return (
    <View style={styles.container}>
      {/* Displays list of radio stations */}
      <FlatList
        data={radioStation}
        keyExtractor={(item) => item.stationName}
        numColumns={3}
        initialNumToRender={50}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => manageSound(radioStation[index].url)}
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
    alignItems: "center",
    justifyContent: "center",
  },
  radioStationView: {
    margin: 10,
  },
});

export default MainScreen;
