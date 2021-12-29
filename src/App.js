import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

export default function App() {
	const handleOnPressedBtnConnect = () => {
		console.log('Pressed');
	};

	const styles = StyleSheet.create({
		body: {
			width: '100%',
			height: '100%',
			alignItems: 'center',
			justifyContent: 'center',
		},
		title: {
			marginBottom: 20,
			fontSize: 20,
		},
		buttonConnect: {
			width: 150,
			height: 50,
			alignItems: 'center',
			justifyContent: 'center',
			backgroundColor: '#4fa876',
			borderRadius: 25,
		},
		buttonText: {
			color: '#000000',
			fontWeight: 'bold',
		},
	});

	return (
		<View style={styles.body}>
			<Text style={styles.title}>This is my first dapp</Text>
			<TouchableOpacity
				style={styles.buttonConnect}
				onPress={handleOnPressedBtnConnect}>
				<View>
					<Text style={styles.buttonText}>Connect</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}
