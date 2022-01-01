import React, {useState, useEffect} from 'react';
import {WallectConnectConfig} from './configs';
import {
	Linking,
	Platform,
	SafeAreaView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import WalletConnectClient, {CLIENT_EVENTS} from '@walletconnect/client';
import WalletListModal from './modals/WalletListModal';
import Logo from './assets/walletconnect-banner.svg';
import DialogAndroid from 'react-native-dialogs/DialogAndroid';

export default function App() {
	const [walletConnectClient, setWalletConnectClient] = useState(null);
	const [appSession, setAppSession] = useState(null);
	const [wcUri, setWcUri] = useState(null);
	const [modalWalletListVisible, setModalWalletListVisible] = useState(false);

	useEffect(() => {
		initApp();
	}, []);

	const initApp = async () => {
		console.log('INIT APP', Date.now());
		await initWallectConnectClient();
	};

	const initWallectConnectClient = async () => {
		const client = await WalletConnectClient.init(WallectConnectConfig);

		client.on(CLIENT_EVENTS.pairing.proposal, handleOnWCPairingProposal);

		client.on(CLIENT_EVENTS.session.created, handleOnWCSessionCreated);

		setWalletConnectClient(client);
	};

	const handleOnWCPairingProposal = async (proposal: PairingTypes.Proposal) => {
		console.log('CLIENT_EVENTS.pairing.proposal', proposal);
		const {uri} = proposal.signal.params;
		setWcUri(uri);

		if (Platform.OS === 'ios') {
			setModalWalletListVisible(true);
		} else {
			if (await Linking.canOpenURL(uri)) {
				await Linking.openURL(uri);
			} else {
				DialogAndroid.alert(
					'No wallet found',
					'Find a wallet at <a href="https://ethereum.org/en/wallets/find-wallet">https://ethereum.org/en/wallets/find-wallet</a>',
					{
						contentIsHtml: true,
					},
				);
			}
		}
	};

	const handleOnWCSessionCreated = async (session: SessionTypes.Created) => {
		console.log('CLIENT_EVENTS.session.created', session);
	};

	const handleOnBtnConnectPressed = async () => {
		console.log('onBtnConnectPressed');

		if (!appSession) {
			try {
				const session = await walletConnectClient.connect({
					permissions: {
						blockchain: {
							chains: ['eip155:1'],
						},
						jsonrpc: {
							methods: [
								'eth_sendTransaction',
								'personal_sign',
								'eth_signTypedData',
							],
						},
					},
				});

				setAppSession(session);
			} catch (e) {
				console.log('onBtnConnectPressed - ERROR', e);
				setModalWalletListVisible(false);
			}
		}
	};

	const handleOnBtnLogoutPressed = async () => {
		console.log('onBtnLogoutPressed');

		walletConnectClient.disconnect({
			topic: appSession.topic,
		});
	};

	const handleOnWalletItemPressed = (index, item) => {
		console.log('handleOnWalletItemPressed', item.name);

		if (!wcUri) {
			console.log('WallectConnect Uri is null');
			return;
		}

		const {native, universal} = item.mobile;
		const deepLink = `${
			universal || (native && `${native}/`)
		}/wc?uri=${encodeURIComponent(wcUri)}`;

		console.log(deepLink);
		Linking.openURL(deepLink);
	};

	return (
		<SafeAreaView>
			<View style={styles.body}>
				<Logo width="80%" height="120" />

				<Text style={styles.title}>This is my first dapp</Text>

				{!appSession ? (
					<TouchableOpacity
						style={{...styles.button, ...styles.buttonConnect}}
						onPress={handleOnBtnConnectPressed}>
						<View>
							<Text style={styles.buttonText}>Connect</Text>
						</View>
					</TouchableOpacity>
				) : (
					<View>
						<Text style={styles.title}>Welcome, </Text>
						<TouchableOpacity
							style={{...styles.button, ...styles.buttonLogout}}
							onPress={handleOnBtnLogoutPressed}>
							<View>
								<Text style={styles.buttonText}>Logout</Text>
							</View>
						</TouchableOpacity>
					</View>
				)}

				<WalletListModal
					onRequestClose={() => {
						setModalWalletListVisible(false);
					}}
					visible={modalWalletListVisible}
					onItemPressed={handleOnWalletItemPressed}
				/>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	body: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	title: {
		marginBottom: 20,
		fontSize: 20,
	},
	button: {
		width: 150,
		height: 50,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#f4f4f4',
		borderRadius: 5,
		elevation: 15,
	},
	buttonText: {
		color: '#fff',
		fontSize: 20,
	},
	buttonConnect: {
		backgroundColor: '#3D85C6',
		shadowColor: '#3D85C6',
	},
	buttonLogout: {
		backgroundColor: '#e69138',
		shadowColor: '#e69138',
	},
	modalWallets: {
		width: '100%',
		height: '100%',
		backgroundColor: 'red',
		alignItems: 'center',
		justifyContent: 'center',
	},
	modalWalletsDialog: {
		width: '80%',
		height: '50%',
		backgroundColor: 'blue',
		alignItems: 'center',
		justifyContent: 'center',
	},
	wallet: {
		width: 300,
		height: 50,
		backgroundColor: '#fff',
	},
});
