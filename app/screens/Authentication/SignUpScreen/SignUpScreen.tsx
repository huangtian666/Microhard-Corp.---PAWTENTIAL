import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, Alert,Dimensions} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import SocialSignInButtons from '../../../../components/SocialSignInButtons';
import {router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import {createUserWithEmailAndPassword, signInWithPopup, sendEmailVerification} from 'firebase/auth';

const SignUpScreen = () => {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmPassword,setConfirmPassword] = useState('');
    const auth = FIREBASE_AUTH;
    //useState hook is used to create a state variable inputValue &
    // a state update function setInputValue
    const cleanedEmail = email.trim().toLowerCase();

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

    const isValidEmail = (cleanedEmail: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(cleanedEmail);
    };

    /*
    ^: Asserts the position at the start of the string.
    [^\s@]+: Matches one or more characters that are not whitespace (\s) or @.
    @: Matches the literal @ character.
    [^\s@]+: Matches one or more characters that are not whitespace or @.
    \.: Matches the literal . character (escaped because . is a metacharacter).
    [^\s@]+: Matches one or more characters that are not whitespace or @.
    $: Asserts the position at the end of the string.
    test(email) checks if the email matches the pattern, 
    returning true for valid emails and false otherwise. */

    const handleSignUp = async () => {
        if (!isValidEmail(cleanedEmail)) {
            Alert.alert('Invalid Email', 'Please enter a valid email address.');
            return;
        }

        if (!isValidPassword(password)) {
            Alert.alert('Invalid Password', 'Password must be at least 8 characters long and contain a number, an uppercase letter, and a special character.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Passwords do not match.');
            return;
        }

        try {
            await createUserWithEmailAndPassword(auth, cleanedEmail, password).then((userCredentials) => {
                sendEmailVerification(userCredentials.user).then(() => {
                    //Alert.alert('Verification Email Sent', 
                    //'Please check your email to verify your account.');
                    // Navigate to a screen that tells the user to verify their email
                    router.navigate('/screens/Authentication/ConfirmEmail');
                    
                })
            
            })
            //const user = userCredential.user;
            
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'This email address is already in use!');
            } else if (error.code === 'auth/invalid-email') {
                Alert.alert('Error', 'This email address is invalid!');
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    const {height} = useWindowDimensions();
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text1}>Create Your Account!</Text>
                <Text style = {styles.label}>Email</Text>
                <CustomInput placeholder='xxxxxx@email.com' value={email} 
                setValue = {setEmail} placeholderTextColor='gray'/>
                <Text style = {styles.label}>Password</Text>
                <CustomInput placeholder='Password' value={password} 
                setValue = {setPassword} secureTextEntry={true} placeholderTextColor='gray'/>
                <Text style = {styles.label}>Confirm your password</Text>
                <CustomInput placeholder='Confirm password' value={confirmPassword} 
                setValue = {setConfirmPassword} secureTextEntry={true} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Sign Up' 
                    onPress={handleSignUp}
                    />
                <Text style = {styles.text2}> 
                    By signing up, you confirm that you accept our {' '}
                    <Text style = {styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
                    <Text style = {styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
                    </Text>
                <Text style = {styles.text3}>-------------------------------------------------------------</Text>
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
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    text1: {
        fontSize: 30,
        color: '#551B26',
        marginTop:130,
        marginBottom: 40,
        fontWeight: 'bold',
    },
    text2: { 
        fontSize: 12,
        marginTop: 20,
        marginBottom: 30,
        paddingHorizontal: 15,
        textAlign: 'center',
    },
    text3: {
        fontSize: 12,
        textAlign: 'center',
        marginBottom: 30,
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