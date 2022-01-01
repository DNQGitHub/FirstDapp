const fs = require('fs');

const mustRemovedDirs = [
	'node_modules/@walletconnect/react-native-dapp/node_modules/react-native-svg',
];

mustRemovedDirs.forEach(dir => {
	console.log('post-install', 'process-must-removed-dir', dir);
	if (fs.existsSync(dir)) {
		fs.rmdirSync(dir);
		console.log('removed ', dir);
	}
});
