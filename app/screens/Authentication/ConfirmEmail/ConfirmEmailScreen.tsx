import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';

const SignUpScreen = () => {
    const[code, setCode] = useState('');


    const onTermsOfUsePressed = () => {
        console.warn('Terms of Use');
    }

    const onPrivacyPolicyPressed = () => {
        console.warn('Privacy Policy');
    }

    const onResendPressed = () => {
        console.warn('Resend code')
    }

    const {height} = useWindowDimensions();
    
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text1}>Confirm Your Email!</Text>
                <Text style = {styles.label}>Verfication Code</Text>
                <CustomInput placeholder='Enter code' value={code} 
                setValue = {setCode} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Confirm' 
                    onPress={ ()=> { console.warn('Signed Up Successfully') 
                    router.navigate('/screens/Authentication/SignInScreen')}} 
                    style ={styles.confirmButton}
                    />
                <CustomButton 
                    text='Resend Code'
                    onPress={onResendPressed}
                    type='SECONDARY'
                    />
                <Text style = {styles.text2}> 
                    By signing up, you confirm that you accept our {' '}
                    <Text style = {styles.link} onPress={onTermsOfUsePressed}>Terms of Use</Text> and {' '}
                    <Text style = {styles.link} onPress={onPrivacyPolicyPressed}>Privacy Policy</Text>
                    </Text>
                <CustomButton 
                    text= "Back to Sign In" 
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
        paddingTop: 50,
        width: '100%',
        paddingBottom: 350,
    },
    text1: {
        fontSize: 30,
        color: '#551B26',
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: 60,
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
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        textAlign: 'left',
        marginLeft: -210,
    },
    confirmButton: {
        top: 50,
    }
});

export default SignUpScreen;