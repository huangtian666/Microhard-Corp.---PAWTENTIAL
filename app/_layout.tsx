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
    </Stack>
    </TaskProvider>
  );
};

export default RootLayout;