import * as React from "react";
import { useEffect, useState } from 'react';
import { StyleSheet, Platform, Image, TouchableOpacity } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import Navi_Home from "./Navi_Home";
import Navi_Guide from "./Navi_Guide";
import Navi_Buildings from "./Navi_Buildings";
import Navi_MyPage from "./Navi_MyPage";
import Navi_Board from "./Navi_Board"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {checkNotifications, requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import axios from "axios";
import MainURL from '../MainURL';
import AsyncGetItem from './AsyncGetItem'
import MainVersion from "../MainVersion";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';


const Tab = createBottomTabNavigator();

export default function Main() {

  // checkNotificationPermission
  checkNotifications().then(({status, settings}) => {
    if (status === 'denied' || status === 'blocked'){
      requestNotifications(['alert', 'sound']);
    } else if (status === 'granted') {
      return
    } else {
      return
    }
  })
  
  // firebase notification 토큰 발급 후 저장
  async function takeFireBaseToken(account : string | null | undefined) {
    const token = await messaging().getToken();
    // fcm 토큰 저장하기
    axios
      .post(`${MainURL}/notification/savefirebasetoken`, {
        token : token, userAccount: account
      })
      .then((res) => {
        console.log('savefirebasetoken', Platform.OS, res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  // asyncFetchData 
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      takeFireBaseToken(data?.userAccount);
      versionCheck(data?.userAccount);
    } catch (error) {
      console.error(error);
    }
  };


  // 앱실행시 버전 확인
  function versionCheck (account : string | null | undefined) {
    axios
    .post(`${MainURL}/appversioncheck`, {
      userAccount: account, version: MainVersion,
    })
    .then((res) => {return})
    .catch((error) => {
      console.log(error);
    });
  }
     
  useEffect(()=>{
    asyncFetchData();
  }, []); 

  
  return (
    
    <Tab.Navigator 
      sceneContainerStyle = {Platform.OS === 'android' ? styles.android : styles.ios}
      screenOptions={{
        headerShown : false,
        tabBarStyle: Platform.OS === 'android' ? styles.barStyle_android : styles.barStyle_ios,
        tabBarLabelStyle: { fontSize: 14 },
        tabBarActiveTintColor : '#1B1B1B',
        tabBarInactiveTintColor : '#8B8B8B',
        unmountOnBlur: true,
      }}
    >
      <Tab.Screen
        name="홈"
        component={Navi_Home}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                ? require('./images/tabButtons/selected_home.png')
                : require('./images/tabButtons/default_home.png')
              }
              style={{width: 22, height: 22}}
            />
          )
        }}
      />
      <Tab.Screen
        name="분양가이드"
        component={Navi_Guide}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                ? require('./images/tabButtons/selected_guide.png')
                : require('./images/tabButtons/default_guide.png')
              }
              style={{width: 22, height: 22}}
            />
          )
        }}
      />
      <Tab.Screen
        name="아파트"
        component={Navi_Buildings}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                ? require('./images/tabButtons/selected_buildings.png')
                : require('./images/tabButtons/default_buildings.png')
              }
              style={{width: 22, height: 22}}
            />
          )
        }}
      />
      <Tab.Screen
        name="커뮤니티"
        component={Navi_Board}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                ? require('./images/tabButtons/selected_community.png')
                : require('./images/tabButtons/default_community.png')
              }
              style={{width: 22, height: 22}}
            />
          )
        }}
      />
      <Tab.Screen
        name="프로필"
        component={Navi_MyPage}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={
                focused
                  ? require('./images/tabButtons/selected_mypage.png')
                  : require('./images/tabButtons/default_mypage.png')
              }
              style={{width: 22, height: 22}}
            />
          )
        }}
      />
    </Tab.Navigator>

  );
}

const styles = StyleSheet.create({
  android: {
    
  },
  ios : {
    backgroundColor: '#fff',
    paddingTop: getStatusBarHeight()
  },
  barStyle_android: {
    height: 85,
    padding: 5,
    backgroundColor: '#fff',
    elevation: 3,
    borderTopColor: '#BDBDBD',
    borderTopWidth: 0.5,
    paddingBottom: 20
  },
  barStyle_ios : {
    height: 85,
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#333',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingBottom: 20
  }
});


