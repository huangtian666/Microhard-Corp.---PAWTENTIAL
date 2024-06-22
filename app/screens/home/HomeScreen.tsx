import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import React from 'react';
import { useTaskContext } from '../../Context/TaskProvider';
import * as Progress from 'react-native-progress';

const Home: React.FC = () => {
  const { todayTotalTasks, todayCompletedTasks } = useTaskContext();
  
  const progress = todayTotalTasks > 0 ? todayCompletedTasks / todayTotalTasks : 0;

  const viewTask = () => {
    router.push('/screens/ToDoList')
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.taskStatusContainer}>
            <View style={styles.textContainer}>
              <Text style={styles.title}>Your today's task{'\n'}almost done!</Text>
              <TouchableOpacity style={styles.button} onPress={viewTask}>
                <Text style={styles.buttonText}>View Task</Text>
              </TouchableOpacity>
            </View>
            <Progress.Circle style={styles.progressCircle}
              progress={progress}
              size={100}
              borderWidth={8}
              color="white"
              shadowColor="#999"
              bgColor="#fff"
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
    backgroundColor: '#5C50E6', // Background color of the card
    borderRadius: 20, // Rounded corners
    width: Dimensions.get('window').width * 0.9,
    height: Dimensions.get('window').height * 0.175,
    padding: 20,
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
    backgroundColor: '#7F67F6',
    alignSelf: 'flex-start', // Align button to the start of the container
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
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
