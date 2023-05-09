/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import TrackPlayer from 'react-native-track-player';


TrackPlayer.registerPlaybackService(() => require('./src/components/trackPlayerInit'));

TrackPlayer.setupPlayer()

AppRegistry.registerComponent(appName, () => App);
