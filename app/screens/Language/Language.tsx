import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomButton from '@/components/CustomButton';
import {setLanguagePreference, getLanguagePreference } from '@/FirestoreService';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

const LanguageSettings = () => {
    const [selectedLanguage, setSelectedLanguage] = useState('en');
    const auth = FIREBASE_AUTH;
    const userId = auth.currentUser ? auth.currentUser.uid : null;
  
    useEffect(() => {
        const fetchLanguagePreference = async () => {
          try {
            if (userId) {
              const language = await getLanguagePreference(userId);
              setSelectedLanguage(language);
            }
          } catch (error) {
            console.error('Error fetching language preference:', error);
          }
        };
    
        fetchLanguagePreference();
      }, [userId]);
    
      const handleLanguageChange = async () => {
        try {
          await setLanguagePreference(auth.currentUser.uid, selectedLanguage);
          console.log('Language changed to:', selectedLanguage);
          await Alert.alert('Success', 'You language setting has been updated')
        } catch (error) {
          console.error('Error changing language:', error);
        }
      };

  return (
    <SafeAreaView style={styles.container}>
        <Text style={styles.label}>Select Language:</Text>
        <Picker
          selectedValue={selectedLanguage}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
        >
          <Picker.Item label="English" value="en" />
          <Picker.Item label="简体中文" value="zh" />
          <Picker.Item label="日本語" value="ja" />
          <Picker.Item label="한국인" value="kr" />
          <Picker.Item label="Español" value="es" />
          <Picker.Item label="Français" value="fr" />
          <Picker.Item label="Deutsch" value="de" />
          <Picker.Item label="Melayu" value="ms" />
          <Picker.Item label="தமிழ்" value="ta" />
        </Picker>
        <View style = {styles.button} >
            <CustomButton
                text='Confirm'
                onPress={handleLanguageChange}     
            />
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 50,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    alignItems: 'center',
  },
  label: {
    fontSize: 19,
    marginTop: 40,
  },
  picker: {
    height: 50,
    width: Dimensions.get('window').width * 0.8,
    alignSelf: 'center'
  },
  button: {
    width: Dimensions.get('window').width,
    position: 'absolute',
    marginTop: 100,
    bottom: Dimensions.get('window').height * 0.5,
    alignItems: 'center',
  }
});

export default LanguageSettings;
