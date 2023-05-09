import {useState, useEffect} from 'react';
import TrackPlayer, {State} from 'react-native-track-player';
import store from '../../store/store';

export const PlayerManager = () => {
  const [checkUri, setCheckUri] = useState('');

  const playTrack = async (
    uri: string,
    stationName: string,
    imageUri: string,
  ) => {
    const state = await TrackPlayer.getState();
    await store.dispatch({
      type: 'UPDATE_STATION_INFO',
      stationUri: imageUri,
      stationName: stationName,
    });

    try {
      switch (state) {
        case State.Playing:
          if (uri === checkUri) {
            //stops if pressed the same radios station twice
            await TrackPlayer.pause();
            break;
          } else {
            //reset player if selected a new station
            await TrackPlayer.reset();
            await TrackPlayer.add({
              id: 'trackId',
              url: uri,
              title: stationName,
            });
            await TrackPlayer.play();
            setCheckUri(uri);
            break;
          }
        case State.Paused:
          // start again player if was stopped previously
          await TrackPlayer.reset();
          await TrackPlayer.add({
            id: 'trackId',
            url: uri,
            title: stationName,
          });
          await TrackPlayer.play();
          setCheckUri(uri);
          break;
        default:
          // start player with radio
          await TrackPlayer.add({
            id: 'trackId',
            url: uri,
            title: stationName,
          });
          await TrackPlayer.play();
          setCheckUri(uri);
          break;
      }
    } catch (error) {
      console.log('Error loading or playing sound', error);
    }
  };
  return {playTrack};
};
