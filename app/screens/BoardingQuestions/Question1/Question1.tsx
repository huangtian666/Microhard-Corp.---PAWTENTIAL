import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import Student from '../../../../assets/images/students.png'
 
const Question1 = () => {
    const auth = FIREBASE_AUTH;
    const MIN_USERNAME_LENGTH = 2;
    const [username, setUsername] = useState(''); // Track email verification status

    const onNextPressed = async () => {
        console.log('Next pressed');

        if (username.trim() === '') {
            Alert.alert('Missing Username', 'Please enter a username')
            return;
        }  
        if (username.length <= MIN_USERNAME_LENGTH) {
            Alert.alert('Invalid Username', 'Your username must be more than 2 characters')
            return;
        }
        if (username.includes(' ')) {
            Alert.alert('Invalid Username', 'Your username should not contain any space')
        }

        router.push('/screens/BoardingQuestions/Question2')
    };
    
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#FFF2CD'}}>
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Create Your Username!</Text>
                <Text style = {styles.label}>Username</Text>
                <CustomInput placeholder='Username' value={username} 
                setValue = {setUsername} placeholderTextColor='gray'/>
                <CustomButton  
                    text='Next' 
                    onPress={ onNextPressed }
                    />
                <CustomButton 
                    text= "Back to Sign In" 
                    onPress={ ()=> { 
                        console.log('Back to Sign In') 
                        router.navigate('/screens/Authentication/SignInScreen')}} 
                        type='TERTIARY'
                    />
                <Image
                    source = {Student}
                    style = {styles.image}
                />    
            </SafeAreaView>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,
    },
    text1: {
        fontSize: 30,
        color: '#551B26',
        fontWeight: 'bold',
        marginBottom: 40,
        marginTop: '20%',
    },
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        paddingLeft: '8%', // Responsive padding from the left
        alignSelf: 'flex-start',
    },
    image: {
        marginTop: '50%',
        marginBottom:0,
        width: '100%',
        height: '35%',
    }
});

export default Question1;