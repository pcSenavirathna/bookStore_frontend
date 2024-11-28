import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const SplashScreen = () => {
	const navigation = useNavigation();

	// Navigate to the main screen after a delay
	useEffect(() => {
		const timer = setTimeout(() => {
			navigation.replace('Home');
		}, 3000);  // 3-second delay

		return () => clearTimeout(timer);
	}, [navigation]);

	return (
		<LinearGradient
			colors={['#120F48', '#21237F']}  // Blue gradient colors
			style={styles.container}
		>
			<Image
				source={require('../assets/images/book.png')}
				style={styles.logo}
			/>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
	logo: {
		top: 0,
		width: 400,
		height: 400,
	},
	text: {
		fontSize: 24,
		marginTop: 20,
		fontWeight: 'bold',
		color: 'white',
	},
});

export default SplashScreen;
