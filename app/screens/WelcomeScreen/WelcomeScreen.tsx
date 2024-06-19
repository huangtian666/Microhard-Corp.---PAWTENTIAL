import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert, Button} from 'react-native';
import React from 'react';
import CustomButton from '../../../components/CustomButton';
import {router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import Welcome from '../../../assets/images/welcome.png';
 
const WelcomeScreen = () => {
    const auth = FIREBASE_AUTH;
    const MIN_USERNAME_LENGTH = 2;

    const onNextPressed = async () => {
        console.log('Next pressed');
        router.push('/screens/BoardingQuestions/Question1')
    };
    
    return (
        <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 20, backgroundColor: '#FFF2CD'}} >
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Welcome</Text>
                <Text style ={styles.text2}>to</Text>
                <Text style ={styles.text2}>PAWTENTIAL!</Text>
                <Image
                    source = {Welcome}
                    style = {styles.image}
                />  
                <Text style = {styles.message}>Unlock your full potential with our study and productivity companion!</Text>
                <CustomButton 
                    text='Next' 
                    onPress={ onNextPressed }
                    type='PRIMARY_SHORT'
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
        marginTop: '20%',
    },
    text2: {
        fontSize: 30,
        color: '#551B26',
        fontWeight: 'bold',
    },
    message: {
        color: '#551B26',
        fontSize: 15,
        marginBottom: '10%',
        textAlign: 'center',
        paddingHorizontal: '15%',
    },
    image: {
        width:'90%',
        height: '30%',
        marginTop: '15%',
        marginBottom: '15%'
    },
});

export default WelcomeScreen;