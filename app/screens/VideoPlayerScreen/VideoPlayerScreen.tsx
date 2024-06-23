import React, { useRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import { Video } from 'expo-av';
import { useLocalSearchParams } from 'expo-router';

const VideoPlayerScreen = () => {
  const { videoUrl, title} = useLocalSearchParams();
  const videoRef = useRef(null);

  const enterFullscreen = async () => {
    if (videoRef.current) {
      await videoRef.current.presentFullscreenPlayer();
    }
  };

  const exitFullscreen = async () => {
    if (videoRef.current) {
      await videoRef.current.dismissFullscreenPlayer();
    }
  };

  const toggleFullscreen = async () => {
    if (videoRef.current) {
      const status = await videoRef.current.getStatusAsync();
      if (status.isFullscreen) {
        exitFullscreen();
      } else {
        enterFullscreen();
      }
    }
  };

  if (!videoUrl || typeof videoUrl !== 'string') {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.videoTitle}>{title}</Text>
      <Video
        ref={videoRef}
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode="cover"
        shouldPlay
        useNativeControls
        style={styles.video}
      />
      <TouchableOpacity onPress={toggleFullscreen} style={styles.button}>
        <Text style={styles.buttonText}>Toggle Fullscreen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  videoTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
  videoDescription: {
    color: 'white',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#555',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default VideoPlayerScreen;
