import React, {useState, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import RadioStation from '../components/UI/RadioStation';
import PlayerManagerMenu from '../components/UI/BottomMenu';
import {PlayerManager} from '../components/playerManagePlayback/PlayerManager';

const MainScreen = () => {
  const radioStation = require('../content/radio_info.json');
  const {playTrack} = PlayerManager();
  const [display, setDisplay] = useState(false);

  async function manageSound(
    uri: string,
    stationName: string,
    imageUri: string,
  ) {
    console.log(imageUri);
    playTrack(uri, stationName, imageUri);
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
                  radioStation[index].stationName,
                  radioStation[index].radioimg,
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
