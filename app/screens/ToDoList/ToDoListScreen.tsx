import { Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, View, TextInput,  KeyboardAvoidingView, Platform, Keyboard, Alert} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import Task from '@/components/Task';

const ToDoList = () => {
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear + 1}-12-31`;

  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const flatListRef = useRef(null);
  const currentDate = moment().format('YYYY-MM-DD');
  
  const [task, setTask] = useState();
  const [taskItems, setTaskItems] = useState([])

  const handleAddTask = () => {
    if (task.trim() === '') {
      Alert.alert('Missing Task');
      return;
    }

    console.log('add task');
    Keyboard.dismiss()
    setTaskItems([...taskItems, task]);
    setTask(null);
  }

  const completeTask = (index) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  }

  const generateAllDates = (year) => {
    const dates = [];
    let currentDate = moment(`${year}-01-01`);
    const endDate = moment(`${year + 1}-12-31`);

    while (currentDate.isBefore(endDate)) {
      dates.push(currentDate.format('YYYY-MM-DD'));
      currentDate = currentDate.add(1, 'day');
    }
    return dates;
  };

  const allDates = generateAllDates(currentYear);

  useEffect(() => {
    if (flatListRef.current && allDates.length > 0) {
      const currentDateIndex = allDates.indexOf(selectedDate);
      if (currentDateIndex !== -1) {
        setTimeout(() => {
          flatListRef.current.scrollToIndex({ animated: true, index: currentDateIndex });
        }, 100); // Delay to ensure the FlatList is populated
      }
    }
  }, [allDates]);

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#ea9c8a',
    },
  }

  const getTaskTitle = (date) => {
    if (date === currentDate) {
      return "Today's Tasks";
    } else {
      return `Tasks for ${date}`;
    }
  };

  const renderWeekDates = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.dateContainer,
        item === selectedDate && styles.selectedDateContainer,
      ]}
      onPress={() => setSelectedDate(item)}
    >
      <Text style={[
        styles.dateText,
        item === currentDate && item !== selectedDate && styles.currentDateText,
        item === selectedDate && styles.selectedDateText
      ]}>
        {moment(item).format('ddd')}
      </Text>
      <Text style={[
        styles.dateText,
        item === currentDate && item !== selectedDate && styles.currentDateText,
        item === selectedDate && styles.selectedDateText
      ]}>
        {moment(item).format('DD')}
      </Text>
    </TouchableOpacity>
  );


  const handleBackToToday = () => {
    setSelectedDate(currentDate);
    if (flatListRef.current && allDates.length > 0) {
      const currentDateIndex = allDates.indexOf(currentDate);
      if (currentDateIndex !== -1) {
        flatListRef.current.scrollToIndex({ animated: true, index: currentDateIndex });
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={handleBackToToday}
        >
          <Text style={styles.buttonText}>Back to Today</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowFullCalendar(!showFullCalendar)}
        >
          <Text style={styles.buttonText}>
            {showFullCalendar ? '- Minimize Calendar' : '- View Full Calendar'}
          </Text>
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
          markedDates={markedDates}
        />
      ) : (
        <View style={styles.weekContainer}>
          <FlatList
            ref={flatListRef}
            data={allDates}
            horizontal
            renderItem={renderWeekDates}
            keyExtractor={(item) => item}
            showsHorizontalScrollIndicator={false}
            getItemLayout={(data, index) => (
              { length: 60, offset: 60 * index, index }
            )}
          />
        </View>
      )}
      <View style={styles.toDoListContainer}>
        <Ionicons name="library-outline" size={30} color="#a5807b" style={styles.icon} />
        <Text style={styles.toDoListTitle}>{getTaskTitle(selectedDate)}</Text>
      </View>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  
          style={styles.writeTaskWrapper}
          >
           <TextInput style = {styles.textInput} placeholder='write a task' value={task} onChangeText={text => setTask(text)}/>
           <TouchableOpacity onPress = {handleAddTask}>
            <View style={styles.addWrapper}>
              <Text style={styles.addText}> + </Text>

            </View>
          </TouchableOpacity> 
      </KeyboardAvoidingView>
      <View>
        {
          taskItems.map((item, index) => {
            return (
            <TouchableOpacity key={index} onPress={() => completeTask(index)}>
              <Task text={item}/>
            </TouchableOpacity>
            )
          })
        }
        <Task text={'task 1'}/>
        <Task text={'task 2'}/>
      </View>
    </ScrollView>
  );
  }

const styles = StyleSheet.create({
  container: {
    paddingBottom: 20,
    backgroundColor: 'white',
    minHeight: Dimensions.get('window').height,
  },
  weekContainer: {
    height: Dimensions.get('window').height * 0.08,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    flexDirection: 'row',
    paddingHorizontal: 8,
    marginTop: '2%',
  },
  button: {
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: '2%',
  },
  buttonText: {
    color: '#ea9c8a',
    fontSize: 13,
    marginLeft: '5%',
  },
  toDoListContainer: {
    paddingHorizontal: 25,
    flexDirection: 'row',
    marginTop:'5%'
  },
  toDoListTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#a5807b',
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
    backgroundColor: '#ea9c8a',
  },
  dateText: {
    fontSize: 12,
    color: '#2d4150',
  },
  selectedDateText: {
    color: '#ffffff',
  },
  currentDateText: {
    color: 'red', // Blue text for current date
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    marginTop: 10,
  },
  navButton: {
    fontSize: 24,
    color: '#ea9c8a',
    alignSelf: 'center',
    marginHorizontal: 10,
  },
  icon: {
    marginRight: 10,
  },
  writeTaskWrapper: {
    marginVertical: '3%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  textInput: {
    padding: 15,
    width: 270,
    backgroundColor: 'white',
    borderRadius: 60,
    borderWidth: 1,
    borderColor: '#C0C0C0'
  },
  addWrapper: {
    width: 60,
    height: 60,
    backgroundColor: '#FFF6D4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  addText: {
    color: '#544644',
    fontSize: 20,
  }

});

export default ToDoList;
