import React from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

const CustomButton = ({onPress, text, type = 'PRIMARY', bgColor, fgColor, disabled}) => { //defining properties of the button
    return (
        <Pressable 
            onPress={onPress} 
            disabled = {disabled}
            style = {[
                styles.container, 
                styles[`container_${type}`],
                bgColor ? {backgroundColor: bgColor} : {},
                disabled && styles.container_DISABLED,
            ]}>
            <Text style={[
                styles.text, 
                styles[`text_${type}`],
                fgColor ? {color: fgColor} : {} ,//if fgColor exists, 
                //set the color to fgColor, if not empty
                disabled && styles.text_DISABLED // Apply disabled text styles
                ]}>
            {text}
            </Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        width: '85%',
        alignItems: 'center',
        borderRadius: 5, //how round the border is 
    }, 
    container_PRIMARY: {
        backgroundColor: '#ea9c8a',
        marginVertical: 10,
    },
    container_PRIMARY_SHORT: {
        backgroundColor: '#ea9c8a',
        marginVertical: 10,
        width: '40%',
    },
    container_SECONDARY: {
        borderWidth: 2,
        borderColor:'#ea9c8a',
    },
    container_TERTIARY: {
    },
    container_DISABLED: {
        borderColor: '#cccccc',
      },

    text: {
        fontWeight: 'bold',
        color: 'white',
        fontSize: 15,
    },
    text_SECONDARY: {
        color: '#ea9c8a',
    },
    text_TERTIARY: {
        color: 'gray',
        fontSize: 13,
    },
    text_DISABLED: {
        color: 'gray',
    },
    text_PRIMARY_SHORT: {
        color: '#ea9c8a',
    },
})

export default CustomButton