/**
 * @format
 */
import './shim.js';
import {AppRegistry, Platform} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';

console.log('OS', Platform.OS);

if (Platform.OS !== 'web') {
	require('react-native-get-random-values');
}

process.version = '1.0.0';

require('crypto');

AppRegistry.registerComponent(appName, () => App);
