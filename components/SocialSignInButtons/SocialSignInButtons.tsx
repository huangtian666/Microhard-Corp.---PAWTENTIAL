import React, {useEffect} from 'react';
import CustomButton from '../CustomButton';
import { signInWithCredential, GoogleAuthProvider } from 'firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { FIREBASE_AUTH } from '@/FirebaseConfig';



const SocialSignInButtons = () => {
    const auth = FIREBASE_AUTH;

    const onSignInIOS = () => {
        console.warn('Sign in with IOS')
    }

    const onSignInGoogle = () => {
        console.warn('Sign in with Google')
    }

    /*const onSignInGoogle = async () => {
        try {
          await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
          const { idToken } = await GoogleSignin.signIn();
          const googleCredential = GoogleAuthProvider.credential(idToken);
          const userCredential = await signInWithCredential(auth, googleCredential);
          console.log('User signed in with Google:', userCredential.user);
        } catch (error) {
          console.error('Error during Google sign-in:', error);
        }
      };*/

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