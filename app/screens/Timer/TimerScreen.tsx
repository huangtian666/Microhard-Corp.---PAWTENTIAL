import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';

 
const Timer = () => {
   
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 20, backgroundColor: 'white'}} >
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Timer</Text>   
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
});

export default Timer;