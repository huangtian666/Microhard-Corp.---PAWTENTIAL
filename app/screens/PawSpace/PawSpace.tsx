import { SafeAreaView, StyleSheet, ScrollView, Dimensions, ImageBackground, View, Text, TouchableOpacity, Modal } from 'react-native';
import React, { useState } from 'react';
import { Fontisto, FontAwesome, FontAwesome5, FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import Shop from '../Shop';
import Inventory from '../Inventory';

const PawSpace = () => {
  // Mock data for health and mood
  const [health, setHealth] = useState(80); // 80% health
  const [mood, setMood] = useState(80); // 50% mood
  const [shopVisible, setShopVisible] = useState(false); // State to control the modal visibility
  const [inventoryVisible, setInventoryVisible] = useState(false); // State to control the modal visibility

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.topBar}>
        <View style={styles.coinBar}>
          <FontAwesome5 name="coins" size={24} color="#FFF500" />
          <Text style={styles.coinText}>300</Text>
        </View>
        <View style={styles.statusBars}>
          <View style={styles.statusBar}>
            <FontAwesome name="heartbeat" size={25} color='#FAC2C2' />
            <View style={styles.statusBarContainer}>
              <View style={[styles.healthBar, { width: `${health}%` }]}></View>
            </View>
            <Text style={[styles.statusText, { color: '#FAC2C2' }]}>{health}%</Text>
          </View>
          <View style={styles.statusBar}>
            <FontAwesome6 name="face-grin-wide" size={25} color='#FFF2CD' />
            <View style={styles.statusBarContainer}>
              <View style={[styles.moodBar, { width: `${mood}%` }]}></View>
            </View>
            <Text style={[styles.statusText, { color: '#FFF2CD' }]}>{mood}%</Text>
          </View>
        </View>
      </SafeAreaView>
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={true} // Enable horizontal scrolling
      >
        <ImageBackground source={require('../../../assets/images/bg1.jpg')} style={styles.background}>
          <SafeAreaView style={styles.scrollContainer}>
            {/* Add scrollable content here if needed */}
          </SafeAreaView>
        </ImageBackground>
      </ScrollView>
      <View style={styles.bottomButtons}>
        <TouchableOpacity style={styles.button} onPress={() => setShopVisible(true)}>
        <Fontisto name="shopping-store" size={25} color='red' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setInventoryVisible(true)}>
        <MaterialIcons name="inventory" size={25} color='#A5807B' />
        </TouchableOpacity>
      </View>
      <Modal
        transparent={true}
        visible={shopVisible}
        animationType="slide"
        onRequestClose={() => setShopVisible(false)}
      >
        <Shop visible={shopVisible} onClose={() => setShopVisible(false)} />
      </Modal>
      <Modal
        transparent={true}
        visible={inventoryVisible}
        animationType="slide"
        onRequestClose={() => setInventoryVisible(false)}
      >
        <Inventory visible={inventoryVisible} onClose={() => setInventoryVisible(false)} />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    flexDirection: 'row', // Ensure content is laid out in a row for horizontal scrolling
  },
  scrollContainer: {
    width: Dimensions.get('window').width * 3, // Adjust width as needed for horizontal scroll
    height: Dimensions.get('window').height, // Fit the height of the screen
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
    width: '100%',
    height: '100%',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 10, // Add margin to create space between the top bar and screen boundary
    marginTop: 20, // Add margin to create space between the top bar and top screen boundary
    width: '90%', // Adjust width to account for margin
    position: 'absolute',
    top: 0,
    zIndex: 1,
    borderRadius: 10, // Optional: add border radius for rounded corners
  },
  coinBar: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coinText: {
    fontSize: 18,
    marginLeft: 5,
    color: "#FFF500",
    fontWeight: 'bold',
  },
  statusBars: {
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  statusBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  statusBarContainer: {
    width: 100,
    height: 10,
    backgroundColor: '#ccc', // Background color for the empty part of the bar
    borderRadius: 5,
    overflow: 'hidden',
    marginLeft: 5,
  },
  statusText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  healthBar: {
    height: '100%',
    backgroundColor: '#FAC2C2',
  },
  moodBar: {
    height: '100%',
    backgroundColor: '#FFF2CD',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    bottom: 20,
    width: '100%',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    shadowColor: '#BFB693',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1.2,
    shadowRadius: 3.84,
  },
});

export default PawSpace;
