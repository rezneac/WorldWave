import TrackPlayer, {Event, State as TrackPlayerState} from 'react-native-track-player';
import crashlytics from '@react-native-firebase/crashlytics';

module.exports = async function () {
  //Handling notification events play/pause
  TrackPlayer.addEventListener(Event.RemotePause, () => {
    crashlytics().log('Event.RemotePause');
    TrackPlayer.pause();
  });

  TrackPlayer.addEventListener(Event.RemotePlay, () => {
    crashlytics().log('Event.RemotePlay');
    TrackPlayer.play();
  });

  TrackPlayer.addEventListener(Event.PlaybackState, data => {
    if (data.state === TrackPlayerState.None) {
      crashlytics().log('Player state: None');
    } else if (data.state === TrackPlayerState.Playing) {
      crashlytics().log('Player state: Playing');
    } else if (data.state === TrackPlayerState.Paused) {
      crashlytics().log('Player state: Paused');
    } else if (data.state === TrackPlayerState.Buffering) {
      crashlytics().log('Player state: Buffering');
    } else if (data.state === TrackPlayerState.Stopped) {
      crashlytics().log('Player state: Stopped');
    } else if (data.state === TrackPlayerState.Connecting) {
      crashlytics().log('Player state: Connecting');
    }
  });
};
