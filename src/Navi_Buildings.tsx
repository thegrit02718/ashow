import React, { Component, useEffect } from "react";
import { StyleSheet, Platform, Image } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Main from './Buildings/BuildingsMain';
import Detail from './Buildings/Detail';
import ArrangeImageWebView from "./Buildings/DetailComponent/ArrangeImageWebView";
import CalculatorFirst from './Buildings/Caculator/CalculatorFirst';
import CalculatorSecond from './Buildings/Caculator/CalculatorSecond';
import CalculatorResult from './Buildings/Caculator/CalculatorResult';
import CalculatorFilter from './Buildings/Caculator/CalculatorFilter';
import TaxDetail from "./Buildings/CalculatorComponent/TaxDetail";
import LocationMap from "./Buildings/DetailPage/LocationMap";
import GroundPlanDetail from "./Buildings/DetailPage/GroundPlanDetail";

const Stack = createNativeStackNavigator();

function Navi_Buildings(props : any) {

  return (
    <Stack.Navigator 
      initialRouteName="Main"
      screenOptions={{headerShown: false, gestureEnabled: true}}
    >
      <Stack.Screen name={"Main"} component={Main} />
      <Stack.Screen name={"Detail"} component={Detail}/>
      <Stack.Screen name={"단지 배치도"} component={ArrangeImageWebView} />
      <Stack.Screen name={'CalculatorFirst'} component={CalculatorFirst}/>
      <Stack.Screen name={'CalculatorSecond'} component={CalculatorSecond}/>
      <Stack.Screen name={'CalculatorResult'} component={CalculatorResult}/>
      <Stack.Screen name={'CalculatorFilter'} component={CalculatorFilter}/>
      <Stack.Screen name={'TaxDetail'} component={TaxDetail}/>
      <Stack.Screen name={'LocationMap'} component={LocationMap}/>
      <Stack.Screen name={'GroundPlanDetail'} component={GroundPlanDetail}/>
    </Stack.Navigator>
  );
}
export default Navi_Buildings;


const styles = StyleSheet.create({
   barStyle_android: {
    height: 60,
    padding: 5,
    backgroundColor: 'white',
    elevation: 3,
    borderTopColor: 'gray',
    borderTopWidth: 0.5,
    paddingBottom: 10
  },
  barStyle_ios : {
    height: 60,
    padding: 5,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 10
  }
});

