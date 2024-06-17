import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import Dog from '../../../../assets/images/corgi_winter.png'
 
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
    
    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Name Your Pet!</Text>
                <Text style = {styles.label}>Pet Name</Text>
                <CustomInput placeholder='snowy...' value={petname} 
                setValue = {setPetname} placeholderTextColor='gray'/>
                <CustomButton  
                    text='Get Started' 
                    onPress={ onStartPressed }
                    />
                <CustomButton 
                    text= "Previous Page" 
                    onPress={ ()=> { 
                        console.log('Previous Page') 
                        router.navigate('/screens/BoardingQuestions/Question1')}} 
                        type='TERTIARY'
                    />
                <Image
                    source = {Dog}
                    style = {styles.image}
                />    
            </SafeAreaView>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#FFF2CD',
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
        width: '80%',
        height: '35%',
    }
});

export default Question2;