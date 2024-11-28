import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, TextInput } from 'react-native';
import { useRouter } from 'expo-router'; // For navigation using expo-router
import { FontAwesome } from 'react-native-vector-icons'; // Import FontAwesome icons
import axios from 'axios'; // Import Axios

const HomeScreen = () => {
	const router = useRouter();

	// State for search query, rating filter, and books data
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedRating, setSelectedRating] = useState('');
	const [showDropdown, setShowDropdown] = useState(false);
	const [books, setBooks] = useState([]);
	const [loading, setLoading] = useState(true);

	// Function to fetch books from the server
	const fetchBooks = async () => {
		try {
			// Fetch book data from your backend API
			const response = await axios.get('http://172.20.10.4:5000/api/books');
			// Add the full URL for images stored on the server
			const booksWithFullImageUrl = response.data.map((book) => ({
				...book,
				image: `http://172.20.10.4:5000/assets/images/${book.image}`, // Construct full image URL
			}));
			setBooks(booksWithFullImageUrl); // Set the books with updated image URLs
			setLoading(false); // Set loading to false once data is fetched
		} catch (error) {
			console.error('Error fetching books:', error);
			setLoading(false);
		}
	};

	// Call fetchBooks when the component mounts
	useEffect(() => {
		fetchBooks();
	}, []);

	// Filter books based on the search query and selected rating
	const filteredBooks = books.filter((book) => {
		const matchesQuery =
			book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			book.author.toLowerCase().includes(searchQuery.toLowerCase());

		const matchesRating = selectedRating ? book.rating === parseInt(selectedRating) : true;

		return matchesQuery && matchesRating;
	});

	// Function to handle card press and navigate to another page
	const handleCardPress = (cardId) => {
		// Ensure the correct dynamic URL is used
		router.push(`/CardDetail/${cardId}`);
	};

	return (
		<View style={styles.container}>
			{/* Search bar */}
			<View style={styles.searchContainer}>
				<FontAwesome name="search" size={20} color="#888" style={styles.searchIcon} />
				<TextInput
					style={styles.searchInput}
					placeholder="Search by book name or author"
					placeholderTextColor={'white'}
					value={searchQuery}
					onChangeText={setSearchQuery} // Update search query state
				/>
			</View>

			{/* Small dropdown for rating filter */}
			<TouchableOpacity
				style={styles.dropdownButton}
				onPress={() => setShowDropdown(!showDropdown)} // Toggle dropdown visibility
			>
				<Text style={styles.dropdownButtonText}>
					{selectedRating ? `${selectedRating} Stars` : 'Filter by Rating'}
				</Text>
			</TouchableOpacity>

			{showDropdown && (
				<View style={styles.dropdownMenu}>
					{/* Dropdown Items */}
					{['All', '1', '2', '3', '4', '5'].map((rating) => (
						<TouchableOpacity
							key={rating}
							style={styles.dropdownItem}
							onPress={() => {
								setSelectedRating(rating === 'All' ? '' : rating); // Set empty for "All"
								setShowDropdown(false);
							}}
						>
							<Text style={styles.dropdownItemText}>
								{rating === 'All' ? 'All Ratings' : `${rating} Stars`}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}

			{/* ScrollView for the content */}
			<ScrollView contentContainerStyle={styles.scrollViewContainer}>
				{/* Row of cards */}
				<View style={styles.cardContainer}>
					{filteredBooks.length === 0 ? (
						<Text style={styles.noResultsText}>No books found</Text>
					) : (
						filteredBooks.map((book, index) => (
							// Create rows of cards
							<TouchableOpacity
								key={book._id} // Use book's _id from the database
								style={[
									styles.card,
									{
										width: `${100 / 2 - 2}%`, // Adjust width to account for margin (2 cards per row for small screens)
										marginRight: index % 2 === 1 ? 0 : 10, // Add margin to the right of each card except for the last one in each row
									},
								]}
								onPress={() => handleCardPress(book._id)} // Use the book's _id for navigation
							>
								{/* Book image */}
								<Image source={{ uri: book.image }} style={styles.cardImage} resizeMode="cover" /> {/* Assuming your image URLs are hosted */}

								{/* Book Title */}
								<Text style={styles.cardText}>{book.title}</Text>

								{/* Author Name */}
								<Text style={styles.authorText}>{book.author}</Text>

								{/* Rating (with stars) */}
								<View style={styles.ratingContainer}>
									{[...Array(5)].map((_, i) => (
										<FontAwesome
											key={i}
											name="star"
											size={16}
											color={i < book.rating ? "#FFD700" : "#ccc"} // Gold for rating, gray for non-rating
										/>
									))}
								</View>
							</TouchableOpacity>
						))
					)}
				</View>
			</ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#f8f8f8',
	},
	addButton: {
		position: 'absolute',
		top: 20,
		right: 20,
		backgroundColor: 'green',
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
		flexDirection: 'row', // Align the icon and text horizontally
		alignItems: 'center', // Vertically center the icon and text
		zIndex: 1, // Make sure the button stays on top
	},
	icon: {
		marginRight: 10, // Add space between icon and text
	},
	addButtonText: {
		color: '#fff',
		fontSize: 16,
		fontWeight: 'bold',
	},
	searchContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		marginTop: 20,
		marginHorizontal: 20,
		backgroundColor: '#bebebe',
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 2,
	},
	searchIcon: {
		marginRight: 10,
		fontWeight: 'bold',
	},
	searchInput: {
		flex: 1,
		height: 40,
		fontSize: 16,
		color: '#333',
	},
	dropdownButton: {
		marginTop: 20,
		marginHorizontal: 20,
		backgroundColor: '#bebebe',
		borderRadius: 20,
		paddingHorizontal: 20,
		paddingVertical: 10,
		width: '40%',
	},
	dropdownButtonText: {
		fontSize: 16,
		color: '#333',
	},
	dropdownMenu: {
		position: 'absolute',
		top: 100, // Position dropdown below the button
		marginHorizontal: 20,
		marginVertical: 34,
		backgroundColor: '#fff',
		borderRadius: 10,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 4,
		elevation: 5, // for Android
		width: '30%',
		zIndex: 2,
	},
	dropdownItem: {
		padding: 10,
		borderBottomWidth: 1,
		borderBottomColor: '#ddd',
	},
	dropdownItemText: {
		fontSize: 16,
		color: '#333',
	},
	scrollViewContainer: {
		paddingTop: 20,
	},
	cardContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-between',
		marginTop: 20,
		paddingHorizontal: 20,
	},
	card: {
		backgroundColor: '#dcdcdc',
		padding: 10,
		marginBottom: 20,
		borderRadius: 10,
		alignItems: 'center',
		justifyContent: 'center',
		elevation: 5,
	},
	cardImage: {
		width: '100%',
		height: 150,
		borderRadius: 10,
	},
	cardText: {
		fontSize: 18,
		fontWeight: 'bold',
		marginTop: 10,
	},
	authorText: {
		fontSize: 14,
		color: '#555',
		marginTop: 5,
	},
	ratingContainer: {
		flexDirection: 'row',
		marginTop: 10,
	},
	noResultsText: {
		textAlign: 'center',
		fontSize: 18,
		color: '#999',
		marginTop: 20,
	},
});

export default HomeScreen;