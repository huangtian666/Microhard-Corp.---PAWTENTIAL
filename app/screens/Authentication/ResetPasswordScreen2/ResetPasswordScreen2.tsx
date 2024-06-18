import {View, Text, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';
import { useRoute } from '@react-navigation/native';

const ResetPasswordScreen2 = () => {
    const route = useRoute();
    const { email, code: initialVerificationCode } = route.params;
    const [code, setCode] = useState('');
    const [verificationCode, setVerificationCode] = useState(initialVerificationCode);
    const [countdown, setCountdown] = useState(60);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

    useEffect(() => {
        console.log('Initial Verification Code:', initialVerificationCode);
        setVerificationCode(initialVerificationCode);
    }, [initialVerificationCode]);

    useEffect(() => {
        let timer;
        if (countdown > 0) {
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

    const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    /*const onVerifyPressed = () => {
        console.log('Entered Code:', code);
        console.log('Stored Verification Code:', verificationCode);
        if (code.trim() === verificationCode) {
            router.push({
                pathname: '/screens/Authentication/ResetPasswordScreen3',
                params: { email },
            });
        } else if (code.trim() === ''){
            Alert.alert('Error', 'Please enter your verification code.');
        } else {
            Alert.alert('Error', 'Invalid or expired verification code.');
        }
    };

    const onResendPressed = async () => {
        console.log('Resend Code');

        const newCode = generateVerificationCode();
        console.log(`Generated verification code: ${newCode}`);

        try {
            console.log(`Sending verification code to ${email}`);

            const response = await fetch('http://192.168.101.29:3000/send-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, code: newCode }),
            });

            if (response.ok) {
                console.log('Verification email sent successfully');
                setVerificationCode(newCode);
                setCountdown(60);
                setIsButtonDisabled(true);
                Alert.alert('Success', 'Verification code sent to your email. Please check your email.');
            } else {
                const responseData = await response.json();
                console.error('Failed to send verification code:', responseData);
                Alert.alert('Error', `Failed to send verification code. Server responded with: ${responseData.message || 'Unknown error'}`);
            }
        } catch (error) {
            console.error('Error sending verification code:', error);
            Alert.alert('Error', 'Failed to send verification code. Please try again.');
        }
    };*/

    const onVerifyPressed = async () => {
        try {
          const response = await fetch('http://192.168.101.29:3001/verify-code', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code }),
          });
    
          const responseText = await response.text(); // Get the raw response text
          console.log('Raw response text:', responseText);
    
          if (response.ok) {
            const responseData = JSON.parse(responseText);
            console.log('Code verified successfully');
            router.push({
              pathname: '/screens/Authentication/ResetPasswordScreen3',
              params: { email },
            });
          } else {
            const responseData = JSON.parse(responseText);
            console.error('Failed to verify code:', responseData);
            Alert.alert('Error', `Failed to verify code. Server responded with: ${responseData.message || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error verifying code:', error);
          Alert.alert('Error', 'Failed to verify code. Please try again.');
        }
      };
    
      const onResendPressed = async () => {
        console.log('Resend Code');
    
        const newCode = generateVerificationCode();
        console.log(`Generated verification code: ${newCode}`);
    
        try {
          console.log(`Sending verification code to ${email}`);
    
          const response = await fetch('http://192.168.101.29:3001/send-verification-email', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, code: newCode }),
          });
    
          const responseText = await response.text(); // Get the raw response text
          console.log('Raw response text:', responseText);
    
          if (response.ok) {
            setVerificationCode(newCode);
            setCountdown(60); // Reset countdown to 60 seconds
            setIsButtonDisabled(true);
            Alert.alert('Success', 'Verification code sent to your email. Please check your email.');
          } else {
            const responseData = JSON.parse(responseText);
            console.error('Failed to send verification code:', responseData);
            Alert.alert(`Failed to send verification code', '${responseData.message || 'Unknown error'}`);
          }
        } catch (error) {
          console.error('Error sending verification code:', error);
          Alert.alert('Error', 'Failed to send verification code. Please try again.');
        }
    };

    const onSignInPressed = () => {
        console.log('Back to SignIn');
        router.navigate('/screens/Authentication/SignInScreen')
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#FFF2CD'}}>
            <View style={styles.container}>
                <Text style ={styles.text}>Reset Your Password</Text>
                <Text style ={styles.reminder}>We have just sent you an email about 
                the verification code.</Text>
                <Text style = {styles.label}>Verification Code</Text>
                <CustomInput placeholder='Enter 6 digit code' value={code} 
                setValue = {setCode} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Verify' 
                    onPress={onVerifyPressed} 
                    />
                <CustomButton 
                    text={countdown > 0 ? `Resend Code (${countdown})` : 'Resend Code'}
                    onPress={onResendPressed} 
                    type='SECONDARY'
                    disabled={isButtonDisabled}
                    />
                <CustomButton 
                    text='Back to Sign In' 
                    onPress={onSignInPressed} 
                    type='TERTIARY'
                    />
            </View>
            </ScrollView>
        ); 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    text: {
        fontSize: 30,
        color: '#551B26',
        marginTop:130,
        fontWeight: 'bold',
    },
    reminder: {
        color: '#551B26',
        fontSize: 15,
        paddingVertical: 40,
        paddingLeft: 20,
        paddingRight:15,
        textAlign:'left',
    },
    label: {
        color: 'grey',
        fontSize: 15,
        paddingLeft: '8%', // Responsive padding from the left
        alignSelf: 'flex-start',
    },
});

export default ResetPasswordScreen2;