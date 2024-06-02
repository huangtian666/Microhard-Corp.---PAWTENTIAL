import {View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';

const ResetPasswordScreen3 = () => {
    const[password, setPassword] = useState('');
    const[confirmPW, setConfirmPW] = useState('');

    const onResetPressed = () => {
        console.warn('Sucessfully Reset');
    }

    const onSignInPressed = () => {
        console.warn('SignIn');
    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text}>Reset Your Password</Text>
                <Text style = {styles.label}>Reset Password</Text>
                <CustomInput placeholder='new password' value={password} 
                setValue = {setPassword} placeholderTextColor='gray'/>
                <Text style = {styles.label}>Verification Code</Text>
                <CustomInput placeholder='confirm password' value={confirmPW} 
                setValue = {setConfirmPW} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Reset Password' 
                    onPress={onResetPressed}
                    />
                <CustomButton 
                    text='Back to Sign In' 
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
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 370,
        flex: 1,
        backgroundColor:'#FFF2CD',
    },
    text: {
        fontSize: 30,
        color: '#551B26',
        marginTop:60,
        fontWeight: 'bold',
        paddingBottom: 40,
    },
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'left',
        marginLeft: -210,
    },
});

export default ResetPasswordScreen3;