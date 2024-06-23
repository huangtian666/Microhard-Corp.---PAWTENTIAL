import React from 'react';
import CustomButton from '../CustomButton';
import { signInWithCredential, GoogleAuthProvider} from 'firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { appleAuth  } from '@invertase/react-native-apple-authentication';
import { Alert } from 'react-native';
import {router} from 'expo-router';
import { checkOnboardingStatus } from '@/FirestoreService';

const SocialSignInButtons = () => {
    const auth = FIREBASE_AUTH;


    GoogleSignin.configure({
      webClientId: "446504650271-2pgknbfgaspvn961u1j4gl6dve395rks.apps.googleusercontent.com",
    })

    async function onGoogleButtonPress() {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();
    
      // Create a Google credential with the token
      const googleCredential = GoogleAuthProvider.credential(idToken);
    
      // Sign-in the user with the credential
      return signInWithCredential(auth, googleCredential);
    }

    async function onAppleButtonPress() {
      // Start the sign-in request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
        // See: https://github.com/invertase/react-native-apple-authentication#faqs
        requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
      });
    
      // Ensure Apple returned a user identityToken
      if (!appleAuthRequestResponse.identityToken) {
        throw new Error('Apple Sign-In failed - no identify token returned');
      }
    
      // Create a Firebase credential from the response
      const { identityToken, nonce } = appleAuthRequestResponse;
      const appleCredential = AppleAuthProvider.credential(identityToken, nonce);
    
      // Sign the user in with the credential
      return signInWithCredential(auth,appleCredential);
    }    

    const onSignInGoogle = async () => {
      try {
        await onGoogleButtonPress();
        console.log('Signed in with Google!');
        
        const userId = auth.currentUser.uid;
        const hasCompletedOnboarding = await checkOnboardingStatus(userId);
    
        if (hasCompletedOnboarding) {
          router.replace('/screens/NavigationBar');
        } else {
          router.replace('/screens/WelcomeScreen');
        }
      } catch (error) {
        console.error('Error signing in:', error);
      }
    };
    
    const onSignInIOS = async () => {
      if (!appleAuth.isSupported) {
        console.log('Apple Sign-in is not supported on this device');
        Alert.alert('Error', 'Apple Sign-in is not supported on this device');
        return;
      }
    
      try {
        await onAppleButtonPress();
        console.log('Apple sign-in complete!');
    
        const userId = auth.currentUser.uid;
        const hasCompletedOnboarding = await checkOnboardingStatus(userId);
    
        if (hasCompletedOnboarding) {
          router.replace('/screens/NavigationBar');
        } else {
          router.replace('/screens/WelcomeScreen');
        }
      } catch (error) {
        console.error('Error signing in with Apple:', error);
      }
    };

    return (
        <>
            <CustomButton 
                text='Sign In with IOS' 
                onPress={onSignInIOS} 
                bgColor='#D4D4D4'
                fgColor='black'
                />
            <CustomButton 
                text='Sign In with Google' 
                onPress={onSignInGoogle} 
                bgColor='#FAE9EA'    
                fgColor='#DD4D44'
                />
    </>
    )
}

export default SocialSignInButtons