import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar, Alert } from 'react-native';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashLoading from "./SplashLoading";
import Main from "./src/Main";
import Navi_Login from './src/Login/Navi_Login'
import messaging from '@react-native-firebase/messaging';
import { AppRegistry } from 'react-native';
import Toast, { BaseToast } from "react-native-toast-message";

const Stack = createNativeStackNavigator();

function App (props : any) {

  //FCM-background 알림 받기 로직
  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log(`${Platform.OS} [Background Message]`, remoteMessage);
  });
  AppRegistry.registerComponent('app', () => App);

  
  // react-native-toast-message 커스텀 디자인
  const toastConfig = {
    success: (props:any) => (
      <BaseToast
        {...props}
        style={{ borderLeftColor: 'pink' }}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        text1Style={{
          fontSize: 15,
          fontWeight: '400'
        }}
      />
    ),
  };

  return (
    <NavigationContainer>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='white'
      />
      <Stack.Navigator>
        <Stack.Screen name="SplashLoading" component={SplashLoading} options={{ headerShown: false }} />
        <Stack.Screen name="Navi_Main" component={Main} options={{ headerShown: false }} />
        <Stack.Screen name="Navi_Login" component={Navi_Login} options={{ headerShown: false }}/>
      </Stack.Navigator>
      <Toast config={toastConfig}/>
    </NavigationContainer>
  );
}

export default App;

