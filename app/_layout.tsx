import React from 'react';
import { Stack} from 'expo-router';
import { TaskProvider } from './Context/TaskProvider';

const RootLayout = () => {

  return (
    <TaskProvider>
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="screens/Authentication/SignInScreen/index" />
      <Stack.Screen name="screens/Authentication/SignUpScreen/index" />
      <Stack.Screen name="screens/Authentication/ConfirmEmail/index" />
      <Stack.Screen name="screens/Authentication/ResetPasswordScreen1/index" />
      <Stack.Screen name="screens/Authentication/ResetPasswordScreen2/index" />
      <Stack.Screen name="screens/Authentication/ResetPasswordScreen3/index" />
      <Stack.Screen name="screens/WelcomeScreen/index" />
      <Stack.Screen name="screens/BoardingQuestions/Question1/index" />
      <Stack.Screen name="screens/BoardingQuestions/Question2/index" />
      <Stack.Screen name="screens/NavigationBar/index" />
      <Stack.Screen name="screens/Home/index" />
      <Stack.Screen name="screens/ToDoList/index" />
      <Stack.Screen name="screens/Timer/index" />
      <Stack.Screen name="screens/WhiteNoise/index" />
      <Stack.Screen name ="screens/VideoPlayerScreen/index" />
      <Stack.Screen name="screens/PawSpace/index" />
      <Stack.Screen name="screens/Setting/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Settings',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="screens/UserProfile/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Profile',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="screens/ChangeUsername/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Change Username',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="screens/ChangePetname/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Change Pet Name',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
    <Stack.Screen name="screens/PrivacySecurity/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Privacy & Security',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="screens/Language/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Language Settings',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="screens/ReportIssue/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Report An Issue',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
      <Stack.Screen name="screens/FAQ/index" 
        options={{
          headerBackTitleVisible: false,
          headerShown: true,
          headerTitle: 'Frequently Asked Questions',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerTintColor: 'gray',
          headerTitleAlign: 'center',
      }}/>
    </Stack>
    </TaskProvider>
  );
};

export default RootLayout;