import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Dimensions, SafeAreaView} from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { useTaskContext } from '../../Context/TaskProvider';
import * as Progress from 'react-native-progress';

const Home: React.FC = () => {
  const { todayTotalTasks, todayCompletedTasks } = useTaskContext();
  
  const progress = todayTotalTasks > 0 ? todayCompletedTasks / todayTotalTasks : 0;

  const viewTask = () => {
    // Navigation or any function to view tasks
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.taskStatusContainer}>
            <Text style={styles.title}>Your today's task almost done!</Text>
            <Progress.Circle
              progress={progress}
              size={100}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"
              thickness={8}
            >
              <Text style={{ fontSize: 18 }}>{Math.round(progress * 100)}%</Text>
            </Progress.Circle>
          </View>
          <TouchableOpacity style={styles.button} onPress={viewTask}>
            <Text style={styles.buttonText}>View Task</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#5C50E6', // Background color of the card
    borderRadius: 20, // Rounded corners
    width: Dimensions.get('window').width*0.9,
    height: Dimensions.get('window').height*0.2,
    padding:20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  taskStatusContainer: {
    flexDirection: 'row', // Align items side by side
    alignItems: 'center',
    justifyContent: 'space-between', // Space between elements
  },
  title: {
    fontSize: 18,
    color: '#fff',
    flex: 1, // Allow text to take up available space
  },
  button: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#7F67F6',
    alignSelf: 'flex-start', // Align button to the start of the container
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Home;