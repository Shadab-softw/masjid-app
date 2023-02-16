/**
 * @format
 */
 import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import messaging from '@react-native-firebase/messaging';

import Root from './src/root';
import { name as appName } from './app.json';


AppRegistry.registerComponent(appName, () => Root);

