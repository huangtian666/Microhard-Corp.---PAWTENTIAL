import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../CustomButton';

const SocialSignInButtons = () => {
    const onSignInIOS = () => {
        console.warn('Sign in with IOS')
    }

    const onSignInGoogle = () => {
        console.warn('Sign in with Google')
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