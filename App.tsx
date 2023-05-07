import React from 'react';
import {View, Text} from 'react-native';
import TrackPlayer from 'react-native-track-player';

const start = async () => {
  // Set up the player
  await TrackPlayer.setupPlayer();

  // Add a track to the queue
  await TrackPlayer.add({
      id: 'trackId',
      url: require('./track.mp3'),
      title: 'Track Title',
      artist: 'Track Artist',
      // artwork: require('track.png')
  });

  // Start playing it
  // await TrackPlayer.play();
};

const App = () => {
  // start();


  return (
    <View>
      <Text>Test</Text>
    </View>
  );
};

export default App;
