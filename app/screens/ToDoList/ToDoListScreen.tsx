/*import { Text, StyleSheet, Dimensions, TouchableOpacity, View, TextInput, KeyboardAvoidingView, 
  Platform, Keyboard, Alert, ActivityIndicator, UIManager, LayoutAnimation, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import Task from '@/components/Task';
import { useTaskContext } from '../../Context/TaskProvider';
import { addTaskToFirestore, updateTaskInFirestore, 
  deleteTaskFromFirestore, getTasksForDateFromFirestore } from '@/FirestoreService';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

interface TaskItem {
  text: string;
  completed: boolean;
}

interface TasksByDate {
  [date: string]: TaskItem[];
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToDoList: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear + 1}-12-31`;

  const { setTodayTotalTasks, setTodayCompletedTasks } = useTaskContext();
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const flatListRef = useRef<FlatList<string>>(null);
  const currentDate = moment().format('YYYY-MM-DD');

  const [task, setTask] = useState<string | null>('');
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const userId = FIREBASE_AUTH.currentUser?.uid;


  useEffect(() => {
    const todayTasks = tasksByDate[currentDate] || [];
    setTodayTotalTasks(todayTasks.length);
    setTodayCompletedTasks(todayTasks.filter(task => task.completed).length);
  }, [tasksByDate, currentDate, setTodayTotalTasks, setTodayCompletedTasks]);

  const handleAddTask = () => {
    if (!task || task.trim() === '') {
      Alert.alert('No task entered');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    setTimeout(() => {
      const newTask: TaskItem = { text: task!, completed: false };
      setTasksByDate(prevTasks => {
        const dateTasks = prevTasks[selectedDate] || [];
        const updatedTasks = [...dateTasks, newTask];
        
        if (selectedDate === currentDate) {
          setTodayTotalTasks(updatedTasks.length);
        }

        return {
          ...prevTasks,
          [selectedDate]: updatedTasks
        };
      });
      setTask('');
      setLoading(false);
    }, 100);
  };

  const deleteTask = (index: number) => {
    setTasksByDate(prevTasks => {
      const dateTasks = [...(prevTasks[selectedDate] || [])];
      const taskToDelete = dateTasks.splice(index, 1)[0];
      if (selectedDate === currentDate) {
        setTodayTotalTasks(dateTasks.length);
        if (taskToDelete.completed) {
          setTodayCompletedTasks(prev => prev - 1);
        }
      }
      return {
        ...prevTasks,
        [selectedDate]: dateTasks
      };
    });
  };

  const toggleTaskCompletion = (index: number) => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut); // Apply layout animation
    setTasksByDate(prevTasks => {
      const dateTasks = [...(prevTasks[selectedDate] || [])];
      dateTasks[index].completed = !dateTasks[index].completed;
      if (selectedDate === currentDate) {
        setTodayCompletedTasks(dateTasks.filter(task => task.completed).length);
      }
      return {
        ...prevTasks,
        [selectedDate]: dateTasks.sort((a, b) => a.completed - b.completed)
      };
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
    const formattedDate = moment(date).format('D MMMM YYYY');
    if (date === currentDate) {
      return "Today's Tasks";
    } else {
      return `Tasks for ${formattedDate}`;
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

  const clearAllTasks = () => {
    setTasksByDate(prevTasks => {
      return {
        ...prevTasks,
        [selectedDate]: []
      };
    });
  };

  const sortedTasks = (tasksByDate[selectedDate] || []).sort((a, b) => a.completed - b.completed);

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
        <TouchableOpacity onPress={clearAllTasks} style={styles.clearAllButton}>
          <Text style={styles.clearAllButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.textInput} placeholder='Write a task' autoCapitalize='none' 
          value={task || ''} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={handleAddTask} disabled={loading}>
          <View style={styles.addWrapper}>
            {loading ? (
              <ActivityIndicator size="small" color="gray" />
              ) : (
              <Text style={styles.addText}>+</Text>
            )}
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {sortedTasks.length === 0 ? (
        <View>
          <Text style={styles.noTasksText}>No Tasks Yet</Text>
          <Text style={styles.quote}> “Plans are nothing; planning is everything.” 
                ― Dwight D. Eisenhower, former U.S. President </Text>
        </View>
      ) : (
        <FlatList
          style={styles.taskList}
          contentContainerStyle={styles.taskListContainer}
          data={sortedTasks}
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
          ListFooterComponent={<View style={{ height: 10 }} />} // Add gap at the bottom
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: '3%'
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
  taskList: {
    flex: 1,
  },
  taskListContainer: {
    paddingBottom: 100,
  },
  clearAllButton: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
  clearAllButtonText: {
    color: '#ea9c8a',
    fontSize: 14,
  },
  noTasksText: {
    fontSize: 20,
    color: '#a5807b',
    textAlign: 'center',
    marginTop: '40%',
    fontWeight: 'bold',
  },
  quote: {
    fontSize: 15,
    color: '#a5807b',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: '10%',
  }
});

export default ToDoList;*/
import { Text, StyleSheet, Dimensions, TouchableOpacity, View, TextInput, KeyboardAvoidingView, 
  Platform, Keyboard, Alert, ActivityIndicator, UIManager, LayoutAnimation, FlatList } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { CalendarList } from 'react-native-calendars';
