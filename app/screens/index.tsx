import React from 'react';
import { SafeAreaView, StyleSheet,Dimensions } from 'react-native';
import { SignInScreen, SignUpScreen, ConfirmEmailScreen } from './Authentication';

export default function Index() {
    return (
        <SafeAreaView style={styles.root}>
            <SignInScreen/>
            <SignUpScreen/>
            <ConfirmEmailScreen/>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    root: {
        backgroundColor:'#FFF2CD',
        flex: 1,
        width: Dimensions.get('window').width,
        height:Dimensions.get('window').height,

    },
})

