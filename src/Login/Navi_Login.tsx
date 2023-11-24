import * as React from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from './Login';
import Logister from "./Logister";
import Agree from './Agree';
import Result from './Result'
import ResidenceSelect from './ResidenceSelect';
 
const Stack = createNativeStackNavigator();

export default function Navi_Login() {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
    >
      <Stack.Screen name={'Login'} component={Login}/>
      <Stack.Screen name={'Logister'} component={Logister}/>
      <Stack.Screen name={'ResidenceSelect'} component={ResidenceSelect}/>
      <Stack.Screen name={'Agree'} component={Agree}/>
      <Stack.Screen name={'Result'} component={Result}/>
    </Stack.Navigator>
  )
}