import moment from 'moment';
import Ionicons from '@expo/vector-icons/Ionicons';
import Task from '@/components/Task';
import { useTaskContext } from '../../Context/TaskProvider';
import { addTaskToFirestore, updateTaskInFirestore, 
  deleteTaskFromFirestore, getTasksForDateFromFirestore } from '@/FirestoreService';
import { FIREBASE_AUTH } from '@/FirebaseConfig';

interface TaskItem {
  text: string;
  completed: boolean;
  id: string;
}

interface TasksByDate {
  [date: string]: TaskItem[];
}

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
}

const ToDoList: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const minDate = `${currentYear}-01-01`;
  const maxDate = `${currentYear + 1}-12-31`;

  const { setTodayTotalTasks, setTodayCompletedTasks } = useTaskContext();
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));
  const flatListRef = useRef<FlatList<string>>(null);
  const currentDate = moment().format('YYYY-MM-DD');

  const [task, setTask] = useState<string | null>('');
  const [tasksByDate, setTasksByDate] = useState<TasksByDate>({});
  const [loading, setLoading] = useState(false);

  const auth = FIREBASE_AUTH;
  const userId = FIREBASE_AUTH.currentUser?.uid;

  useEffect(() => {
    if (userId && selectedDate) {
      fetchTasks(userId, selectedDate);
    }
  }, [userId, selectedDate]);

  useEffect(() => {
    const todayTasks = tasksByDate[currentDate] || [];
    setTodayTotalTasks(todayTasks.length);
    setTodayCompletedTasks(todayTasks.filter(task => task.completed).length);
  }, [tasksByDate, currentDate, setTodayTotalTasks, setTodayCompletedTasks]);

  const fetchTasks = async (userId: string, date: string) => {
    try {
      const tasks = await getTasksForDateFromFirestore(userId, date);
      setTasksByDate(prevTasks => ({
        ...prevTasks,
        [date]: tasks,
      }));
    } catch (error) {
      console.error('Error getting tasks: ', error);
    }
  };

  const handleAddTask = async () => {
    if (!task || task.trim() === '') {
      Alert.alert('No task entered');
      return;
    }

    setLoading(true);
    Keyboard.dismiss();

    try {
      await addTaskToFirestore(userId!, selectedDate, task);
      fetchTasks(userId!, selectedDate);
      setTask('');
    } catch (error) {
      console.error('Error adding task: ', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await deleteTaskFromFirestore(userId!, taskId);
      fetchTasks(userId!, selectedDate);
    } catch (error) {
      console.error('Error deleting task: ', error);
    }
  };

  const toggleTaskCompletion = async (taskId: string, completed: boolean) => {
    try {
      await updateTaskInFirestore(userId!, taskId, completed);
      fetchTasks(userId!, selectedDate);
    } catch (error) {
      console.error('Error updating task: ', error);
    }
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
    const formattedDate = moment(date).format('D MMMM YYYY');
    if (date === currentDate) {
      return "Today's Tasks";
    } else {
      return `Tasks for ${formattedDate}`;
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

  const clearAllTasks = async () => {
    const tasks = tasksByDate[selectedDate] || [];
    for (const task of tasks) {
      await deleteTask(task.id);
    }
  };

  const sortedTasks = (tasksByDate[selectedDate] || []).sort((a, b) => a.completed - b.completed);

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
        <TouchableOpacity onPress={clearAllTasks} style={styles.clearAllButton}>
          <Text style={styles.clearAllButtonText}>Clear All</Text>
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}  
        style={styles.writeTaskWrapper}
      >
        <TextInput style={styles.textInput} placeholder='Write a task' autoCapitalize='none' 
          value={task || ''} onChangeText={text => setTask(text)} />
        <TouchableOpacity onPress={handleAddTask} disabled={loading}>
          <View style={styles.addWrapper}>
            {loading ? (
              <ActivityIndicator size="small" color="gray" />
              ) : (
              <Text style={styles.addText}>+</Text>
            )}
          </View>
        </TouchableOpacity>
      </KeyboardAvoidingView>
      {sortedTasks.length === 0 ? (
        <View>
          <Text style={styles.noTasksText}>No Tasks Yet</Text>
          <Text style={styles.quote}> “Plans are nothing; planning is everything.” 
                ― Dwight D. Eisenhower, former U.S. President </Text>
        </View>
      ) : (
        <FlatList
          style={styles.taskList}
          contentContainerStyle={styles.taskListContainer}
          data={sortedTasks}
          renderItem={({ item, index }) => (
            <Task 
              key={item.id} 
              text={item.text} 
              index={index} 
              completed={item.completed}
              deleteTask={() => deleteTask(item.id)} 
              toggleTaskCompletion={() => toggleTaskCompletion(item.id, !item.completed)}
            />
          )}
          keyExtractor={(item) => item.id}
          ListFooterComponent={<View style={{ height: 10 }} />} // Add gap at the bottom
        />)}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginTop: '3%'
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
  taskList: {
    flex: 1,
  },
  taskListContainer: {
    paddingBottom: 100,
  },
  clearAllButton: {
    marginLeft: 'auto',
    paddingHorizontal: 10,
  },
  clearAllButtonText: {
    color: '#ea9c8a',
    fontSize: 14,
  },
  noTasksText: {
    fontSize: 20,
    color: '#a5807b',
    textAlign: 'center',
    marginTop: '40%',
    fontWeight: 'bold',
  },
  quote: {
    fontSize: 15,
    color: '#a5807b',
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: '10%',
  }
});

export default ToDoList;
