import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { Ionicons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';

const VideoPlayerScreen = () => {
  const route = useRoute();
  const { videoUrl, title } = route.params;
  const videoRef = useRef<Video>(null);
  const [status, setStatus] = useState({});
  const [loading, setLoading] = useState(false);
  const [isLooping, setIsLooping] = useState(false);

  const handleBackPress = () => {
    router.back();
  };

  const handlePlaybackStatusUpdate = (status) => {
    setStatus(status);
    if (status.isLoaded) {
      setLoading(false);
    }
  };

  const handlePlayPausePress = async () => {
    if (status.isPlaying) {
      await videoRef.current.pauseAsync();
    } else {
      setLoading(true);
      await videoRef.current.playAsync();
    }
  };

  const handleLoopToggle = async () => {
    if (videoRef.current) {
      await videoRef.current.setIsLoopingAsync(!isLooping);
      setIsLooping(!isLooping);
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
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>
      <Text style={styles.videoTitle}>{title}</Text>
      {loading && (
        <ActivityIndicator size="large" color="#fff" style={styles.loadingIndicator} />
      )}
      <Video
        ref={videoRef}
        style={styles.video}
        source={{ uri: videoUrl }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay={false} // Do not auto-play
        useNativeControls
        onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
      />
      <View style={styles.buttons}>
        <TouchableOpacity
          onPress={handlePlayPausePress}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{status.isLoaded && status.isPlaying ? 'Pause' : 'Play'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLoopToggle}
          style={styles.button}
        >
          <Text style={styles.buttonText}>{isLooping ? 'Stop Loop' : 'Loop'}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
  loadingIndicator: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginLeft: -25,
    marginTop: -25,
    zIndex: 1,
  },
  videoTitle: {
    color: 'white',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
    fontWeight: 'bold',
  },
  buttons: {
    marginTop:10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  button: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ea9c8a',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 30,
    zIndex: 1,
  },
});

export default VideoPlayerScreen;
