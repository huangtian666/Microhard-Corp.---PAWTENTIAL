import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import React, {useState, useEffect} from 'react';
import { useTaskContext } from '../../Context/TaskProvider';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { getMotivationalQuote } from '@/FirestoreService';
import { BarChart, ProgressChart, LineChart } from 'react-native-chart-kit';
import Svg, { Line } from 'react-native-svg';

const Home: React.FC = () => {
  const { todayTotalTasks, todayCompletedTasks } = useTaskContext();
  const navigation = useNavigation();
  const [quote, setQuote] = useState({ text: '', author: '' });

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await getMotivationalQuote();
      setQuote(fetchedQuote || { text: "Stay motivated!", author: "" });
    };
    fetchQuote();
  }, []);

  
  const progress = todayTotalTasks > 0 ? todayCompletedTasks / todayTotalTasks : 0;

  const viewTask = () => {
    navigation.navigate('To-Do List'); // Navigate to the 'To-Do List' tab using its name
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const barChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      strokeDasharray: '4 5', // Dotted reference lines
      strokeWidth: 1,
      stroke: '#ccc',
    },
    propsForLabels: {
      fill: 'black',
    },
    barPercentage: 1, // Adjust this value to make bars wider
    fillShadowGradientFrom: '#ffbbd4',
    fillShadowGradientTo: '#8abce6',
    fillShadowGradientFromOpacity: 1,
    fillShadowGradientToOpacity: 1,
    fillShadowGradientOpacity: 1,
  };

  const lineChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      strokeDasharray: '4 5', // Dotted reference lines
      strokeWidth: 1,
      stroke: '#ccc',
    },
    propsForLabels: {
      fill: 'black',
    },
    fillShadowGradientFrom: '#F7B3FF',
    fillShadowGradientTo: '#7F6EE4',
    fillShadowGradientFromOpacity: 0.7,
    fillShadowGradientToOpacity: 0.6,
    propsForDots: {
      r: '4.5',
      fill: '#ccc', // Set the fill color of dots to pink
    }
  }


  // Mock data
  const dailyHours = [10, 15, 20, 25, 30, 35, 40];
  const monthlyHours = [
    { name: 'Jan', hours: 200 },
    { name: 'Feb', hours: 300 },
    { name: 'Mar', hours: 250 },
    { name: 'Apr', hours: 350 },
    { name: 'May', hours: 400 },
    { name: 'Jun', hours: 280 },
    { name: 'Jul', hours: 320 },
    { name: 'Aug', hours: 290 },
    { name: 'Sep', hours: 260 },
    { name: 'Oct', hours: 330 },
    { name: 'Nov', hours: 270 },
    { name: 'Dec', hours: 310 },
  ];
  
  // Calculate the overall focused hours
  const overallHours = dailyHours.reduce((total, hours) => total + hours, 0);

  const colors = dailyHours.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);


  return (
    <ScrollView contentContainerStyle={{ backgroundColor: 'white', flexGrow: 1 }}>
      <SafeAreaView style={styles.container}>
        <View style={styles.card}>
          <View style={styles.taskStatusContainer}>
          <View style={styles.textContainer}>
              {todayTotalTasks === 0 ? (
                <Text style={styles.title}>No Task for Today</Text>
              ) : progress <= 0.15 ? (
                <Text style={styles.title}>Time to start!</Text>
              ) : progress <= 0.5 ? (
                <Text style={styles.title}>You are doing well!</Text>
              ) : progress < 1 ? (
                <Text style={styles.title}>Today's tasks{'\n'}are almost done!</Text>
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
              <Text style={styles.progressText}>{Math.round(progress * 100)}%</Text>
            </Progress.Circle>
          </View>
        </View>

{/* Daily Focused Hours */}
        <Text style={styles.chartTitle}>Daily Focused Hours</Text>
        <View style={styles.chartContainer1}>
          <BarChart 
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{ data: dailyHours }],
              colors: colors,
            }}
            //yAxisLabel={'hours'}
            width={Dimensions.get('window').width *0.87}
            height={220}
            chartConfig={barChartConfig}
            style={styles.transparentBackground1}
            fromZero
            verticalLabelRotation={30}
            showBarTops={false} // Remove the black line at the top of each bar
            withInnerLines={true} // Show inner grid lines
          />
        </View>

        {/* Monthly Accumulated Hours */}
        <Text style={styles.chartTitle}>Monthly Accumulated Hours</Text>  
        <View style={styles.chartContainer2}>
        <LineChart
            data={{
              labels: monthlyHours.map(month => month.name),
              datasets: [{ data: monthlyHours.map(month => month.hours) }],
            }}
            
            width={Dimensions.get('window').width * 0.95} // Adjust to fit within the container
            height={Dimensions.get('window').width * 0.65}
            chartConfig={lineChartConfig}
            style={styles.transparentBackground2}
            fromZero
            verticalLabelRotation={30}
            bezier
          />
        </View>

        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{quote.text}</Text>
          {quote.author && <Text style={{
            alignSelf: 'flex-end',
            color: '#a5807b',
            fontStyle: 'italic',
            fontSize: 16,
            }}>- {quote.author}</Text>}
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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
    marginBottom: 10,
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
  },
  quote: {
    fontSize: 16,
    color: '#a5807b',
    fontStyle: 'italic',
    textAlign: 'left',
    marginBottom: 5,
  },
  quoteContainer: {
    paddingHorizontal: 18,
    marginVertical: 20,
  },
  chartContainer1: {
    justifyContent: 'flex-start',
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 3,
    paddingVertical: 20,
    width: Dimensions.get('window').width * 0.9,
    shadowColor: '#839AB6',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  chartContainer2: {
    justifyContent: 'flex-start',
    borderRadius: 16,
    backgroundColor: '#fff',
    elevation: 3,
    padding: 20,
    width: Dimensions.get('window').width * 0.9,
    shadowColor: '#839AB6',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 25,
    marginBottom: 15,
    paddingHorizontal: 20,
    color: '#a5807b',
    alignSelf: 'flex-start'
  },
  transparentBackground1: {
    backgroundColor: 'transparent',
  },
  transparentBackground2: {
    backgroundColor: 'transparent',
    marginLeft: -40,
  },
  dailyStatsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    marginBottom: 10,
  },
  dailyStatsTitle: {
    color: '#a5807b',
    fontSize: 17,
    marginBottom: 10,
  }, 
  dailyStatsText: {
    color: '#a5807b',
    fontSize: 15,
    paddingHorizontal: 40,
    marginBottom: 10,
  },
  axis: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default Home;
