import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text, Dimensions} from 'react-native';
import RadioStation from '../components/UI/RadioStation';
import PlayerManagerMenu from '../components/UI/BottomMenu';
import {PlayerManager} from '../components/playerManagePlayback/PlayerManager';
import ContextMenu from '../components/UI/ContextMenuPopUp';
import {store, persistor} from '../../src/store/persistStore';

const MainScreen = () => {
  const radioStation = require('../content/radio_info.json');
  const {playTrack} = PlayerManager();
  const [display, setDisplay] = useState(false);
  const currentStation = useRef<string>('None');

  const [positionPressed, setPositionPressed] = useState({x: 0, y: 0});

  const handleAddNewStation = (stationUri: string, stationName: string) => {
    //checks if we already have this station as favourite in store
    const stationExists = store
      .getState()
      .stations.some(station => station.imageUri === stationUri && station.stationName === stationName);

    if (!stationExists) {
      console.log('added new station to store: ' + stationName);
      store.dispatch({
        type: 'ADD_NEW_STATION',
        stationUri: stationUri,
        stationName: stationName,
      });
    }

    console.log('Test stores Main: ' + store.getState());
  };

  const onDisplayHandler = (value: boolean) => {
    setDisplay(value);
  };

  // TODO: decide to keep it or delete
  // const handleLongPress = (event: any) => {
  //   const {pageX, pageY} = event.nativeEvent;

  //   setPositionPressed({x: pageX, y: pageY});

  //   setDisplay(true);
  // };

  async function manageSound(uri: string, stationName: string, imageUri: string) {
    currentStation.current = stationName;
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
                manageSound(radioStation[index].url, radioStation[index].stationName, radioStation[index].radioimg)
              }
              //TODO : Implement a menu for interacting with radio (add to favorites ...)
              onLongPress={() => handleAddNewStation(radioStation[index].radioimg, radioStation[index].stationName)}>
              <View style={styles.radioStationView}>
                <RadioStation details={radioStation} index={index} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      {display && <ContextMenu position={positionPressed} onDisplay={onDisplayHandler} contextProp={currentStation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  radioList: {
    justifyContent: 'flex-start',
  },
  radioStationView: {
    justifyContent: 'flex-start',
    margin: 10,
    marginHorizontal: 14,
  },
  contextMenu: {
    flex: 1,
    position: 'absolute',
    backgroundColor: '#808080',
    borderRadius: 3.5,
    padding: 16,
    borderColor: 'red',
    borderWidth: 5,
  },
});

export default MainScreen;
