import * as React from "react";
import { useState, useEffect, useCallback } from 'react';
import { KeyboardAvoidingView, Platform, StatusBar } from 'react-native';
import { NavigationContainer, Route } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashLoading from "./SplashLoading";
import Main from "./src/Main";
import Navi_Login from './src/Login/Navi_Login'
import messaging from '@react-native-firebase/messaging';

const Stack = createNativeStackNavigator();

 //FCM-background 알림 받기 로직
 messaging().setBackgroundMessageHandler(async remoteMessage => {
  if(remoteMessage) {
    console.log(`${Platform.OS} [Background Message]`, remoteMessage);
  }
});

// useEffect(()=>{
  //FCM-foreground 로직 구현하기
  // ...
//  }, []);

function App () {
    return (
    <NavigationContainer>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='white'
      />
      <KeyboardAvoidingView behavior={Platform.select({ ios: "padding", android: undefined })}style={{ flex: 1 }}>  
        <Stack.Navigator>
          <Stack.Screen name="SplashLoading" component={SplashLoading} options={{ headerShown: false }} />
          <Stack.Screen name="Navi_Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Navi_Login" component={Navi_Login} options={{ headerShown: false }}/>
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </NavigationContainer>
  );
}

export default App;

