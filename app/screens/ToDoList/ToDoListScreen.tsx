import {SafeAreaView, Text, Image, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';

 
const ToDoList = () => {

    const currentYear = new Date().getFullYear();
    const minDate = `${currentYear}-01-01`;
    const maxDate = `${currentYear + 1}-12-31`;

    const [showFullCalendar, setShowFullCalendar] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
    /* useEffect(() => {
        // Fetch tasks for the selected date from your data source (e.g., API, local storage)
        fetchTasksForDate(selectedDate);
      }, [selectedDate]);

    const fetchTasksForDate = (date) => {
        // Replace with your actual task fetching logic
        const mockTasks = {
          '2024-06-20': [
            { time: '08:00 AM', task: 'Task 1' },
            { time: '10:00 AM', task: 'Task 2' },
          ],
          '2024-06-21': [
            { time: '09:00 AM', task: 'Task 3' },
            { time: '11:00 AM', task: 'Task 4' },
          ],
        };
    
        setTasks(mockTasks[date] || []);
      };
     */

    const [tasks, setTasks] = useState([])

    const getWeekDates = (currentDate) => {
        const startOfWeek = moment(currentDate).startOf('isoWeek');
        const dates = [];
    
        for (let i = 0; i <= 6; i++) {
          dates.push(moment(startOfWeek).add(i, 'days').format('YYYY-MM-DD'));
        }
    
        return dates;
      };
    
      const weekDates = getWeekDates(selectedDate);
    
      return (
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.headerContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setShowFullCalendar(!showFullCalendar)}
            >
          <Text style={styles.buttonText}>View Full Calendar</Text>
        </TouchableOpacity>
      </View>
          {showFullCalendar ? (
            <CalendarList
              current={selectedDate}
              minDate={minDate}
              maxDate={maxDate}
              onDayPress={(day) => setSelectedDate(day.dateString)}
              monthFormat={'MMMM yyyy'}
              hideArrows={false}
              hideExtraDays={true}
              disableMonthChange={true}
              horizontal={true}
              pagingEnabled={true}
            />
          ) : (
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weekContainer}>
              {weekDates.map((date) => (
                <TouchableOpacity
                  key={date}
                  style={[styles.dateContainer, date === selectedDate && styles.selectedDateContainer]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[styles.dateText, date === selectedDate && styles.selectedDateText]}>
                    {moment(date).format('ddd')}
                  </Text>
                  <Text style={[styles.dateText, date === selectedDate && styles.selectedDateText]}>
                    {moment(date).format('DD')}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          )}
        </ScrollView>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        paddingBottom: 20,
        backgroundColor: 'white',
        minHeight: Dimensions.get('window').height,
      },
      weekContainer: {
        height: Dimensions.get('window').height * 0.08,
        width:Dimensions.get('window').width ,
        justifyContent: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        marginTop: '2%'
      },
      button: {
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
      },
      buttonText: {
        color: '#ea9c8a',
        fontSize: 13,
      },
      toDoListContainer: {
        padding: 20,
      },
      toDoListTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
      },
      dateContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 25, // Make the container circular
        backgroundColor: '#f0f0f0',
        width: 50,
        height: 50,
      },
      selectedDateContainer: {
        backgroundColor: '#ea9c8a', // Pink background for selected date
      },
      dateText: {
        fontSize: 12,
        color: '#2d4150',
      },
      selectedDateText: {
        color: '#ffffff',
      },
      headerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        paddingHorizontal: 10,
        marginTop: 10,
      },
    });
    
    export default ToDoList;