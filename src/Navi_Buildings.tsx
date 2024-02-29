import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Buildings/BuildingsMain';

const Stack = createNativeStackNavigator();

function Navi_Buildings() {

  return (
    <Stack.Navigator 
      screenOptions={{headerShown: false, contentStyle: {backgroundColor:'#fff'}}}
    >
      <Stack.Screen name={"BuildingsMain"} component={Main} />
    </Stack.Navigator>
  );
}
export default Navi_Buildings;