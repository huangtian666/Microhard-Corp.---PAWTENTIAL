import React from 'react';
import{View, TextInput, StyleSheet} from 'react-native';

const CustomInput = ({value, setValue, placeholder, secureTextEntry, placeholderTextColor}) => {
    return (
        <View style = {styles.container}>
            <TextInput 
                value={value}
                onChangeText={setValue}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                placeholderTextColor={placeholderTextColor}
                style={styles.input}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        width: "85%",
        padding: 15,
        borderColor: '#e8e8e8',
        borderWidth: 1,
        borderRadius: 5, //how round the border is 

        paddingHorizontal: 10,
        marginVertical: 5,
    },
    input:{
        width: '100%',
    },
});

export default CustomInput;