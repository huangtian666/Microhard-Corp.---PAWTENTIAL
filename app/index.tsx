import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { SignInScreen,SignUpScreen } from './screens/Authentication';
import Navigation from './_layout'

export default function Index() {
    return (
        <SafeAreaView style={styles.root}>
            <SignInScreen/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor:'#FFF2CD',
        flex: 1,
    },
})