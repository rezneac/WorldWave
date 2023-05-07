import React from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
// import { Audio } from "expo-av";
import RadioStation from '../components/radioStation';
import TrackPlayer, {State} from 'react-native-track-player';

const MainScreen = () => {
  const radioStation = require('../content/radio_info.json');

  // const sound = new Audio.Sound();

  async function manageSound(uri: string) {
    console.log(uri);
    const state = await TrackPlayer.getState();

    // await TrackPlayer.add({
    //   id: 'trackId',
    //   url: uri,
    //   title: 'Track Title',
    //   artist: 'Track Artist',
    //   // artwork: require('track.png')
    // });

    // await TrackPlayer.play();

    try {
      if (state === State.Playing) {
        await TrackPlayer.reset();

        await TrackPlayer.add({
          id: 'trackId',
          url: uri,
          title: 'Track Title',
          artist: 'Track Artist',
          // artwork: require('track.png')
        });
        await TrackPlayer.play();
      } else {
        await TrackPlayer.add({
          id: 'trackId',
          url: uri,
          title: 'Track Title',
          artist: 'Track Artist',
          // artwork: require('track.png')
        });

        await TrackPlayer.play();
      }
    } catch (error) {
      console.log('Error loading or playing sound', error);
    }
  }

  return (
    <View style={styles.container}>
      {/* Displays list of radio stations */}
      <FlatList
        data={radioStation}
        keyExtractor={item => item.stationName}
        numColumns={3}
        initialNumToRender={50}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => manageSound(radioStation[index].url)}>
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioStationView: {
    margin: 10,
  },
});

export default MainScreen;
