import React from 'react';
import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="screens/Authentication/SignInScreen" />
        <Stack.Screen name="screens/Authentication/SignUpScreen" />
        <Stack.Screen name="screens/Authentication/ConfirmEmail" />
        <Stack.Screen name="screens/Authentication/ResetPasswordScreen1" />
        <Stack.Screen name="screens/Authentication/ResetPasswordScreen2" />
        <Stack.Screen name="screens/Authentication/ResetPasswordScreen3" />
        <Stack.Screen name='screens/home'/>
      </Stack>
  );
}

export default RootLayout;
