import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; // Use navigation from react-navigation

const Profile = () => {
  const navigation = useNavigation();

  const userData = {
    profilePic: 'https://your-image-url.com/profile-pic.jpg', // Replace with your image URL
    username: 'huangggg',
    petName: 'Fluffy',
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.profileContainer}>
          <Image source={{ uri: userData.profilePic }} style={styles.profilePic} />
          <Text style={styles.username}>{userData.username}</Text>
          <Text style={styles.petName}>{`Pet: ${userData.petName}`}</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Info</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Change Profile Picture</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Update Username</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Change Pet Name</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginVertical: 60, // Adjust margin to make space for the back button
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 5,
  },
  petName: {
    fontSize: 18,
    color: '#888',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 10,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#444',
  },
});

export default Profile;
