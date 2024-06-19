// app/NavigationBar.js
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from '@expo/vector-icons/Ionicons';
import Home from '@/app/screens/Home';
import ToDoList from '@/app/screens/ToDoList';
import Timer from '@/app/screens/Timer';
import WhiteNoise from '@/app/screens/WhiteNoise';
import PawSpace from '@/app/screens/PawSpace';
import {View, StyleSheet} from 'react-native'

const Tab = createBottomTabNavigator();

const NavigationBar = () => {
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
                iconName = focused ? 'volume-high' : 'volume-mute-outline';
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
          heigh:70,
          paddingBottom: 17,
          paddingTop: 8,
          paddingHorizontal: 7,
          borderRadius: 25,  
          backgroundColor: 'white',
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
      <Tab.Screen name="To-Do List" component={ToDoList} />
      <Tab.Screen name="Timer" component={Timer} />
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="WhiteNoise" component={WhiteNoise} />
      <Tab.Screen name="PawSpace" component={PawSpace} />
    </Tab.Navigator>
  );
};

export default NavigationBar;
