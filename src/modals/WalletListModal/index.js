import React from 'react';
import {Modal, View, Text} from 'react-native';
import WalletList from '../../components/WalletList';
import styles from './styles';

export default function WalletListModal({
	visible,
	onItemPressed,
	onRequestClose,
}) {
	return (
		<Modal visible={visible} onRequestClose={onRequestClose}>
			<View style={styles.modal}>
				<View style={styles.modalBox}>
					<Text style={styles.modalLabel}>Wallet List</Text>
					<WalletList
						style={styles.walletListContainer}
						onItemPressed={onItemPressed}
					/>
				</View>
			</View>
		</Modal>
	);
}
