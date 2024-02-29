import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Board/BoardMain';
import Detail from "./Board/Detail";
import Post from './Board/Post';

const Stack = createNativeStackNavigator();

function Navi_Board() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false, contentStyle: {backgroundColor:'#fff'}}}
      
    >
      <Stack.Screen name={"Main"} component={Main} />
      <Stack.Screen name={"Detail"} component={Detail} />
      <Stack.Screen name={"Post"} component={Post} />
    </Stack.Navigator>
  );
}
export default Navi_Board;