import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Guide/GuideMain';
import Page1 from './Guide/Page1';
import Page2 from './Guide/Page2';

const Stack = createNativeStackNavigator();

function Navi_Guide() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={"Main"} component={Main} />
      <Stack.Screen options={{headerShown: false}} name={'Page1'} component={Page1}/>
      <Stack.Screen options={{headerShown: false}} name={'Page2'} component={Page2}/>
    </Stack.Navigator>
  );
}
export default Navi_Guide;