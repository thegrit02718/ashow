import React, { Component } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Guide/GuideMain';
import NewsList from "./Guide/NewsList";
import NewsDetail from "./Guide/NewsDetail";
import GuideDetail from "./Guide/GuideDetail";

const Stack = createNativeStackNavigator();

function Navi_Guide() {
  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false, contentStyle: {backgroundColor:'#fff'}}}
    >
      <Stack.Screen name={"GuideMain"} component={Main} />
      <Stack.Screen name={"NewsList"} component={NewsList} />
      <Stack.Screen name={"NewsDetail"} component={NewsDetail} />
      <Stack.Screen name={"GuideDetail"} component={GuideDetail} />
    </Stack.Navigator>
  );
}
export default Navi_Guide;