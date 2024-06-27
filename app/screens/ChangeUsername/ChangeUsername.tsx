import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { updateUsername, getUsername } from '@/FirestoreService';

const ChangeUsername = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const [newUsername, setNewUsername] = useState('');
  const [currentUsername, setCurrentUsername] = useState('');

  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const username = await getUsername(userId);
        setCurrentUsername(username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (auth.currentUser) {
      fetchUsername();
    }
  }, [auth.currentUser]);

  const handleSave = async () => {
    if (!newUsername.trim()) {
      Alert.alert('Error', 'Username cannot be empty');
      return;
    }

    try {
      await updateUsername(userId, newUsername.trim());
      Alert.alert('Success', 'Username updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating username:', error);
      Alert.alert('Error', 'Failed to update username. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Current Username: {currentUsername}</Text>
        <CustomInput
          placeholder="Enter new username"
          value={newUsername.trim()}
          setValue={setNewUsername}
          placeholderTextColor="gray"
        />
        <CustomButton text="Save" onPress={handleSave} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },
  content: {
    marginTop:40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: '#a5807b',
    fontWeight: 'bold'
  },
});

export default ChangeUsername;
