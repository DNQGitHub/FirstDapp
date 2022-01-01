import {StyleSheet, Dimensions} from 'react-native';

export default StyleSheet.create({
	modal: {
		width: '100%',
		height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00000000',
	},
	modalBox: {
		width: Dimensions.get('screen').width - 50,
		maxHeight: Dimensions.get('screen').height / 2,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
		backgroundColor: '#fff',
		borderRadius: 20,
		elevation: 10,
		shadowColor: '#0e0e0e90',
	},
	walletListContainer: {
		width: '100%',
	},
	modalLabel: {
		fontSize: 30,
		fontWeight: 'bold',
		marginBottom: 10,
	},
	buttonClose: {
		marginTop: 20,
	},
	buttonCloseText: {
		fontSize: 22,
		color: '#f00',
	}
});
