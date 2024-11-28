import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';


import HomeScreen from './HomeScreen';
import CardDetailScreen from './CardDetailScreen'; 

const Stack = createStackNavigator();

export default function App() {
	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Stack.Navigator initialRouteName="HomeScreen">
				<Stack.Screen
					name="HomeScreen"
					component={HomeScreen}
					options={{
						headerStyle: {
							backgroundColor: 'blue', // Set header background color to blue
						},
						headerTintColor: 'white', // Set the header text color to white for contrast
					}}
				/>
				<Stack.Screen
					name="CardDetail"
					component={CardDetailScreen}
					options={{ title: 'Book Details' }}
				/>
			</Stack.Navigator>
		</GestureHandlerRootView>
	);
}
