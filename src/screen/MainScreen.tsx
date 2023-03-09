import React from "react";
import { Button, Text, View, StyleSheet } from "react-native";
import { Audio } from "expo-av";
import RadioStation from "./components/radioStation";

const MainScreen = () => {
  const sound = new Audio.Sound();

  async function playSound() {
    try {
      await sound.loadAsync({ uri: "https://stream.hitfm.md:8443/HitFM" });
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
      <RadioStation />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default MainScreen;
