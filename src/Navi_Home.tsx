import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import HomeMain from './Home/HomeMain';
import Prepare from "./Home/Prepare";

const Stack = createNativeStackNavigator();

function Navi_Home() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={'HomeMain'} component={HomeMain}/>
      <Stack.Screen options={{headerShown: false}} name={'Prepare'} component={Prepare}/>
    </Stack.Navigator>
  );
}
export default Navi_Home;