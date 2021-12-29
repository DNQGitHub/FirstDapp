/**
 * @format
 */
import './shim.js';
import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

process.version = '1.0.0';

AppRegistry.registerComponent(appName, () => App);
