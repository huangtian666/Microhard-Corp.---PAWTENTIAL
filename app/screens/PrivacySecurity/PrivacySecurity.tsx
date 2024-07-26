




import React, { useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getAuth, updatePassword } from 'firebase/auth';
import CustomInput from '@/components/CustomInput';
import CustomButton from '@/components/CustomButton';

const PrivacySecurity = () => {
  const auth = getAuth();
  const navigation = useNavigation();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const onUpdatePressed = async () => {
    console.log("Button Pressed");
    if (newPassword !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }

    try {
      const user = auth.currentUser;
      if (user) {
        await updatePassword(user, newPassword);
        alert('Password updated successfully');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        alert('No user is logged in');
      }
    } catch (error: any) {
      alert('Failed to update password: ' + error.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Change Password</Text>
          </View>
          <View style={styles.input}>
            <CustomInput 
              placeholder='New Password' 
              value={newPassword} 
              setValue={setNewPassword} 
              secureTextEntry={true} 
            />
            <CustomInput 
              placeholder='Confirm Password' 
              value={confirmPassword} 
              setValue={setConfirmPassword} 
              secureTextEntry={true} 
            />
            <CustomButton 
              text='Update Password' 
              onPress={onUpdatePressed} 
              bgColor="#ea9c8a" 
              fgColor="white" 
              disabled={false} 
            />
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Privacy Settings</Text>
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
  input: {
    alignItems: 'center',
    marginTop: 20,
  }
});

export default PrivacySecurity;

