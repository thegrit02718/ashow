import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeMain from "./Home/HomeMain";

const Stack = createNativeStackNavigator();

function Navi_Home() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false, contentStyle: {backgroundColor:'#fff'}}}
    >
      <Stack.Screen name={"Main"} component={HomeMain} />
    </Stack.Navigator>
  );
}
export default Navi_Home;