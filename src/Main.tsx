import * as React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Platform } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack"; 
import { getStatusBarHeight } from "react-native-status-bar-height";
import Navi_Home from "./Navi_Home";
import Navi_Guide from "./Navi_Guide";
import Navi_Buildings from "./Navi_Buildings";
import Navi_MyPage from "./Navi_MyPage";
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import {checkNotifications, requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import MainURL from '../MainURL';

const Tab = createMaterialBottomTabNavigator();

export default function Main() {

  checkNotifications().then(({status, settings}) => {
    if (status === 'denied' || status === 'blocked'){
      requestNotifications(['alert', 'sound']);
    } else if (status === 'granted') {
      return
    } else {
      return
    }
  })

  // firebase notification 토큰받기
  async function checkFireBaseApplicationPermission()  {
    const token = await messaging().getToken();
    console.log(Platform.OS, token);
    // fcm 토큰 저장하기 로직 구현
    // axios
    //   .post(`${MainURL}/notification/savetoken`, {
    //     token : token,
    //   })
    //   .then((res) => {
    //     console.error(res.data);    
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
  }
     
  useEffect(()=>{
    checkFireBaseApplicationPermission();
  }, []); 
  
  return (
    <Tab.Navigator 
      style={Platform.OS === 'android' ? styles.android : styles.ios}
      barStyle={Platform.OS === 'android' ? styles.barStyle_android : styles.barStyle_ios}
    >
      <Tab.Screen
        name="홈"
        component={Navi_Home}
        options={{
          tabBarIcon: () => <Feather name="home" size={24} color="black" />,
            
        }}
      ></Tab.Screen>
      <Tab.Screen
        name="매물"
        component={Navi_Buildings}
        options={{
          tabBarIcon: () => <FontAwesome5 name="building" size={24} color="black" />,
        }}
      />
      <Tab.Screen
        name="부동산가이드"
        component={Navi_Guide}
        options={{
          tabBarIcon: () => <Feather name="book" size={24} color="black" />
        }}
      />
      <Tab.Screen
        name="마이페이지"
        component={Navi_MyPage}
        options={{
          tabBarIcon: () => <Ionicons name="person-outline" size={24} color="black" />
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  android: {
    
  },
  ios : {
    backgroundColor: 'white',
    paddingTop: getStatusBarHeight()
  },
  barStyle_android: {
    backgroundColor: 'white',
    elevation: 3,
    borderTopColor: 'gray',
    borderTopWidth: 0.5
  },
  barStyle_ios : {
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  }
});


