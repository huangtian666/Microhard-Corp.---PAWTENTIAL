import { StyleSheet, TouchableOpacity, Text, View, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useTaskContext } from '../../Context/TaskProvider';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';
import { getMotivationalQuote } from '@/FirestoreService';
import { BarChart, LineChart } from 'react-native-chart-kit';
import { fetchFocusSessionsForWeek, calculateWeeklyFocusHours, fetchFocusSessionsForYear, calculateMonthlyFocusHoursForCurrentYear } from '@/FirestoreService';
import { FIREBASE_AUTH } from '@/FirebaseConfig';
import moment from 'moment';

const Home: React.FC = () => {
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const monthsOfYear = ['January', 'Febuary', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'];
  const auth = FIREBASE_AUTH;
  const user = auth.currentUser;
  const { todayTotalTasks, todayCompletedTasks } = useTaskContext();
  const navigation = useNavigation();
  const [quote, setQuote] = useState({ text: '', author: '' });
  const [weeklyHours, setWeeklyHours] = useState(Array(7).fill(0));
  const [monthlyHours, setMonthlyHours] = useState(Array(12).fill(0)); // State to hold monthly hours
  const averageMonthlyHours = monthlyHours.reduce((monthlyHour, total) => total + monthlyHour, 0) / 12;
  console.log(averageMonthlyHours)
  const currentMonthIndex = new Date().getMonth();

  const [selectedMonthData, setSelectedMonthData] = useState({
    index: currentMonthIndex,
    hours: monthlyHours[currentMonthIndex],
  });

  const handleDataPointClick = (data) => {
    setSelectedMonthData({ index: data.index, hours: data.value });
  };

  useEffect(() => {
    const fetchQuote = async () => {
      const fetchedQuote = await getMotivationalQuote();
      setQuote(fetchedQuote || 
        { text: "'It is during our darkest moments that we must focus to see the light.'", 
        author: "Aristotle" });
    };
    fetchQuote();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (user) {
        try {
          const userId = user.uid;
          const sessions = await fetchFocusSessionsForWeek(userId);
          console.log('Fetched sessions:', sessions);
          const weeklyFocusHours = calculateWeeklyFocusHours(sessions);
          console.log('Weekly Focus Hours:', weeklyFocusHours);
          setWeeklyHours(weeklyFocusHours);

           // Fetch and calculate monthly focus hours
           const yearSessions = await fetchFocusSessionsForYear(userId);
           console.log('Fetched year sessions:', yearSessions);
           const monthlyFocusHours = calculateMonthlyFocusHoursForCurrentYear(yearSessions);
           console.log('Monthly Focus Hours:', monthlyFocusHours);
           setMonthlyHours(monthlyFocusHours);
           setSelectedMonthData({ index: currentMonthIndex, hours: monthlyFocusHours[currentMonthIndex] });

        } catch (error) {
          console.error('Error fetching focus sessions:', error);
        }
      }
    };

    fetchData();
  }, [user]);

  // Debug: Log current day and index
  const todayIndex = moment().isoWeekday() - 1; // Get the index for today (0-6, Mon-Sun)
  console.log('Today:', moment().format('dddd, YYYY-MM-DD'), 'Index:', todayIndex);
  console.log('Weekly Hours:', weeklyHours);

  const todayHours = weeklyHours[todayIndex]; // Focused hours for today
  const monthHours = monthlyHours[currentMonthIndex];
  console.log('Today Hours:', todayHours); // Log today hours
  const averageWeeklyHours = weeklyHours.reduce((total, month) => total + month, 0) / monthlyHours.length; // Corrected average calculation // Calculate weekly average

  const progress = todayTotalTasks > 0 ? todayCompletedTasks / todayTotalTasks : 0;

  const viewTask = () => {
    navigation.navigate('To-Do List'); // Navigate to the 'To-Do List' tab using its name
  };

  const barChartConfig = {
    backgroundGradientFromOpacity: 0,
    backgroundGradientToOpacity: 0,
    decimalPlaces: 2,
    propsForLabels: {
      fill: 'black',
    },
    barPercentage: 0.9, // Adjust this value to make bars wider
    fillShadowGradientFrom: '#ffbbd4',
    fillShadowGradientTo: '#8abce6',
    fillShadowGradientFromOpacity: 0.8,
    fillShadowGradientToOpacity: 0.8,
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    propsForBackgroundLines: {
      strokeDasharray: '4 5', // Dotted reference lines
      strokeWidth: 1,
      stroke: '#ccc',
    },
    barRadius: 10,
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
    fillShadowGradientFromOpacity: 0.6,
    fillShadowGradientToOpacity: 0.5,
    propsForDots: {
      r: '4.5',
      fill: '#ccc', // Set the fill color of dots to pink
    },
  }

  const colors = weeklyHours.map(() => `#${Math.floor(Math.random() * 16777215).toString(16)}`);

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
        <View style={styles.quoteContainer}>
          <Text style={styles.quote}>{quote.text}</Text>
          {quote.author && <Text style={{
            alignSelf: 'flex-end',
            color: '#a5807b',
            fontStyle: 'italic',
            fontSize: 16,
          }}>- {quote.author}</Text>}
        </View>

        {/* Daily Focused Hours */}
        <Text style={styles.chartTitle}>Daily Focused Hours</Text>
        <View style={styles.customLabelContainer}>
          <View style={styles.weekContainer}>
            <Text style={styles.weekLableHeader}>{`${daysOfWeek[todayIndex]}`}</Text>
            <Text style={styles.weekLabel}>{`Hours: ${todayHours.toFixed(2)}`}</Text>
          </View>
          <View style={styles.weekAverageContainer}>
            <Text style={styles.weekLableHeader}>{`Weekly Average: `}</Text>
            <Text style={styles.weekLabel}>{`${averageWeeklyHours.toFixed(2)} hours`}</Text>
          </View>
        </View>

        <View style={styles.chartContainer1}>
          <BarChart 
            data={{
              labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
              datasets: [{ data: weeklyHours }],
              colors: colors,
            }}
            width={Dimensions.get('window').width * 0.9}
            height={220}
            chartConfig={barChartConfig}
            style={styles.transparentBackground1}
            fromZero
            verticalLabelRotation={0}
            showBarTops={false} // Remove the black line at the top of each bar
            withInnerLines={true} // Show inner grid lines
            withVerticalLines={true}
            segments={2}
            showValuesOnTopOfBars={true}
            onDataPointClick={(data) => {
              console.log('Data point clicked:', data);
            }}
          />
        </View>

        {/* Monthly Accumulated Hours */} 
        <Text style={styles.chartTitle}>Monthly Accumulated Hours</Text>  
            <View style={styles.customLabelContainer}>
            <View style={styles.monthContainer}>
                <Text style={styles.customLableHeader}>{`${monthsOfYear[selectedMonthData.index]} :`}</Text>
                <Text style={styles.customLabel}>{`Hours: ${selectedMonthData.hours}`}</Text>
              </View>
              <View style={styles.monthAverageContainer}>
                <Text style={styles.customLableHeader}>{`Monthly Average: `}</Text>
                <Text style={styles.customLabel}>{`${averageMonthlyHours.toFixed(2)} hours`}</Text>
              </View>
            </View>
        <View style={styles.chartContainer2}>
        <LineChart
            data={{
              labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              datasets: [{ data: monthlyHours }],
            }}
            
            width={Dimensions.get('window').width * 0.95} // Adjust to fit within the container
            height={Dimensions.get('window').width * 0.6}
            chartConfig={lineChartConfig}
            style={styles.transparentBackground2}
            fromZero
            verticalLabelRotation={30}
            bezier
            onDataPointClick={(data) => handleDataPointClick(data)}
          />
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
    opacity: 0.9,
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
    marginTop: 20,
    marginBottom: 10,
  },
  chartContainer1: {
    marginVertical: 20,
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
    marginTop: 20,
    marginBottom: 40,

  },
  chartTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 15,
    paddingHorizontal: 25,
    color: '#a5807b',
    alignSelf: 'flex-start'
  },
  transparentBackground1: {
    backgroundColor: 'transparent',
    marginLeft: -20,
  },
  transparentBackground2: {
    backgroundColor: 'transparent',
    marginLeft: -40,
    marginTop:15,
  },
  customLabelContainer: {
    marginTop: 5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  customLableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4D4D8F',
    marginBottom: 3,
  },
  customLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'left',
    color: '#4D4D8F', 
    
  },
  monthAverageContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.4,
    marginLeft: Dimensions.get('window').width * 0.1,
    backgroundColor: '#E6E6FA',
    shadowColor: '#9595C8',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    opacity: 0.8,
  },
  monthContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.4,
    backgroundColor: '#E6E6FA',
    shadowColor: '#9595C8',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    opacity: 0.8,
  },
  weekAverageContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.4,
    marginLeft: Dimensions.get('window').width * 0.1,
    backgroundColor: '#FDE1FC',
    shadowColor: '#D6ADD6',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    opacity: 0.8,
  },
  weekContainer: {
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    width: Dimensions.get('window').width * 0.4,
    backgroundColor: '#FDE1FC',
    shadowColor: '#D6ADD6',
    shadowOffset: {
      width: 4,
      height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    opacity: 0.8,
  },
  weekLableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#CB6ACA',
    marginBottom: 3,
  },
  weekLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign:'left',
    color: '#CB6ACA', 
    
  },
});

export default Home;