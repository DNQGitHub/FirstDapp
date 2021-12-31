import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
	projectId: '9f28598f71102d882806f685441bb517',
	relayUrl: 'wss://relay.walletconnect.com',
	metadata: {
		name: 'First Dapp',
		description: 'First Dapp',
		url: '#',
		icons: ['https://walletconnect.com/walletconnect-logo.png'],
	},
	storageOptions: {
		asyncStorage: AsyncStorage,
	},
	// logger: 'debug',
};
