
import React, {useState} from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, StyleSheet, Dimensions, Switch } from 'react-native';
import { signOut } from 'firebase/auth';
import { router } from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import CustomButton from '@/components/CustomButton';
import { MaterialIcons } from '@expo/vector-icons'; 

const Setting = () => {
  const auth = FIREBASE_AUTH;
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isSoundEffectEnabled, setIsSoundEffectEnabled] = useState(true);

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

  const handleDeleteAccount = () => {
    console.log('Delete Account');
    // Add functionality for deleting the account here
  };
  
  const toggleNotifications = () => setIsNotificationsEnabled(previousState => !previousState);
  const toggleSoundEffect = () => setIsSoundEffectEnabled(previousState => !previousState);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>General</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Account Info</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Privacy & Security</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>Language</Text>
            <TouchableOpacity>
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
            <Text style={styles.optionText}>Preferences</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          <View style={styles.option}>
            <Text style={styles.optionText}>Report an Issue</Text>
            <TouchableOpacity>
              <MaterialIcons name="keyboard-arrow-right" size={24} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.option}>
            <Text style={styles.optionText}>FAQ</Text>
            <TouchableOpacity>
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
  header: {
    backgroundColor: '#6A5ACD',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
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
  }
});

export default Setting;
