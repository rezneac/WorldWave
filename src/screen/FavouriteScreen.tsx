import {FlatList, StyleSheet, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import {PlayerManager} from '../components/playerManagePlayback/PlayerManager';
import RadioStation from '../components/UI/RadioStation';
import {store, persistor} from '../../src/store/persistStore';
import {useEffect, useState} from 'react';

interface Station {
  stationName: string;
  url: string;
  radioimg: string;
}

const FavouriteScreen = () => {
  let radioStation = require('../content/radio_info.json');
  const [filteredStations, setFilteredStations] = useState<Station[]>([]);

  useEffect(() => {
    // Function to update station names from the store
    const updateStationNames = () => {
      const stations = store.getState().stations;
      const names = stations.map(station => station.stationName);
      // Filter stations based on station names from the store
      setFilteredStations(radioStation.filter((station: Station) => names.includes(station.stationName)));
    };

    // Initial subscription and update
    updateStationNames();

    // Subscribe to store changes
    const unsubscribe = store.subscribe(updateStationNames);

    // Unsubscribe when component unmounts to avoid memory leaks
    return () => {
      unsubscribe();
    };
  }, []);

  const handleDeletingStations = (stationIndex: number) => {
    store.dispatch({
      type: 'EXCLUDE_STATION',
      stationIndex: stationIndex,
    });

    ToastAndroid.show('Deleted from favourite: ' + filteredStations[stationIndex].stationName, ToastAndroid.LONG);
  };

  const {playTrack} = PlayerManager();

  async function manageSound(uri: string, stationName: string, imageUri: string) {
    playTrack(uri, stationName, imageUri);
  }

  return (
    <View style={styles.container}>
      {/* Displays list of radio stations */}
      {filteredStations.length == 0 ? (
        <>
          <Text style={styles.textMessage}>There aren't any favourite station saved</Text>
          <Text style={styles.textHint}>To save or delete a station hold at your station</Text>
        </>
      ) : (
        <FlatList
          data={filteredStations}
          keyExtractor={item => item.stationName}
          numColumns={3}
          initialNumToRender={50}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  manageSound(
                    filteredStations[index].url,
                    filteredStations[index].stationName,
                    filteredStations[index].radioimg,
                  )
                }
                onLongPress={() => handleDeletingStations(index)}>
                <View style={styles.radioStationView}>
                  <RadioStation details={filteredStations} index={index} />
                </View>
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  radioStationView: {
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
  textMessage: {
    fontSize: 20,
    color: 'aliceblue',
    textAlign: 'center',
  },
  textHint: {
    fontSize: 14,
    color: 'aliceblue',
    marginTop: 20,
    textAlign: 'center',
  },
});
