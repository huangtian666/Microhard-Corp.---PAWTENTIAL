import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { useTaskContext } from '../../Context/TaskProvider';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';


const Home: React.FC = () => {
  const { todayTotalTasks, todayCompletedTasks } = useTaskContext();
  const navigation = useNavigation();
  
  const progress = todayTotalTasks > 0 ? todayCompletedTasks / todayTotalTasks : 0;

  const viewTask = () => {
    navigation.navigate('To-Do List'); // Navigate to the 'To-Do List' tab using its name
  };

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.taskStatusContainer}>
          <View style={styles.textContainer}>
              {todayTotalTasks === 0 ? (
                <Text style={styles.title}>No Task for Today</Text>
              ) : progress <= 0.5 ? (
                <Text style={styles.title}>You are doing well!</Text>
              ) : progress < 1 ? (
                <Text style={styles.title}>Your today's task{'\n'}almost done!</Text>
              ) : (
                <Text style={styles.title}>Congratulations!{'\n'}You completed{'\n'}all tasks!</Text>
              )}
              <TouchableOpacity style={styles.button} onPress={viewTask}>
                <Text style={styles.buttonText}>View Task</Text>
              </TouchableOpacity>
            </View>
            <Progress.Circle style={styles.progressCircle}
              progress={progress}
              size={100}
              borderWidth={8}
              color='#2A7EDF'
              borderColor='white'
              thickness={8}
            >
              <Text  style={styles.progressText}>{Math.round(progress * 100)}%</Text>
            </Progress.Circle>
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginTop: 20, // Move the card closer to the top
  },
  card: {
    backgroundColor: '#6AB6FD', // Background color of the card
    borderRadius: 20, // Rounded corners
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.175,
    padding: 20,
    shadowColor: '#839AB6',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskStatusContainer: {
    flexDirection: 'row', // Align items side by side
    alignItems: 'center',
    justifyContent: 'space-between', // Space between elements
  },
  textContainer: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'flex-start', // Align text and button vertically
    paddingLeft: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'left',
    marginBottom: 10,
  },
  button: {
    marginTop: 5,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#A1D2FF',
    alignSelf: 'flex-start', // Align button to the start of the container
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold'
  },
  progressCircle: {
    marginRight: '5%',
  },
  progressText: {
    marginTop: 10,
    fontSize: 18,
    color: '#fff', // Set text color to white
    fontWeight: 'bold',
    textAlign: 'center', // Center the text
  }
});

export default Home;
