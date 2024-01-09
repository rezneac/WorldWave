import React, {useRef, useEffect} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid} from 'react-native';
import RadioStation from '../components/UI/RadioStation';
import {PlayerManager} from '../components/playerManagePlayback/PlayerManager';
import {store, persistor} from '../../src/store/persistStore';
import crashlytics from '@react-native-firebase/crashlytics';

const MainScreen = () => {
  const radioStation = require('../content/radio_info.json');
  const {playTrack} = PlayerManager();
  const currentStation = useRef<string>('None');

  const handleAddNewStation = (stationUri: string, stationName: string) => {
    //checks if we already have this station as favourite in store
    const stationExists = store
      .getState()
      .stations.some(station => station.imageUri === stationUri && station.stationName === stationName);

    if (!stationExists) {
      crashlytics().log('added new station to store: ' + stationName);
      store.dispatch({
        type: 'ADD_NEW_STATION',
        stationUri: stationUri,
        stationName: stationName,
      });
      ToastAndroid.show('A new favourite station added: ' + stationName, ToastAndroid.LONG);
    }
  };

  async function manageSound(uri: string, stationName: string, imageUri: string) {
    crashlytics().log('Pressed on station: ' + stationName);
    currentStation.current = stationName;
    playTrack(uri, stationName, imageUri);
  }

  useEffect(() => {
    crashlytics().log('App mounted!');
  }, []);

  return (
    <View style={styles.container}>
      {/* Displays list of radio stations */}
      <FlatList
        showsVerticalScrollIndicator={false}
        data={radioStation}
        keyExtractor={item => item.stationName}
        numColumns={3}
        initialNumToRender={50}
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                onPress={() =>
                  manageSound(radioStation[index].url, radioStation[index].stationName, radioStation[index].radioimg)
                }
                onLongPress={() => handleAddNewStation(radioStation[index].radioimg, radioStation[index].stationName)}>
                <View style={styles.radioStationView}>
                  <RadioStation details={radioStation} index={index} />
                </View>
              </TouchableOpacity>
            </>
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
