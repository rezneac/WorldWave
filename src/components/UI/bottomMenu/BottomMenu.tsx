import {useState, useEffect} from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {PlayerManager} from '../../playerManagePlayback/PlayerManager';
import Icon from 'react-native-vector-icons/Entypo';
import store from '../../../store/store';
import TrackPlayer, {State, useTrackPlayerEvents, Event} from 'react-native-track-player';

interface iProp {
  colour: string;
}

const events = [Event.PlaybackState, Event.PlaybackError];

const PlayerManagerMenu = ({colour}: iProp) => {
  const [trackTitle, setTrackTitle] = useState<null | string>(null);
  const [imageUri, setImageUri] = useState<string>('');
  const [onPlay, setOnPlay] = useState<boolean>(false);
  const {playButton} = PlayerManager();

  const [playerState, setPlayerState] = useState(null);

  const updateStateFromStore = () => {
    setImageUri(store.getState().imageUri);
    setTrackTitle(store.getState().stationName);
    setOnPlay(store.getState().isPlaying);
  };

  useTrackPlayerEvents(events, (event: any) => {
    if (event.type === Event.PlaybackError) {
      console.warn('An error occured while playing the current track.');
    }
    if (event.type === Event.PlaybackState) {
      setPlayerState(event.state);
      updateStateFromStore();
    }
  });

  const isPlaying = playerState === State.Playing;

  const onPressed = async () => {
    await playButton(onPlay);
  };

  return trackTitle != null ? (
    <View style={[styles.container, {backgroundColor: colour}]}>
      <Image style={styles.image} source={{uri: imageUri!}} />
      <View style={styles.trackInfo}>
        <Text style={styles.text} ellipsizeMode="middle">
          {trackTitle}
        </Text>
      </View>
      <TouchableOpacity onPress={onPressed}>
        {isPlaying ? (
          <Icon style={styles.icon} name="controller-paus" size={53} color="white" />
        ) : (
          <Icon style={styles.icon} name="controller-play" size={53} color="white" />
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
