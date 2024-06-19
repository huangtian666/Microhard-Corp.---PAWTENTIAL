import { Text, Image, StyleSheet, useWindowDimensions, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import {sendEmailVerification} from 'firebase/auth';
import { SafeAreaView } from 'react-native-safe-area-context';

const ConfirmEmailScreen = () => {
    const auth = FIREBASE_AUTH;

    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [countdown, setCountdown] = useState(60);
    const [emailVerified, setEmailVerified] = useState(false); // Track email verification status

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                user.reload().then(() => {
                    setEmailVerified(user.emailVerified);
                });
            }
        });

        let timer;
        if (countdown > 0) {
            console.log('count down start');
          timer = setInterval(() => {
            setCountdown((prevCountdown) => {
              if (prevCountdown === 1) {
                clearInterval(timer);
                setIsButtonDisabled(false);
                return 0; // Reset countdown
              }
              return prevCountdown - 1;
            });
          }, 1000);
        }
        return () => clearInterval(timer);
      }, [countdown]);


    const onTermsOfUsePressed = () => {
        console.warn('Terms of Use');
    }

    const onPrivacyPolicyPressed = () => {
        console.warn('Privacy Policy');
    }

    const onResendPressed = async () => {
        setIsButtonDisabled(true); // Disable the button
        setCountdown(60);
        try {
            await sendEmailVerification(auth.currentUser);
            console.log('Resend code');
            Alert.alert('Success', 'Verification email resent. Please check your email.');
        } catch (error) {
            if (error.code === 'auth/too-many-requests') {
                Alert.alert('Error', 'Too many requests. Please try again later.');
            } else {
                Alert.alert('Error', error.message);
            }
        }
    };

    const onConfirmPressed = async () => {
        if (auth.currentUser) {
            await auth.currentUser.reload();
            if (auth.currentUser.emailVerified) {
                router.navigate('/screens/Authentication/SignInScreen');
            } else {
                Alert.alert('Email not verified', 'Please verify your email');
            }
        }
    }


    const {height} = useWindowDimensions();
    
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#FFF2CD'}}>
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Confirm Your Email!</Text>
                <Text style = {styles.instruction}>Please check your email to verify your account.{'\n'}
                If you haven't received the verification email, click 'Resend Code' to receive a new one.{'\n'}
                Once you have verified your email, click 'Confirm' to proceed.
                </Text>
                <CustomButton  
                    text='Confirm' 
                    onPress={ onConfirmPressed }
                    style ={styles.confirmButton} 
                    />
                <CustomButton 
                    text={countdown > 0 ? `Resend Link (${countdown})` : 'Resend Link'}
                    onPress={onResendPressed}
                    type='SECONDARY'
                    disabled={isButtonDisabled}
                    />
                <Text style = {styles.text2}> 
                    By signing up, you confirm that you accept our {' '}
                    <Text style = {styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
                    <Text style = {styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
                    </Text>
                <CustomButton 
                    text= "Back to Sign In" 
                    onPress={ ()=> { 
                        console.log('Back to Sign In') 
                        router.navigate('/screens/Authentication/SignInScreen')}} 
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
    text1: {
        fontSize: 30,
        color: '#551B26',
        fontWeight: 'bold',
        marginBottom: '15%',
        marginTop: '15%',
    },
    text2: { 
        fontSize: 12,
        marginTop: 20,
        marginBottom: 20,
        textAlign: 'center',
        paddingHorizontal: 10,
    },
    link: {
        fontWeight: 'bold',
    },
    instruction: {
        color: '#551B26',
        fontSize: 15,
        marginBottom: 20,
        paddingHorizontal: 25,
    },
    confirmButton: {
        top: 50,
    }
});

export default ConfirmEmailScreen;