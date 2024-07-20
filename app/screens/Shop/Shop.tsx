import React, { useState } from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity, StyleSheet } from 'react-native';

const Shop = ({ visible, onClose }) => {
  const [selectedCategory, setSelectedCategory] = useState('Food');

  const items = {
    Food: [
      { name: 'Item 1', image: null },
      { name: 'Item 2', image: null },
      // Add more food items here
    ],
    Clothes: [
      { name: 'Item 3', image: null },
      { name: 'Item 4', image: null },
      // Add more clothes items here
    ],
    Toys: [
      { name: 'Item 5', image: null },
      { name: 'Item 6', image: null },
      // Add more toy items here
    ],
  };

  if (!visible) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Shop</Text>
        <View style={styles.shopContainer}>
          <View style={styles.sidebar}>
            {['Food', 'Clothes', 'Toys'].map(category => (
              <TouchableOpacity
                key={category}
                style={[
                  styles.categoryButton,
                  selectedCategory === category && styles.selectedCategoryButton,
                ]}
                onPress={() => setSelectedCategory(category)}
              >
                <Text
                  style={[
                    styles.categoryText,
                    selectedCategory === category && styles.selectedCategoryText,
                  ]}
                >
                  {category}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <View style={styles.itemsContainer}>
            <ScrollView contentContainerStyle={styles.grid}>
              {items[selectedCategory].map((item, index) => (
                <View style={styles.itemCard} key={index}>
                  <View style={styles.itemImage} />
                  <Text style={styles.itemName}>{item.name}</Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Text style={styles.closeButtonText}>x</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '90%',
    height: '80%', // Set height to 80% of the screen height
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#ea9c8a',
  },
  shopContainer: {
    flexDirection: 'row',
    flex: 1,
  },
  sidebar: {
    width: 80,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  categoryButton: {
    padding: 10,
    marginVertical: 5,
    backgroundColor: '#eee',
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  selectedCategoryButton: {
    backgroundColor: '#ea9c8a',
  },
  categoryText: {
    fontSize: 16,
  },
  selectedCategoryText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemsContainer: {
    flex: 1,
    marginLeft: 10,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    paddingBottom: 20, // Add padding to avoid clipping
  },
  itemCard: {
    width: (Dimensions.get('window').width / 2) - 40,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // Slightly transparent background to blend with shop
    marginBottom: 20,
    padding: 10,
    borderRadius: 5,
    borderColor: '#ddd',
    borderWidth: 1,
    alignItems: 'center', // Center the item content
  },
  itemImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#eee',
    marginBottom: 10,
  },
  itemName: {
    fontSize: 16,
    textAlign: 'center',
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ea9c8a',
    padding: 10,
    borderRadius: 30,
    alignItems: 'center',
    width: 40,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
});

export default Shop;
