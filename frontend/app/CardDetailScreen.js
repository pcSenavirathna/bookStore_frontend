import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import axios from 'axios';
import { useRoute } from '@react-navigation/native'; // Use this to access route params

const CardDetailScreen = () => {
	const route = useRoute(); // Get the route object
	const { id } = route.params; // Extract book id from route params

	const [book, setBook] = useState(null);
	const [loading, setLoading] = useState(true);

	// Fetch book details by ID
	useEffect(() => {
		const fetchBookDetails = async () => {
			try {
				const response = await axios.get(`http://172.20.10.4:5000/api/books/${id}`);
				setBook(response.data);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching book details:', error);
				setLoading(false);
			}
		};

		fetchBookDetails();
	}, [id]);

	if (loading) {
		return <Text>Loading...</Text>;
	}

	if (!book) {
		return <Text>Book not found</Text>;
	}

	return (
		<View style={styles.container}>
			<Image source={{ uri: `http://172.20.10.4:5000/assets/images/${book.image}` }} style={styles.image} />
			<Text style={styles.title}>{book.title}</Text>
			<Text style={styles.author}>{book.author}</Text>
			<Text style={styles.description}>{book.description}</Text>
			<Text style={styles.rating}>Rating: {book.rating} Stars</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		backgroundColor: '#fff',
	},
	image: {
		width: '100%',
		height: 250,
		borderRadius: 10,
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		marginVertical: 10,
	},
	author: {
		fontSize: 18,
		color: '#555',
	},
	description: {
		marginVertical: 10,
		fontSize: 16,
		color: '#333',
	},
	rating: {
		fontSize: 18,
		fontWeight: 'bold',
		color: '#FFD700',
	},
});

export default CardDetailScreen;
