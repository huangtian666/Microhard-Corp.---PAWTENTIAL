import React from 'react';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="screens/Authentication/SignInScreen" />
      <Stack.Screen name="screens/Authentication/SignUpScreen" />
      <Stack.Screen name="screens/Authentication/ConfirmEmailScreen" />
      <Stack.Screen name="screens/Authentication/ResetPasswordScreen1" />
      <Stack.Screen name="screens/Authentication/ResetPasswordScreen2" />
      <Stack.Screen name="screens/Authentication/ResetPasswordScreen3" />
      <Stack.Screen name="screens/WelcomeScreen/WelcomeScreen" />
      <Stack.Screen name="screens/BoardingQuestions/Question1" />
      <Stack.Screen name="screens/BoardingQuestions/Question2" />
      <Stack.Screen name="screens/Home/HomeScreen" />
    </Stack>
  );
};

export default RootLayout;