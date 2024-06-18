import {View, Text, StyleSheet, useWindowDimensions, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';
import { useRoute } from '@react-navigation/native';

const ResetPasswordScreen3 = () => {
    const route = useRoute();
    const[password, setPassword] = useState('');
    const[confirmPW, setConfirmPW] = useState('');
    const { email } = route.params;

    const isValidPassword = (password: string): boolean => {
        const minLength = 8;
        const hasNumber = /\d/.test(password);
        const hasUpper = /[A-Z]/.test(password);
        const hasSpecial = /[!@#\$%\^\&*\)\(+=._-]/.test(password);
    
        return password.length >= minLength && hasNumber && hasUpper && hasSpecial;
    };

    const onResetPressed = async () => {
        console.log('reset password');
        
        if (!isValidPassword(password)) {
            return;
        }

        if (password !== confirmPW) {
            Alert.alert('Error', 'Passwords do not match.');
            return;
        }
        try {
            const response = await fetch('http://192.168.101.29:3001/reset-password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                Alert.alert('Success', 'Password reset successfully.');
                router.navigate('/screens/Authentication/SignInScreen')
            } else {
                Alert.alert('Error', 'Failed to reset password. Please try again.');
            }
        } catch (err) {
            console.error('Error updating password:', err);
            Alert.alert('Error', 'Failed to reset password. Please try again.');
        }
    };

    const onSignInPressed = () => {
        console.log('Back to Sign In') 
        router.navigate('/screens/Authentication/SignInScreen')
    }

    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#FFF2CD'}}>
            <View style={styles.container}>
                <Text style ={styles.text}>Reset Your Password</Text>
                <Text style = {styles.label}>Reset Password</Text>
                <CustomInput placeholder='new password' value={password} 
                setValue = {setPassword} placeholderTextColor='gray' secureTextEntry={true}/>
                <Text style = {styles.label}>Confirm Password</Text>
                <CustomInput placeholder='confirm password' value={confirmPW} 
                setValue = {setConfirmPW} placeholderTextColor='gray' secureTextEntry={true}/>
                <CustomButton 
                    text='Reset Password' 
                    onPress={onResetPressed}
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
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
        flex: 1,
    },
    text: {
        fontSize: 30,
        color: '#551B26',
        marginTop:130,
        fontWeight: 'bold',
        paddingBottom: 40,
    },
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        paddingLeft: '8%', // Responsive padding from the left
        alignSelf: 'flex-start',
    },
});

export default ResetPasswordScreen3;