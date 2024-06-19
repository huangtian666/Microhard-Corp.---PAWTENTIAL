import React from 'react';
import { Stack } from 'expo-router';
import HomeScreen from './screens/Home';
import { Router, Route } from '@react-navigation/native';

const RootLayout = () => {
  return (
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
      <Stack.Screen name="screens/Home/index" />
      <Stack.Screen name="screens/ToDoList/index" />
      <Stack.Screen name="screens/Timer/index" />
      <Stack.Screen name="screens/WhiteNoise/index" />
      <Stack.Screen name="screens/PawSpace/index" />
    </Stack>
  );
};

export default RootLayout;