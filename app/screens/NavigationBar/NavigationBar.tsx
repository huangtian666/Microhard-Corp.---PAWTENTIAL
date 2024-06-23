// app/NavigationBar.js
import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '@/app/screens/Home';
import ToDoList from '@/app/screens/ToDoList';
import Timer from '@/app/screens/Timer';
import WhiteNoise from '@/app/screens/WhiteNoise';
import PawSpace from '@/app/screens/PawSpace';
import { View, Text, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import { FIREBASE_DB, FIREBASE_AUTH } from '@/FirebaseConfig';
import { getUsername } from '@/FirestoreService';


const Tab = createBottomTabNavigator();

const NavigationBar = () => {

  const auth = FIREBASE_AUTH;
  const db = FIREBASE_DB;
  const [username, setUsername] = useState('');


  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const userId = auth.currentUser.uid;
        const username = await getUsername(userId);
        setUsername(username);
      } catch (error) {
        console.error('Error fetching username:', error);
      }
    };

    if (auth.currentUser) {
      fetchUsername();
    }
  }, [auth.currentUser]);


  const CustomHeaderTitle = ({ title, icon }) => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Ionicons name={icon} size={24} color='gray' style={{ marginRight: 15}} />
        <Text style={{ color: 'gray', fontSize: 17, fontWeight: 'bold' }}>{title}</Text>
      </View>
    );
  };

  return (
    <Tab.Navigator
        initialRouteName='Home'
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            switch (route.name) {
                case 'Home':
                iconName = focused ? 'home' : 'home-outline';
                break;
                case 'To-Do List':
                iconName = focused ? 'list' : 'list-outline';
                break;
                case 'Timer':
                iconName = focused ? 'timer' : 'timer-outline';
                break;
                case 'WhiteNoise':
                iconName = focused ? 'musical-notes' : 'musical-note-outline';
                break;
                case 'PawSpace':
                iconName = focused ? 'paw' : 'paw-outline';
                break;
                default:
                iconName = 'home';
            }

            return <Ionicons name={iconName} size={size} color={color} />;
            },
        tabBarActiveTintColor: '#ea9c8a',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: { 
          height:75,
          paddingBottom: 17,
          paddingTop: 8,
          paddingHorizontal: 7, 
          backgroundColor: 'white',
          borderTopWidth: 2,
        },
        tabBarLabelStyle: { 
          fontSize: 12, 
          fontWeight: 'bold',
          marginBottom: '5%',
        },
        tabBarIconStyle: { 
          size: 27 ,
        },
      })}
    >
      <Tab.Screen name="To-Do List" 
        component={ToDoList} 
        options={{ 
          headerShown: true,
          headerTitle: () => <CustomHeaderTitle title="To-Do List" icon="list" />,
          headerStyle: { 
            borderWidth: 0.5,
            backgroundColor: 'white', // Example background color for header
          },
          headerTitleAlign: 'left',
          headerTitleContainerStyle: { paddingLeft: 20 },
        }} 
        />
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="Home" component={Home} 
              options={{ 
                headerShown: true,
                headerTitle: () => <CustomHeaderTitle title={`Hi ${username} !`} icon="home-outline" />,
                headerStyle: { 
                  backgroundColor: 'white', // Example background color for header
                  borderWidth: 0.5,
                },
                headerTitleAlign: 'left',
                headerTitleContainerStyle: { paddingLeft: 20 },
                headerRight: () => (
                  <TouchableOpacity onPress={() => router.navigate('/screens/Setting')} style={{ marginRight: '17%' }}>
                    <Ionicons name="settings-outline" size={24} color="gray" />
                  </TouchableOpacity>
                ),
              }}
            />
      <Tab.Screen name="WhiteNoise" component={WhiteNoise} />
      <Tab.Screen name="PawSpace" component={PawSpace} />
    </Tab.Navigator>
  );
};

export default NavigationBar;
