import { Text, StyleSheet, ScrollView, Dimensions, TouchableOpacity, FlatList, View, TextInput,  KeyboardAvoidingView, Platform, Keyboard, Alert, ActivityIndicator, Animated, UIManager, LayoutAnimation} from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import Task from '@/components/Task';

/*interface TaskItem {
  text: string;
  completed: boolean;
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToDoList: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear + 1}-12-31`;

  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const flatListRef = useRef<FlatList<string>>(null);
  const currentDate = moment().format('YYYY-MM-DD');
  
  const [task, setTask] = useState<string | null>('');
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleAddTask = () => {
    if (!task || task.trim() === '') {
      Alert.alert('Missing Task');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setTaskItems((prevTaskItems) => [...prevTaskItems, { text: task!, completed: false }]);
      setTask('');
      setLoading(false);
    }, 500);
  };

  const deleteTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const toggleTaskCompletion = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Apply layout animation
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy.sort((a, b) => a.completed - b.completed));

    // Start animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(0); // Reset animation
    });
  };

  const generateAllDates = (year: number): string[] => {
    const dates: string[] = [];
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
          flatListRef.current?.scrollToIndex({ animated: true, index: currentDateIndex });
        }, 100);
      }
    }
  }, [allDates]);

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#ea9c8a',
    },
  };

  const getTaskTitle = (date: string) => {
    if (date === currentDate) {
      return "Today's Tasks";
    } else {
      return `Tasks for ${date}`;
    }
  };

  const renderWeekDates = ({ item }: { item: string }) => (
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

  const sortedTasks = taskItems.sort((a, b) => a.completed - b.completed);

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
        <TextInput style={styles.textInput} placeholder='Write a task' value={task || ''} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={handleAddTask} disabled={loading}>
          <View style={styles.addWrapper}>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
              ) : (
              <Text style={styles.addText}>+</Text>
            )}
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      <FlatList>
        {sortedTasks.map((item, index) => (
          <Task 
            key={index} 
            text={item.text} 
            index={index} 
            completed={item.completed}
            deleteTask={deleteTask} 
            toggleTaskCompletion={toggleTaskCompletion}
          />
        ))}
      </FlatList>
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
    marginTop: '5%'
  },
  toDoListTitle: {
    fontSize: 22,
    fontWeight: 'bold',
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
    color: 'red',
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

export default ToDoList; */
interface TaskItem {
  text: string;
  completed: boolean;
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToDoList: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear + 1}-12-31`;

  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const flatListRef = useRef<FlatList<string>>(null);
  const currentDate = moment().format('YYYY-MM-DD');
  
  const [task, setTask] = useState<string | null>('');
  const [taskItems, setTaskItems] = useState<TaskItem[]>([]);
  const [loading, setLoading] = useState(false);

  const animatedValue = useRef(new Animated.Value(0)).current;

  const handleAddTask = () => {
    if (!task || task.trim() === '') {
      Alert.alert('Missing Task');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      setTaskItems((prevTaskItems) => [...prevTaskItems, { text: task!, completed: false }]);
      setTask('');
      setLoading(false);
    }, 500);
  };

  const deleteTask = (index: number) => {
    let itemsCopy = [...taskItems];
    itemsCopy.splice(index, 1);
    setTaskItems(itemsCopy);
  };

  const toggleTaskCompletion = (index) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Apply layout animation
    let itemsCopy = [...taskItems];
    itemsCopy[index].completed = !itemsCopy[index].completed;
    setTaskItems(itemsCopy.sort((a, b) => Number(a.completed) - Number(b.completed)));

    // Start animation
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start(() => {
      animatedValue.setValue(0); // Reset animation
    });
  };

  const generateAllDates = (year: number): string[] => {
    const dates: string[] = [];
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
          flatListRef.current?.scrollToIndex({ animated: true, index: currentDateIndex });
        }, 100);
      }
    }
  }, [allDates]);

  const markedDates = {
    [selectedDate]: {
      selected: true,
      selectedColor: '#ea9c8a',
    },
  };

  const getTaskTitle = (date: string) => {
    if (date === currentDate) {
      return "Today's Tasks";
    } else {
      return `Tasks for ${date}`;
    }
  };

  const renderWeekDates = ({ item }: { item: string }) => (
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
    <View style={styles.container}>
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
        <TextInput style={styles.textInput} placeholder='Write a task' autoCapitalize='none' value={task || ''} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={handleAddTask} disabled={loading}>
          <View style={styles.addWrapper}>
            {loading ? (
              <ActivityIndicator size="small" color="#0000ff" />
              ) : (
              <Text style={styles.addText}>+</Text>
            )}
          </View>
        </TouchableOpacity>
        </KeyboardAvoidingView>
        <FlatList
            style={styles.taskList}
            contentContainerStyle={styles.taskListContainer}
            data={taskItems.sort((a, b) => Number(a.completed) - Number(b.completed))}
            renderItem={({ item, index }) => (
              <Task 
                key={index} 
                text={item.text} 
                index={index} 
                completed={item.completed}
                deleteTask={deleteTask} 
                toggleTaskCompletion={toggleTaskCompletion}
              />
            )}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={<View style={{ height: 120 }} />}
      />
    </View>
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
    marginTop: '5%'
  },
  toDoListTitle: {
    fontSize: 22,
    fontWeight: 'bold',
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
    color: 'red',
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
  },
  taskListContainer: {
    paddingBottom: '10%',
  },
  taskList: {
    flex: 1,
  },
});

export default ToDoList;

