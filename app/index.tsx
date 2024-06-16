
import React, { useState, useEffect } from 'react';
import SignInScreen from './screens/Authentication/SignInScreen';
import HomeScreen from './screens/home';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Dimensions, StyleSheet } from 'react-native';

const auth = FIREBASE_AUTH;

auth.onAuthStateChanged(user => {
    if (user) {
      console.log('user logged in')
    } else {
      console.log('user signed out')
    }
  })

function Index() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <SafeAreaView style={styles.container}>
          <SignInScreen/>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView>
      <HomeScreen/>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#FFF2CD',
      width: Dimensions.get('window').width,
      height:Dimensions.get('window').height,

  }
})

export default Index;