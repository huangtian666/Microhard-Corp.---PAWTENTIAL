import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, Alert, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import CustomButton from '@/components/CustomButton';
import CustomInput from '@/components/CustomInput';
import { updatePetname } from '@/FirestoreService';
import { doc, getDoc } from 'firebase/firestore';

const ChangePetName = () => {
  const auth = FIREBASE_AUTH;
  const navigation = useNavigation();
  const [newPetName, setNewPetName] = useState('');
  const [currentPetName, setCurrentPetName] = useState('');

  const userId = auth.currentUser ? auth.currentUser.uid : null;

  useEffect(() => {
    const fetchPetName = async () => {
      try {
        const userDoc = await getDoc(doc(FIREBASE_DB, 'users', userId));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setCurrentPetName(userData.cleanedPetname || '');
        }
      } catch (error) {
        console.error('Error fetching pet name:', error);
      }
    };

    if (auth.currentUser) {
      fetchPetName();
    }
  }, [auth.currentUser]);

  const handleSave = async () => {
    if (!newPetName.trim()) {
      Alert.alert('Error', 'Pet name cannot be empty');
      return;
    }

    try {
      await updatePetname(userId, newPetName.trim());
      Alert.alert('Success', 'Pet name updated successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating pet name:', error);
      Alert.alert('Error', 'Failed to update pet name. Please try again.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.label}>Current Pet Name: {currentPetName}</Text>
        <CustomInput
          placeholder="Enter new pet name"
          value={newPetName.trim()}
          setValue={setNewPetName}
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
    marginTop: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 18,
    marginBottom: 20,
    color: '#a5807b',
    fontWeight: 'bold',
  },
});

export default ChangePetName;
