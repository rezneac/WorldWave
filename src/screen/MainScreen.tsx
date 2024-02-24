import React, {useRef, useEffect, useState} from 'react';
import {View, StyleSheet, FlatList, TouchableOpacity, ToastAndroid, Text} from 'react-native';
import RadioStation from '../components/UI/RadioStation';
import {PlayerManager} from '../components/playerManagePlayback/PlayerManager';
import {store, persistor} from '../../src/store/persistStore';
import crashlytics from '@react-native-firebase/crashlytics';
import SearchBar from '../components/UI/searchBar/SearchBar';
import {useTheme} from '@react-navigation/native';

interface stationProps {
  stationName: string;
  url: string;
  radioimg: string;
}

const MainScreen = () => {
  const radioStation = require('../content/radio_info.json');
  const {playTrack} = PlayerManager();
  const currentStation = useRef<string>('None');
  const [filteredRadioStations, setFilteredRadioStations] = useState<stationProps[]>(radioStation);

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

  const onSearch = (text: string) => {
    const filteredData = radioStation.filter((item: stationProps) =>
      item.stationName.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredRadioStations(filteredData);
  };

  return (
    <View style={styles.container}>
      {/* Displays list of radio stations */}
      <FlatList
        // style={styles.container}
        showsVerticalScrollIndicator={false}
        data={filteredRadioStations}
        keyExtractor={item => item.stationName}
        numColumns={3}
        initialNumToRender={50}
        ListHeaderComponent={<SearchBar onPress={onSearch} />}
        ListEmptyComponent={
          <Text style={[styles.helperText, {color: useTheme().colors.text}]}>No stations found for your search.</Text>
        }
        renderItem={({item, index}) => {
          return (
            <>
              <TouchableOpacity
                style={styles.stationContainer}
                onPress={() =>
                  manageSound(
                    filteredRadioStations[index].url,
                    filteredRadioStations[index].stationName,
                    filteredRadioStations[index].radioimg,
                  )
                }
                onLongPress={() =>
                  handleAddNewStation(filteredRadioStations[index].radioimg, filteredRadioStations[index].stationName)
                }>
                <View style={styles.radioStationView}>
                  <RadioStation details={filteredRadioStations} index={index} />
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
  },
  stationContainer: {
    flex: 1,
    alignItems: 'flex-start',
  },
  radioStationView: {
    margin: 10,
    marginHorizontal: 14,
    alignItems: 'center',
  },
  helperText: {
    flex: 1,
    fontSize: 20,
    marginTop: 32,
    textAlign: 'center',
  },
});

export default MainScreen;
