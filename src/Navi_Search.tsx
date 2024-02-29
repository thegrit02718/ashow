import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Notification from "./Notifi/Notification";
import NotificationSetting from "./Notifi/NotificationSetting";
import { StyleSheet, Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import SearchMain from "./Search/SearchMain";

const Stack = createNativeStackNavigator();

function Navi_Search() {
  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor:'#fff', paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0}
      }}
    >
      <Stack.Screen name={'SearchMain'} component={SearchMain}/>
      {/* <Stack.Screen name={'NotificationSetting'} component={NotificationSetting}/> */}
    </Stack.Navigator>
  );
}
export default Navi_Search;

