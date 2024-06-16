import React from 'react';
import CustomButton from '../CustomButton';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { FIREBASE_AUTH } from '@/FirebaseConfig';



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

    const onSignInIOS = () => {
      console.log('Sign in with IOS')
    }

    const onSignInGoogle = () => {
      onGoogleButtonPress().then(() => console.log('Signed in with Google!'))
    }

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