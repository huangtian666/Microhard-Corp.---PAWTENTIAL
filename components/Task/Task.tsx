import { Text, StyleSheet, Dimensions, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Task =(props) => {

    return (
        <View style={styles.container}>
            <View style={styles.itemLeft}>
                <TouchableOpacity 
                    onPress={() => props.toggleTaskCompletion(props.index)}
                    style={ [styles.square,
                        props.completed && styles.completedSquare]
                    }
                >
                    {props.completed && <Ionicons name="checkmark-done-sharp" size={22} color='#ea9c8a' />}
                </TouchableOpacity>
                <Text style={[styles.text, props.completed && styles.completedText]}>{props.text}</Text>
                </View>

            <TouchableOpacity onPress={() => props.deleteTask(props.index)}>
             <View>
                <Ionicons name="close-circle" size={25} color='#ea9c8a' />
             </View>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#FFF6D4',
        padding: 15,
        borderRadius: 10,
        width: Dimensions.get('window').width*0.9,
        alignSelf: 'center',
        flexDirection: 'row',
        marginBottom: 15,
        justifyContent:'space-between'
    },
    itemLeft: {
        flexDirection: 'row',
        alignItems: 'center', 
        flexWrap: 'wrap',
    }, 
    square: {
        width:24,
        height: 24,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    text: {
        maxWidth: '80%',
        marginLeft: 20,
        fontSize: 15,
        color: '#544644',
    },
    completedText: {
        textDecorationLine: 'line-through',
        color: '#A0A0A0',  
    },
    completedSquare: {

    }
})

export default Task;