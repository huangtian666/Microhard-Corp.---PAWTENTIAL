/*import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import HomeScreen from './HomeScreen';
import SignInScreen from '../Authentication/SignInScreen';

const HomePage = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const auth = FIREBASE_AUTH;

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }
  

  if (!user) {
    return (
        <SignInScreen/>
    );
  }

  return (
    <HomeScreen/>
  );
}
export default HomePage;*/

export {default} from './HomeScreen';
