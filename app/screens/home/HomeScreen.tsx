import { Link } from 'expo-router';
import { View, Text, StyleSheet,Button, TouchableOpacity,Image} from 'react-native';
import naruto from '../../../assets/images/naruto.png';
import CustomButton from '@/components/CustomButton';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import { signOut } from 'firebase/auth';
import {router, useRouter} from 'expo-router';
import React from 'react';


export default function HomeScreen() {

  const auth = FIREBASE_AUTH;
  const router = useRouter();

  const handlePress = () => {
    console.log("pressed") //print messages to the console
  } // arrow function in js

  const pressImage = () => {
    console.log("meow")
  }

  const handleSignOut = () => {
    signOut(auth).then(() => {
            console.warn('User signed out');
            router.push('/screens/Authentication/SignInScreen');
        })
        .catch(error => {
            console.error('Sign out error:', error);
        });
};


  return (
    <View style={styles.container}>
      <Text style ={styles.text}>Welcome to PAWTENTIAL!</Text> 
      <Button title = "Timer" onPress={handlePress} /> 
      <Link href="/details" style ={styles.link}>View details</Link>
      <TouchableOpacity onPress={pressImage}>
        <Image 
            source ={naruto}
            style={styles.image}/>
      </TouchableOpacity>
    <CustomButton
        text='Sign Out' 
        onPress={handleSignOut}
    />
    </View>
 )}

const styles = StyleSheet.create({
  container: {
    flex: 1,//make everything(words, images) occupy the entire page
    justifyContent: 'center',
    alignItems: 'center',
    //flexDirection: "row"
  },// flexbox 
  text: {
    color: "green",
    fontSize: 20,
  },  
  link: {
    color: 'orange',
    fontSize: 18,
  },
  image: {
    width: 80,
    height: 250,
  },
  touchable: {
    marginTop: 50,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#ddd',
    position: 'absolute',
    top: 50,
    left: 50,
  },
});
