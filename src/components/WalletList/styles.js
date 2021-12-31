import {StyleSheet} from 'react-native';

export default StyleSheet.create({
	itemContainer: {
		flexGrow: 0,
		padding: 10,
		backgroundColor: '#ffffff00',
	},
	itemBody: {
		height: 60,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		backgroundColor: '#fff',
		marginTop: 5,
		marginBottom: 5,
		padding: 10,
		borderRadius: 10,
		borderColor: '#dedede',
		borderWidth: 1,
	},
	itemBodyFirst: {
		marginTop: 0,
	},
	itemBodyLast: {
		marginBottom: 20,
	},
	itemName: {
		fontSize: 20,
		color: '#000',
	},
	itemImage: {
		width: 40,
		height: 40,
		marginRight: 10,
		borderRadius: 10,
	},
});
