import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import RadioStation from '../components/UI/radioStation';
import PlayerManagerMenu from '../components/UI/PlayerManagerMenu';
import {PlayerManager} from '../components/playerManagePlayback/PlayerManager';
import TrackPlayer, {State, Event} from 'react-native-track-player';

const MainScreen = () => {
  const radioStation = require('../content/radio_info.json');
  const {playTrack} = PlayerManager();
  const [display, setDisplay] = useState(false);

  async function manageSound(uri: string, index: number, stationName: string) {
    playTrack(uri, index, stationName);
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
              onPress={() =>
                manageSound(
                  radioStation[index].url,
                  index,
                  radioStation[index].stationName,
                )
              }>
              <View style={styles.radioStationView}>
                <RadioStation details={radioStation} index={index} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <PlayerManagerMenu />
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
