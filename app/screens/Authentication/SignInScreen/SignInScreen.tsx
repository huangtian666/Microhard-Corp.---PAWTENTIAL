import {SafeAreaView, Text, Image, StyleSheet, useWindowDimensions, ScrollView,Dimensions, Alert} from 'react-native';
import Logo from '../../../../assets/images/PAWTENTIAL_icon_nobg.png'
import React, {useState,} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import SocialSignInButtons from '@/components/SocialSignInButtons';
import { router } from 'expo-router';
import { FIREBASE_AUTH} from '@/FirebaseConfig';
import {signInWithEmailAndPassword, signInWithPopup, sendEmailVerification} from 'firebase/auth';

const SignInScreen = () => {
    const[email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const auth = FIREBASE_AUTH;
    //useState hook is used to create a state variable inputValue &
    // a state update function setInputValue
    const cleanedEmail = email.trim().toLowerCase();

    const {height} = useWindowDimensions();

    return (
        <ScrollView >
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text}>PAWTENTIAL!</Text>
                <Image 
                    source ={Logo} 
                    style={[styles.logo,
                    {height: height * 0.3}]}
                    />
                <CustomInput placeholder='Email' value={email} 
                setValue = {setEmail} placeholderTextColor='gray'/>
                <CustomInput placeholder='Password' value={password} 
                setValue = {setPassword} secureTextEntry={true} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Sign In' 
                    onPress={ ()=> { 
                        if (!email && !password) {
                            Alert.alert('Error', 'Missing email and password');
                            return;
                          }
                      
                          if (!email) {
                            Alert.alert('Error', 'Missing email');
                            return;
                          }
                      
                          if (!password) {
                            Alert.alert('Error', 'Missing password');
                            return;
                          }
                    signInWithEmailAndPassword(auth, cleanedEmail, password)
                    .then((userCredentials) => {
                        console.log('Signed in');
                        if(userCredentials.user?.emailVerified) {
                          router.navigate('/screens/home');
                      } else {
                          Alert.alert('Email not verified', 'please verify your email')
                          sendEmailVerification(userCredentials.user).then(() => {
                            //Alert.alert('Verification Email Sent', 
                            //'Please check your email to verify your account.');
                            // Navigate to a screen that tells the user to verify their email
                            router.navigate('/screens/Authentication/ConfirmEmail');
                        })
                      } 
                    })
                        .catch(error => {
                            switch (error.code) {
                              case 'auth/user-not-found':
                                Alert.alert('Login Error', 'User does not exist.');
                                break;
                              case 'auth/wrong-password':
                                Alert.alert('Login Error', 'Incorrect password.');
                                break;
                              case 'auth/invalid-email':
                                Alert.alert('Login Error', 'Invalid email entered.');
                                break;
                              case 'auth/invalid-credential':
                                Alert.alert('Login Error', 'Invalid credential');
                                break;
                              default:
                                Alert.alert('Login Error', error.message);
                            }
                          });
                      }}/>
                <CustomButton 
                    text='Forgot Password?' 
                    onPress={ ()=> { 
                      console.log('Forgot Password button pressed') 
                      router.navigate('/screens/Authentication/ResetPasswordScreen1')}} 
                      type='TERTIARY'
                    />
                <SocialSignInButtons/>
                <CustomButton 
                    text= "Don't have an account? Create one!" 
                    onPress={ ()=> {
                      router.navigate('/screens/Authentication/SignUpScreen')}} 
                      type='TERTIARY'
                    />
            </SafeAreaView>
            </ScrollView>
        ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF2CD',
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,

    },
    logo: {
        width: 430, //70% of the container's width
        height: 430,
        marginTop: 40,
        marginBottom:15,
    },
    text: {
        fontSize: 35,
        color: '#551B26',
        marginTop:"15%",
        fontWeight: 'bold',
    }
});

export default SignInScreen;