import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert, Animated} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import CustomInput from '../../../../components/CustomInput';
import CustomButton from '../../../../components/CustomButton';
import {router} from 'expo-router';
import { FIREBASE_AUTH, FIREBASE_DB } from '@/FirebaseConfig';
import Student from '../../../../assets/images/students.png';
import Hello from '../../../../assets/images/hello.png';
import { saveUserData } from '@/FirestoreService';
 
const Question1 = () => {
    const auth = FIREBASE_AUTH;
    const db = FIREBASE_DB;
    const MIN_USERNAME_LENGTH = 2;
    const [username, setUsername] = useState(''); // Track email verification status
    const [showImage, setshowImage] = useState(false);
    const cleanedUsername = username.trim();

    const fadeAnim = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        if (showImage) {
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 800,
                useNativeDriver: true,
            }).start();
        } else {
            fadeAnim.setValue(0);
        }
    }, [showImage]);

    const handleTextChange = (text) => {
        setUsername(text);
        setshowImage(text.trim().length > 0);
    }

    const onNextPressed = async () => {
        console.log('Next pressed');

        if (cleanedUsername === '') {
            Alert.alert('Missing Username', 'Please enter a username')
            return;
        }  
        if (cleanedUsername.length <= MIN_USERNAME_LENGTH) {
            Alert.alert('Invalid Username', 'Your username must be more than 2 characters')
            return;
        }
        if (cleanedUsername.includes(' ')) {
            Alert.alert('Invalid Username', 'Your username should not contain any space')
        }

        const user = auth.currentUser;
        if (user) {
          await saveUserData(user.uid, { cleanedUsername });
          router.push('/screens/BoardingQuestions/Question2');
        } else {
          Alert.alert('Error', 'User not authenticated');
        }
    };


    const onPreviousPressed = async () => {
        console.log('Previous Page') 
        router.push('/screens/WelcomeScreen')
    };
    
    return (
        <ScrollView contentContainerStyle={{flexGrow: 1, backgroundColor: '#FFF2CD', paddingBottom: 15}}>
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Create Your Username!</Text>
                <Text style = {styles.label}>Username</Text>
                <CustomInput placeholder='Username' value={username} 
                setValue = {handleTextChange} placeholderTextColor='gray'/>
                <CustomButton  
                    text='Next' 
                    onPress={ onNextPressed }
                />
                <CustomButton 
                    text= "Previous Page" 
                    onPress={onPreviousPressed} 
                    type='TERTIARY'
                /> 
                {showImage && (
                    <Animated.View style={{ opacity: fadeAnim }}>
                        <Image
                        source={Hello}
                        style={styles.hello}
                        />
                    </Animated.View>
                )}
                <Image
                    source = {Student}
                    style = {styles.students}
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
        marginBottom: '15%',
        marginTop: '15%',
    },
    label: {
        color: 'grey',
        fontSize: 15,
        marginTop: 10,
        paddingLeft: '8%', // Responsive padding from the left
        alignSelf: 'flex-start',
    },
    students: {
        position: 'absolute',
        marginTop: 650,
        marginBottom:0,
        width: '100%',
        height: '35%',
    },
    hello: {
        height: 140,
        marginTop: '20%',
        resizeMode: 'contain',
    }
});

export default Question1;