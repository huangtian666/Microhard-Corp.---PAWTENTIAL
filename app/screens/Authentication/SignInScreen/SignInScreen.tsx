import {View, Text, Image, StyleSheet, useWindowDimensions, ScrollView} from 'react-native';
import Logo from '../../../../assets/images/PAWTENTIAL_icon_nobg.png'
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import SocialSignInButtons from '@/components/SocialSignInButtons/SocialSignInButtons';
import { Link, router } from 'expo-router';

const SignInScreen = () => {
    const[username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    //useState hook is used to create a state variable inputValue &
    // a state update function setInputValue

    const {height} = useWindowDimensions();
    return (
        <ScrollView>
            <View style={styles.container}>
                <Text style ={styles.text}>PAWTENTIAL!</Text>
                <Image 
                    source ={Logo} 
                    style={[styles.logo,
                    {height: height * 0.3}]}
                    />
                <CustomInput placeholder='Username' value={username} 
                setValue = {setUsername} placeholderTextColor='gray'/>
                <CustomInput placeholder='Password' value={password} 
                setValue = {setPassword} secureTextEntry={true} placeholderTextColor='gray'/>
                <CustomButton 
                    text='Sign In' 
                    onPress={ ()=> { console.warn('Signed In') 
                    router.navigate('/screens/home')}} 
                    />
                <CustomButton 
                    text='Forgot Password?' 
                    onPress={ ()=> { console.warn('Forgot Password button pressed') 
                    router.navigate('/screens/Authentication/ResetPasswordScreen1')}} 
                    type='TERTIARY'
                    />
                <SocialSignInButtons/>
                <CustomButton 
                    text= "Don't have an account? Create one!" 
                    onPress={ ()=> { console.warn('Sign Up') 
                    router.navigate('/screens/Authentication/SignUpScreen')}} 
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
        paddingBottom: 30
    },
    logo: {
        width: 410, //70% of the container's width
        height: 410,
        marginTop:40,
        marginBottom:15,
    },
    text: {
        fontSize: 35,
        color: '#551B26',
        marginTop:20,
        fontWeight: 'bold',
    }
});

export default SignInScreen;