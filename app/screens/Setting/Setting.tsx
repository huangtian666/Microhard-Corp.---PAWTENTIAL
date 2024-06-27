
import React, {useState} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Switch, Alert } from 'react-native';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import CustomButton from '@/components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons'; 
import { deleteUserAccount } from '@/FirestoreService';

const Setting = () => {
  const auth = FIREBASE_AUTH;
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEffectEnabled, setIsSoundEffectEnabled] = useState(true);
  const [isDarkModeEnabled, setIsDarkModeEnabled] = useState(false);
  const [fontSize, setFontSize] = useState(18); // Add state for font size

  const [email, setEmail] = useState(''); // Add state for email
  const [password, setPassword] = useState(''); // Add state for password

  const handleSignOut = async () => {
    signOut(auth)
      .then(() => {
        console.log('User signed out');
        router.push('/screens/Authentication/SignInScreen');
      })
      .catch(error => {
        console.error('Sign out error:', error);
      });
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount(email, password); // Use the function here
      router.push('/screens/Authentication/SignInScreen');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete account. Please try again.');
    }
  };

  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleSoundEffect = () => setIsSoundEffectEnabled(previousState => !previousState);
  const toggleTheme = () => setIsDarkModeEnabled(previousState => !previousState);

  const increaseFontSize = () => setFontSize(prevSize => (prevSize < 30 ? prevSize + 1 : prevSize));
  const decreaseFontSize = () => setFontSize(prevSize => (prevSize > 12 ? prevSize - 1 : prevSize));

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Account Info</Text>
            <TouchableOpacity onPress={() => {
                router.push('/screens/UserProfile')
            }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Privacy & Security</Text>
            <TouchableOpacity onPress={() => {
                router.push('/screens/PrivacySecurity')
            }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Language</Text>
            <TouchableOpacity onPress={() => {
                router.push('/screens/Language')
                }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personalisation</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Notifications</Text>
            <Switch
              value={isNotificationsEnabled}
              onValueChange={toggleNotifications}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Sound Effect</Text>
            <Switch
              value={isSoundEffectEnabled}
              onValueChange={toggleSoundEffect}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Dark Mode</Text>
            <Switch
              value={isDarkModeEnabled}
              onValueChange={toggleTheme}
            />
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Font Size</Text>
            <View style={styles.fontSizeControl}>
              <TouchableOpacity onPress={decreaseFontSize} style={styles.fontSizeButton}>
                <Text style={styles.fontSizeButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.fontSizeValue}>{fontSize}</Text>
              <TouchableOpacity onPress={increaseFontSize} style={styles.fontSizeButton}>
                <Text style={styles.fontSizeButtonText}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Report an Issue</Text>
            <TouchableOpacity onPress={() => {
                router.push('/screens/ReportIssue')
            }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>FAQ</Text>
            <TouchableOpacity onPress={() => {
                router.push('/screens/FAQ')
            }}>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.buttonContainer}>
            <CustomButton
            text='Sign Out'
            onPress={handleSignOut}
            />

            <CustomButton
            text='Delete Account'
            onPress={handleDeleteAccount}
            />
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
  buttonContainer: {
    marginVertical: 20,
    alignItems: 'center',
  },
  fontSizeControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fontSizeButton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
  fontSizeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#444',
  },
  fontSizeValue: {
    fontSize: 16,
    color: '#444',
    marginHorizontal: 5,
  },
});

export default Setting;
