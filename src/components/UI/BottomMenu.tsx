import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import TrackPlayer, {State, Event} from 'react-native-track-player';
import {PlayerManager} from '../playerManagePlayback/PlayerManager';
import store from '../../store/store';

const PlayerManagerMenu = () => {
  const [trackTitle, setTrackTitle] = useState<null | string>(null);
  const [imageUri, setImageUri] = useState<string>('');

  useEffect(() => {
    setImageUri(store.getState().imageUri);
    setTrackTitle(store.getState().stationName);
  }, [store.getState().stationName]);
  // console.log(store.getState().stationName);

  return trackTitle != null ? (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: imageUri!}} />
      <View style={styles.trackInfo}>
        <Text style={styles.text} ellipsizeMode="tail">
          {trackTitle}
        </Text>
      </View>
      <Image style={styles.icon} source={require('../../assets/pause.svg')} />
    </View>
  ) : (
    <></>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 75,
    backgroundColor: '#344051',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  image: {
    width: 100,
    height: 53.13,
    margin: 10,
    alignContent: 'center',
  },
  icon: {
    // backgroundColor:"white"
  },
  trackInfo: {
    margin: 10,
    alignSelf: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
  },
});

export default PlayerManagerMenu;
