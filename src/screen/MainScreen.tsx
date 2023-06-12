import React, {useState, useEffect, useRef} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, Text, Dimensions} from 'react-native';
import RadioStation from '../components/UI/RadioStation';
import PlayerManagerMenu from '../components/UI/BottomMenu';
import {PlayerManager} from '../components/playerManagePlayback/PlayerManager';
import ContextMenu from '../components/UI/ContextMenuPopUp';

const MainScreen = () => {
  const radioStation = require('../content/radio_info.json');
  const {playTrack} = PlayerManager();
  const [display, setDisplay] = useState(false);
  const currentStation = useRef<string>('None');

  const [positionPressed, setPositionPressed] = useState({x: 0, y: 0});

  const onDisplayHandler = (value: boolean) => {
    setDisplay(value);
  };

  const handleLongPress = (event: any) => {
    const {pageX, pageY} = event.nativeEvent;

    setPositionPressed({x: pageX, y: pageY});

    setDisplay(true);
    // console.log(contextMenuPosition);
  };

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
              onLongPress={handleLongPress}>
              <View style={styles.radioStationView}>
                <RadioStation details={radioStation} index={index} />
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <PlayerManagerMenu />
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
  radioStationView: {
    margin: 10,
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
