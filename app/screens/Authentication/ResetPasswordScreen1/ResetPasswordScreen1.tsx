import {View, Text, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {Link, router} from 'expo-router';

const ResetPasswordScreen1 = () => {
    const[email, setEmail] = useState('');

    const onSendCodePressed = () => {
        console.warn('Send Code')
    }

    const {height} = useWindowDimensions();
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text}>Reset Your Password</Text>
                <Text style = {styles.label}>Email</Text>
                <CustomInput placeholder='xxxxxx@email.com' value={email} 
                setValue = {setEmail} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Send Verfication Code' 
                    onPress={ ()=> { console.warn('Verification Code') 
                    router.navigate('/screens/Authentication/ResetPasswordScreen2')}} 
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
        flex:1,
        backgroundColor:'#FFF2CD',
        paddingBottom: 460,
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
        marginLeft: -270,
    },
});

export default ResetPasswordScreen1;