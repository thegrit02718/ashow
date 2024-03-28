import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailMain from './Detail/DetailMain';
import ArrangeBuildingDetail from "./Detail/DetailPage/ArrangeBuildingDetail";
import CalculatorFirst from './Detail/Caculator/CalculatorFirst';
import CalculatorSecond from './Detail/Caculator/CalculatorSecond';
import CalculatorResult from './Detail/Caculator/CalculatorResult';
import CalculatorFilter from './Detail/Caculator/CalculatorFilter';
import TaxDetail from "./Detail/CalculatorComponent/TaxDetail";
import LocationMap from "./Detail/DetailPage/LocationMap";
import GroundPlanDetail from "./Detail/DetailPage/GroundPlanDetail";
import Gallery from "./Detail/DetailPage/Gallery";
import GalleryDetail from "./Detail/DetailPage/GalleryDetail";
import { Platform } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import CommunityImageDetail from "./Detail/DetailPage/CommunityImageDetail";
import SchoolDetailWebView from "./Detail/DetailComponent/SchoolDetailWebView";

const Stack = createNativeStackNavigator();

function Navi_Detail() {

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: false,
        contentStyle: {backgroundColor:'#fff', paddingTop: Platform.OS === 'ios' ? getStatusBarHeight() : 0}
      }}
    >
      <Stack.Screen name={"DetailMain"} component={DetailMain}/>
      <Stack.Screen name={'CalculatorFirst'} component={CalculatorFirst}/>
      <Stack.Screen name={'CalculatorSecond'} component={CalculatorSecond}/>
      <Stack.Screen name={'CalculatorResult'} component={CalculatorResult}/>
      <Stack.Screen name={'CalculatorFilter'} component={CalculatorFilter}/>
      <Stack.Screen name={'TaxDetail'} component={TaxDetail}/>
      <Stack.Screen name={'LocationMap'} component={LocationMap}/>
      <Stack.Screen name={'GroundPlanDetail'} component={GroundPlanDetail}/>
      <Stack.Screen name={'CommunityImageDetail'} component={CommunityImageDetail}/>
      <Stack.Screen name={'Gallery'} component={Gallery}/>
      <Stack.Screen name={'GalleryDetail'} component={GalleryDetail}/>
      <Stack.Screen name={"ArrangeBuildingDetail"} component={ArrangeBuildingDetail} />
      <Stack.Screen name={"SchoolDetailWebView"} component={SchoolDetailWebView} />
      
    </Stack.Navigator>
  );
}
export default Navi_Detail;