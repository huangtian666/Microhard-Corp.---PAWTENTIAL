
import React, { useState, useEffect } from 'react';
import SignInScreen from './screens/Authentication/SignInScreen';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { appleAuth  } from '@invertase/react-native-apple-authentication';
import NavigationBar from '@/app/screens/NavigationBar';

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

  if (appleAuth.isSupported) {
    useEffect(() => {
      // onCredentialRevoked returns a function that will remove the event listener.
      // useEffect will call this function when the component unmounts
      return appleAuth.onCredentialRevoked(async () => {
        console.warn('If this function executes, User Credentials have been Revoked');
      });
    }, []); // passing in an empty array as the second argument 
            //ensures this is only ran once when component mounts initially.
  }




  if (initializing) return null;

  if (!user) {
    return (
          <SignInScreen/>
    );
  }

  return (
      <NavigationBar/>
  );
}

export default Index;