import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import Dog from '../../../../assets/images/dogwithframe.png';
import Paws from '../../../../assets/images/paws.png'
 
const Question2 = () => {
    const auth = FIREBASE_AUTH;
    const MIN_USERNAME_LENGTH = 2;
    const [petname, setPetname] = useState(''); // Track email verification status

    const onStartPressed = async () => {
        console.log('Start pressed');

        if (petname.trim() === '') {
            Alert.alert('Missing Username', 'Please enter a username')
            return;
        }  
        if (petname.length <= MIN_USERNAME_LENGTH) {
            Alert.alert('Invalid Username', 'Your username must be more than 2 characters')
            return;
        }
        if (petname.includes(' ')) {
            Alert.alert('Invalid Username', 'Your username should not contain any space')
        }
    };

    const onPreviousPressed = async () => {
        console.log('Previous Page') 
        router.push('/screens/BoardingQuestions/Question1')
    };
    
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 20, backgroundColor: '#FFF2CD'}} >
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Name Your Pet!</Text>
                <Image
                    source = {Dog}
                    style = {styles.image}
                />  
                <Text style = {styles.label}>Pet Name</Text>
                <CustomInput placeholder='snowy...' value={petname} 
                setValue = {setPetname} placeholderTextColor='gray'/>
                <CustomButton  
                    text='Get Started' 
                    onPress={ onStartPressed }
                />
                <CustomButton 
                    text= "Previous Page" 
                    onPress={onPreviousPressed} 
                    type='TERTIARY'
                />
                <Image
                    source = {Paws}
                    style = {styles.paws}
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
        marginBottom: '10%',
        marginTop: '15%',
    },
    label: {
        color: 'grey',
        fontSize: 15,
        paddingLeft: '8%', // Responsive padding from the left
        alignSelf: 'flex-start',
    },
    image: {
        width:'90%',
        height: '40%',
    },
    paws: {
        width:'100%',
        height: '30%',
    }
});

export default Question2;