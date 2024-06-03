import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import SocialSignInButtons from '../../../../components/SocialSignInButtons';
import {router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import {createUserWithEmailAndPassword} from 'firebase/auth';

const SignUpScreen = () => {
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[forgotPassword,setForgotPassword] = useState('');
    const auth = FIREBASE_AUTH;
    //useState hook is used to create a state variable inputValue &
    // a state update function setInputValue

    const onTermsOfUsePressed = () => {
        console.warn('Terms of Use');
    }

    const onPrivacyPolicyPressed = () => {
        console.warn('Privacy Policy');
    }

    const isValidPassword = (password: string): boolean => {
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasSpecial = /[!@#\$%\^\&*\)\(+=._-]/.test(password);
    
        return password.length >= minLength && hasNumber && hasUpper && hasSpecial;
    };
    
    

    const {height} = useWindowDimensions();
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text1}>Create Your Account!</Text>
                <Text style = {styles.label}>Username</Text>
                <CustomInput placeholder='Username' value={username} 
                setValue = {setUsername} placeholderTextColor='gray'/>
                <Text style = {styles.label}>Email</Text>
                <CustomInput placeholder='xxxxxx@email.com' value={email} 
                setValue = {setEmail} placeholderTextColor='gray'/>
                <Text style = {styles.label}>Password</Text>
                <CustomInput placeholder='Password' value={password} 
                setValue = {setPassword} secureTextEntry={true} placeholderTextColor='gray'/>
                <Text style = {styles.label}>Confirm your password</Text>
                <CustomInput placeholder='Confirm password' value={forgotPassword} 
                setValue = {setForgotPassword} secureTextEntry={true} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Sign Up' 
                    onPress={ ()=> { console.warn('Verfication Code Sent') 
                    createUserWithEmailAndPassword(auth,email, password)
                    .then(() => {
                        console.log('User account created & signed in!');
                        router.navigate('/screens/Authentication/ConfirmEmail')
                        }).catch(error => {
                    if (error.code === 'auth/email-already-in-use') {
                        console.log('That email address is already in use!');
                    }
                    if (error.code === 'auth/invalid-email') {
                        console.log('That email address is invalid!');
                    }
                    console.error(error);
                    });
                }} 
                    />
                <Text style = {styles.text2}> 
                    By signing up, you confirm that you accept our {' '}
                    <Text style = {styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
                    <Text style = {styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
                    </Text>
                <Text style = {styles.text3}>---------------------------------------------------------</Text>
                <SocialSignInButtons/>
                <CustomButton 
                    text= "Have an account already? Sign In!" 
                    onPress={ ()=> { console.warn('Back to Sign In') 
                    router.navigate('/screens/Authentication/SignInScreen')}} 
                    type='TERTIARY'
                    />
            </View>
            </ScrollView>
        ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF2CD',
        paddingTop: 60,
        padding: 10,
        width: '100%',
    },
    text1: {
        fontSize: 30,
        color: '#551B26',
        marginTop:40,
        fontWeight: 'bold',
        marginBottom: 40,
    },
    text2: { 
        fontSize: 12,
        marginTop: 10,
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    text3: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 20,
    },
    link: {
        fontWeight: 'bold',
    },
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'left',
    }
});

export default SignUpScreen;