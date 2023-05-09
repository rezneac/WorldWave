import {useState} from 'react';
import TrackPlayer, {State} from 'react-native-track-player';

export const PlayerManager = () => {
  const [checkUri, setCheckUri] = useState('');

  const getStationName = async () => {
    TrackPlayer.getTrack(0)
      .then(trackObject => {
        console.log(`Title: ${trackObject!.title}`);
        return trackObject!.title;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const playTrack = async (uri: string, index: number, stationName: string) => {
    const state = await TrackPlayer.getState();

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
