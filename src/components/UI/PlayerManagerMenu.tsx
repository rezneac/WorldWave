import {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import TrackPlayer, {State, Event} from 'react-native-track-player';

const PlayerManagerMenu = () => {
  const [display, setDisplay] = useState(false);

  useEffect(() => {
    const listener = TrackPlayer.addEventListener(
      Event.PlaybackState,
      ({state}) => {
        if (state === State.Playing) {
          console.log('The player is playing');
          setDisplay(true);
        } else {
          console.log('The player is not playing');
          setDisplay(false);
        }
      },
    );

    return () => {
      listener.remove();
    };
  }, []);

  return display === true ? (
    <View style={styles.container}>
      <Text>Now playing!</Text>
      
    </View>
  ) : (
    <View></View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 75,
  },
});

export default PlayerManagerMenu;
