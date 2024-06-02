import {View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';

const ResetPasswordScreen2 = () => {
    const[code, setCode] = useState('');

    const onProceedPressed = () => {
        console.warn('Proceed')
    }

    const onResendPressed = () => {
        console.warn('Resend Code');
    }

    const onSignInPressed = () => {
        console.warn('SignIn');
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text}>Reset Your Password</Text>
                <Text style ={styles.reminder}>We have just sent you an email about 
                the verification code.</Text>
                <Text style = {styles.label}>Verification Code</Text>
                <CustomInput placeholder='Enter 6 digit code' value={code} 
                setValue = {setCode} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Proceed' 
                    onPress={ ()=> { console.warn('Set New Password') 
                    router.navigate('/screens/Authentication/ResetPasswordScreen3')}} 
                    />
                <CustomButton 
                    text='Resend Code' 
                    onPress={onResendPressed} 
                    type='SECONDARY'
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
        paddingTop: 60,
        flex: 1,
        backgroundColor:'#FFF2CD',
        paddingBottom: 340,
    },
    text: {
        fontSize: 30,
        color: '#551B26',
        marginTop:60,
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
        textAlign: 'left',
        marginLeft: -230,
    },
});

export default ResetPasswordScreen2;