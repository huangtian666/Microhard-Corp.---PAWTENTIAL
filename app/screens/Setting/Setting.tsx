import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomButton from '@/components/CustomButton';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signOut } from 'firebase/auth';
import {router} from 'expo-router';

 
const Setting = () => {

    const auth = FIREBASE_AUTH;

    const handleSignOut = async () => {
        signOut(auth).then(() => {
                console.log('User signed out');
                router.push('/screens/Authentication/SignInScreen');
            })
            .catch(error => {
                console.error('Sign out error:', error);
            });
    };

   
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 20, backgroundColor: 'white'}} >
            <SafeAreaView style={styles.container}>
            <CustomButton
                text='Sign Out' 
                onPress={handleSignOut}
            />
            </SafeAreaView>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
});

export default Setting;