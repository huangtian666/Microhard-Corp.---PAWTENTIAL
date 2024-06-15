import {View, Text, StyleSheet, useWindowDimensions, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {Link, router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { checkUserExists } from '@/components/checkUserExists';
import { useRoute} from '@react-navigation/native';


const ResetPasswordScreen1 = () => {
    const route = useRoute();
    const auth = FIREBASE_AUTH;

    const[email, setEmail] = useState('');

    const generateVerificationCode = () => {
        return Math.floor(100000 + Math.random() * 900000).toString();
    };

    const onSendPressed = async () => {
        const cleanedEmail = email.trim().toLowerCase();
        if (cleanedEmail === '') {
            Alert.alert('Error', 'Please enter your email address.');
            return;
        }
    
        const verificationCode = generateVerificationCode();
        console.log(`Generated verification code: ${verificationCode}`);
    
        try {
            /*const userExists = await checkUserExists(cleanedEmail);
            if (!userExists) {
                Alert.alert('Error', 'No user found with this email address.');
                return;
            }*/
    
            console.log(`Sending verification code to ${cleanedEmail}`);
    
            const response = await fetch('https://pawtential-00eb93d0803f.herokuapp.com/send-verification-email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: cleanedEmail, code: verificationCode }),
            });
    
            if (response.ok) {
                console.log('Verification email sent successfully');
                //Alert.alert('Success', 'Verification code sent to your email. Please check your email.');
                router.push({
                    pathname: '/screens/Authentication/ResetPasswordScreen2',
                    params: { email: cleanedEmail, code: verificationCode },
                });
            } else {
                const responseData = await response.json();
                console.error('Failed to send verification code:', responseData);
                Alert.alert('Error', `Failed to send verification code.`);
            }
        } catch (error) {
            console.error('Error sending verification code:', error);
            Alert.alert('Error', 'Failed to send verification code. Please try again.');
        }
    };

    const {height} = useWindowDimensions();

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text}>Reset Your Password</Text>
                <Text style = {styles.label}>Enter your email address to reset your password:</Text>
                <CustomInput placeholder='xxxxxx@email.com' value={email} 
                setValue = {setEmail} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Send Verification Code' 
                    onPress={onSendPressed}
                    />
                <CustomButton 
                    text='Back to Sign In' 
                    onPress={ ()=> {
                        console.log('Back to Sign In') 
                        router.navigate('/screens/Authentication/SignInScreen')}} 
                        type='TERTIARY'
                    />
            </View>
            </ScrollView>
        ); 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex:1,
        backgroundColor:'#FFF2CD',
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    text: {
        fontSize: 30,
        color: '#551B26',
        marginTop:130,
        marginBottom: 40,
        fontWeight: 'bold',
    },
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'left',
        paddingLeft: '8%', // Responsive padding from the left
        alignSelf: 'flex-start',
    },
});

export default ResetPasswordScreen1;