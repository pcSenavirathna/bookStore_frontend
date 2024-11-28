import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

import SplashScreen from './SplashScreen';
import HomeScreen from './HomeScreen';
import CardDetailScreen from './CardDetailScreen';

const Stack = createStackNavigator();

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack.Navigator initialRouteName="Splash">
				<Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />

				<Stack.Screen name="Home" component={HomeScreen}
					options={{
						title: 'All Books',
						headerStyle: {
							backgroundColor: '#007BFF',
						},
						headerTintColor: '#fff',
						headerTitleStyle: {
							fontWeight: 'bold',
							fontSize: 24,
						},
						headerTitleAlign: 'center',
					}}
				/>

			</Stack.Navigator>
		</GestureHandlerRootView>
	);
}
