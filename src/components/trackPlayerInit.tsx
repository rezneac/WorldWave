import TrackPlayer, {Event} from 'react-native-track-player';

module.exports = async function () {
  //Handling notification events play/pause
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    // console.log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    // console.log('Event.RemotePlay');
    TrackPlayer.play();
  });
};
