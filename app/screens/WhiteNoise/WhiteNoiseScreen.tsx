import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert, View, FlatList, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import whiteNoiseTracks from './WhiteNoiseTracks'; 
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

 
const WhiteNoiseScreen = () => {

    const route = useRoute();

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => router.push({
        pathname: '/screens/VideoPlayerScreen',
        params: { videoUrl: item.videoUrl, title: item.title, description: item.description }
      })}
    >
      <View style={styles.itemContainer}>
        <Image source={{ uri: item.thumbnailUrl }} style={styles.thumbnail} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.description}>{item.description}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

    
      return (
        <SafeAreaView style={styles.container}>
          <FlatList
            data={whiteNoiseTracks}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
        </SafeAreaView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#fff',
      },
      itemContainer: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
      },
      thumbnail: {
        width: '42%',
        height: 110,
        marginRight: 10,
        borderRadius: 10,
      },
      textContainer: {
        flex: 1,
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#5B4744',
      },
      description: {
        fontSize: 14,
        //color: '#666',
        color: '#846662',
      },
    });

export default WhiteNoiseScreen;