import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, Alert} from 'react-native';
import React, {useState} from 'react';

 
const Timer = () => {
   
    return (
        <ScrollView contentContainerStyle={{paddingBottom: 20, backgroundColor: 'white'}} >
            <SafeAreaView style={styles.container}>
                <Text style ={styles.text1}>Timer</Text>   
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

export default Timer;

/*import React, { useState, useEffect } from 'react';
import { View, Image, StyleSheet, Text, Dimensions } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Picker } from '@react-native-picker/picker';
import { FIREBASE_DB, FIREBASE_AUTH } from '../../../FirebaseConfig'; // Adjust the path to your Firebase config
import { collection, addDoc, doc } from 'firebase/firestore';
import CustomButton from '../../../components/CustomButton/CustomButton';
import { SafeAreaView } from 'react-native-safe-area-context';

const focusImage = require('../../../assets/images/cute-cat-paw-all-white-free.png');
const breakImage = require('../../../assets/images/cute-cat-paw-grey-free.png'); // Replace with actual break image

const TimerScreen = () => {
  const [timerType, setTimerType] = useState('focus'); // 'focus' or 'break'
  const [duration, setDuration] = useState(10); // Default to 10 minutes for focus timer
  const [remainingTime, setRemainingTime] = useState(duration * 60); // Time in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [startTime, setStartTime] = useState<string | null>(null); // Store the start time
  const user = FIREBASE_AUTH.currentUser; // Get the current user

  const focusDurations = [...Array(12)].map((_, i) => (i + 1) * 10); // 10-120 min
  const breakDurations = [...Array(6)].map((_, i) => (i + 1) * 5); // 5-30 min

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRunning) {
      interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            clearInterval(interval);
            setIsRunning(false);
            logTimeToFirebase(duration * 60); // Pass the total duration when the timer ends
            return 0;
          }
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    const localStartTime = new Date(new Date().getTime() + 8 * 60 * 60 * 1000); // Adjust to UTC+8
    setStartTime(localStartTime.toISOString()); // Set the start time when the timer starts
  };

  const cancelTimer = () => {
    logTimeToFirebase(duration * 60 - remainingTime); // Pass the elapsed time when the timer is canceled
    setIsRunning(false);
    setRemainingTime(duration * 60); // Reset to initial duration
  };

  const switchToFocus = () => {
    if (!isRunning) {
      setTimerType('focus');
      setDuration(10);
      setRemainingTime(10 * 60);
    }
  };

  const switchToBreak = () => {
    if (!isRunning) {
      setTimerType('break');
      setDuration(5);
      setRemainingTime(5 * 60);
    }
  };

  const logTimeToFirebase = async (elapsedTime: number) => {
    if (!user) {
      console.error('No user is signed in.');
      return;
    }

    const userDocRef = doc(FIREBASE_DB, 'users', user.uid);
    const collectionName = timerType === 'focus' ? 'focusTimes' : 'breakTimes';
    const loggedDuration = elapsedTime / 60; // Log in minutes
    const logData = {
      startTime: startTime,
      duration: loggedDuration,
    };
    console.log(`Logging ${timerType} time: `, logData);
    try {
      const collectionRef = collection(userDocRef, collectionName);
      await addDoc(collectionRef, logData);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`; // Format as MM:SS
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.switchContainer}>
          {!isRunning && (
            <View style={styles.buttonContainer}>
              <Text
                style={[styles.switchText, timerType === 'focus' && styles.switchTextActive]}
                onPress={switchToFocus}
              >
                Focus Timer
              </Text>
            </View>
          )}
          {!isRunning && (
            <View style={styles.buttonContainer}>
              <Text
                style={[styles.switchText, timerType === 'break' && styles.switchTextActive]}
                onPress={switchToBreak}
              >
                Break Timer
              </Text>
            </View>
          )}
        </View>
        {isRunning && (
          <Text style={styles.runningTimerText}>
            {timerType === 'focus' ? 'Focus Timer' : 'Break Timer'}
          </Text>
        )}
        <Image source={timerType === 'focus' ? focusImage : breakImage} style={styles.pawContainerImage} resizeMode="contain" />
        <Text style={styles.time}>{formatTime(remainingTime)}</Text>
        {!isRunning && (
          <Picker
            selectedValue={duration}
            style={styles.picker}
            onValueChange={(itemValue) => {
              setDuration(itemValue);
              setRemainingTime(itemValue * 60);
            }}
          >
            {(timerType === 'focus' ? focusDurations : breakDurations).map((value) => (
              <Picker.Item key={value} label={`${value} min`} value={value} />
            ))}
          </Picker>
        )}
        {isRunning ? (
          <CustomButton text="Cancel" onPress={cancelTimer} type="PRIMARY" style={styles.button} />
        ) : (
          <CustomButton text={`Start ${timerType === 'focus' ? 'Focus' : 'Break'}`} onPress={startTimer} type="PRIMARY" style={styles.button} />
        )}
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F4E3',
    paddingVertical: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  switchText: {
    fontSize: 18,
    color: 'white',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
    paddingBottom: 5,
    marginTop: 7,
  },
  switchTextActive: {
    color: 'black',
    borderBottomColor: 'black',
    marginTop: 7,
  },
  runningTimerText: {
    fontSize: 26,
    fontWeight: 'bold',
    marginTop: -30,
    marginBottom: 20,
  },
  pawContainerImage: {
    width: 300,
    height: 300,
    marginBottom: 130,
    marginTop: -20,
  },
  time: {
    fontSize: 26,
    fontWeight: 'bold',
    color: 'white',
    marginTop: -270,
    marginBottom: 30,
  },
  picker: {
    height: 50,
    width: 150,
    marginBottom: 120,
  },
  button: {
    marginTop: 15,
    marginBottom: 10, // Adjust this value to move the button down
  },
  buttonContainer: {
    backgroundColor: '#ea9c8a',
    borderRadius: 10,
    marginHorizontal: 10,
    width: Dimensions.get("window").width * 0.3,
    resizeMode: "contain",
    alignItems: "center",
    height: 40,
    marginTop: 20,
   
  },
});

export default TimerScreen;*/
