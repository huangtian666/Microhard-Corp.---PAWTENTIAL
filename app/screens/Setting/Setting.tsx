import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';

 
const Setting = () => {

   
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 20, backgroundColor: 'white'}} >
            <SafeAreaView style={styles.container}>
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

export default Setting;