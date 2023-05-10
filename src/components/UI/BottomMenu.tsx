import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {PlayerManager} from '../playerManagePlayback/PlayerManager';
import Icon from 'react-native-vector-icons/Entypo';
import store from '../../store/store';

const PlayerManagerMenu = () => {
  const [trackTitle, setTrackTitle] = useState<null | string>(null);
  const [imageUri, setImageUri] = useState<string>('');
  const [onPlay, setOnPlay] = useState<boolean>(false);
  const {playButton} = PlayerManager();

  const updateStateFromStore = () => {
    setImageUri(store.getState().imageUri);
    setTrackTitle(store.getState().stationName);
    setOnPlay(store.getState().isPlaying);
  };

  useEffect(() => {
    const unsubscribe = store.subscribe(updateStateFromStore);
    return () => {
      unsubscribe();
    };
  }, []);

  const onPressed = async () => {
    await playButton(onPlay);
  };

  return trackTitle != null ? (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: imageUri!}} />
      <View style={styles.trackInfo}>
        <Text style={styles.text} ellipsizeMode="middle">
          {trackTitle}
        </Text>
      </View>
      <TouchableOpacity onPress={onPressed}>
        {onPlay ? (
          <Icon
            style={styles.icon}
            name="controller-paus"
            size={53}
            color="white"
          />
        ) : (
          <Icon
            style={styles.icon}
            name="controller-play"
            size={53}
            color="white"
          />
        )}
      </TouchableOpacity>
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
  },
  image: {
    width: 100,
    height: 53.13,
    margin: 10,
    alignContent: 'center',
  },
  icon: {
    alignSelf: 'center',
    margin: 10,
  },
  trackInfo: {
    margin: 10,
    alignSelf: 'center',
    width: '45%',
    minWidth: '45%',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 22,
    textAlign: 'center',
  },
});

export default PlayerManagerMenu;
