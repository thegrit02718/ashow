import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Buildings/BuildingsMain';
import Detail from './Buildings/Detail';
import Page5 from './Buildings/Page5';
import Page6 from './Buildings/Page6';
import Page7 from './Buildings/Page7';
import Page8 from './Buildings/Page8';
import Page9 from './Buildings/Page9';


const Stack = createNativeStackNavigator();

function Navi_Buildings() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={"Main"} component={Main} />
      <Stack.Screen options={{headerShown: false}} name={"Detail"} component={Detail} />
      <Stack.Screen options={{headerShown: false}} name={'Page5'} component={Page5}/>
      <Stack.Screen options={{headerShown: false}} name={'Page6'} component={Page6}/>
      <Stack.Screen options={{headerShown: false}} name={'Page7'} component={Page7}/>
      <Stack.Screen options={{headerShown: false}} name={'Page8'} component={Page8}/>
      <Stack.Screen options={{headerShown: false}} name={'Page9'} component={Page9}/>
    </Stack.Navigator>
  );
}
export default Navi_Buildings;