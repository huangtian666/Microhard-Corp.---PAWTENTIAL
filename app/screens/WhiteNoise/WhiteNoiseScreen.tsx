import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';

 
const WhiteNoiseScreen = () => {
   
    return (
        <ScrollView contentContainerStyle={{flex: 1, paddingBottom: 20, backgroundColor: '#FFF2CD'}} >
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>White Noise</Text>   
            </SafeAreaView>
        </ScrollView>
    ); 
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text1: {
        fontSize: 30,
        color: '#551B26',
        fontWeight: 'bold',
        marginBottom: '10%',
        marginTop: '15%',
    },
});

export default WhiteNoiseScreen;