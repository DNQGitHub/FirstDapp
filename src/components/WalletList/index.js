import React, {useEffect, useState} from 'react';
import {FlatList, Text, Image, TouchableOpacity} from 'react-native';
import {AppConfig} from '../../configs';
import axios from 'axios';
import styles from './styles';

export default function WalletList({onItemPressed, style}) {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchData();
	}, []);

	const fetchData = async () => {
		const {data} = await axios.get(
			'https://registry.walletconnect.org/data/wallets.json',
		);

		const wallets = [];

		for (let key of Object.keys(data)) {
			const wallet = data[key];
			if (
				(AppConfig.supportedWallets === '*' ||
					AppConfig.supportedWallets.includes(wallet.name)) &&
				(wallet.mobile.native || wallet.mobile.univeral)
			) {
				wallet.iconUrls = {
					sm: `https://registry.walletconnect.org/logo/sm/${key}.jpeg`,
					md: `https://registry.walletconnect.org/logo/md/${key}.jpeg`,
					lg: `https://registry.walletconnect.org/logo/lg/${key}.jpeg`,
				};
				wallets.push(wallet);
			}
		}

		setData(wallets);
	};

	const renderItem = ({index, item}) => {
		const style = {
			...styles.itemBody,
			...(index === 0
				? styles.itemBodyFirst
				: index === data.length - 1
				? styles.itemBodyLast
				: {}),
		};

		return (
			<TouchableOpacity
				style={style}
				onPress={() => onItemPressed(index, item)}>
				<Image source={{uri: item.iconUrls.sm}} style={styles.itemImage} />
				<Text style={styles.itemName}>{item.name}</Text>
			</TouchableOpacity>
		);
	};

	return (
		<FlatList
			style={{...styles.itemContainer, ...style}}
			data={data}
			renderItem={renderItem}
			keyExtractor={(item, index) => {
				return index;
			}}
		/>
	);
}
