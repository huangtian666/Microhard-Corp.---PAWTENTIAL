import { Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, View, Modal, TextInput, Button} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

const Task =(props) => {

    return (
        <View style={styles.container}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={styles.text}>{props.text}</Text>
             </View>
             <View style={styles.circular}></View>
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
    circular: {
        width:15,
        height:15,
        borderColor: 'white',
        borderWidth: 3,
        borderRadius: 10,
    },
    text: {
        maxWidth: '80%',
        marginLeft: 20,
        fontSize: 15,
        color: '#544644',
    }
})

export default Task;