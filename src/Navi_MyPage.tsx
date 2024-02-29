import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import MyPageMain from './MyPage/MyPageMain';
import DeleteAccount from "./MyPage/DeleteAccount";
import Advertising from "./MyPage/Notice/Advertising";
import Notice from "./MyPage/Notice/Notice";
import Question from "./MyPage/Notice/Question";
import PersonInfo from "./MyPage/Notice/PersonInfo";
import Policy from "./MyPage/Notice/Policy";
import FavorList from "./MyPage/MyMenu/FavorList";
import History from "./MyPage/MyMenu/History";
import TalkList from "./MyPage/MyMenu/TalkList";
import EditProfile from "./MyPage/EditProfile";
import NoticeDetail from "./MyPage/Notice/NoticeDetail";
import VersionInfo from "./MyPage/Notice/VersionInfo";
import BusinessInfo from "./MyPage/Notice/BusinessInfo";

const Stack = createNativeStackNavigator();

function Navi_MyPage() {
  return (
    <Stack.Navigator 
    screenOptions={{headerShown: false, contentStyle: {backgroundColor:'#fff'}}}
    >
      <Stack.Screen name={'MyPageMain'} component={MyPageMain}/>
      <Stack.Screen name={'FavorList'} component={FavorList}/>
      <Stack.Screen name={'History'} component={History}/>
      <Stack.Screen name={'TalkList'} component={TalkList}/>
      <Stack.Screen name={'EditProfile'} component={EditProfile}/>
      <Stack.Screen name={'DeleteAccount'} component={DeleteAccount}/>
      <Stack.Screen name={'Advertising'} component={Advertising}/>
      <Stack.Screen name={'Notice'} component={Notice}/>
      <Stack.Screen name={'NoticeDetail'} component={NoticeDetail}/>
      <Stack.Screen name={'Question'} component={Question}/>
      <Stack.Screen name={'PersonInfo'} component={PersonInfo}/>
      <Stack.Screen name={'Policy'} component={Policy}/>
      <Stack.Screen name={'VersionInfo'} component={VersionInfo}/>
      <Stack.Screen name={'BusinessInfo'} component={BusinessInfo}/>
    </Stack.Navigator>
  );
}
export default Navi_MyPage;
