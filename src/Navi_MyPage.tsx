import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import MyPageMain from './MyPage/MyPageMain';
import DeleteAccount from "./MyPage/DeleteAccount";
import Notification from './MyPage/MyMenu/Notification';
import Advertising from "./MyPage/Notice/Advertising";
import Notice from "./MyPage/Notice/Notice";
import Question from "./MyPage/Notice/Question";
import PersonInfo from "./MyPage/Notice/PersonInfo";
import Policy from "./MyPage/Notice/Policy";
import FavorList from "./MyPage/MyMenu/FavorList";
import History from "./MyPage/MyMenu/History";
import TalkList from "./MyPage/MyMenu/TalkList";


const Stack = createNativeStackNavigator();

function Navi_MyPage() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={'메인'} component={MyPageMain}/>
      <Stack.Screen options={{headerShown: false}} name={'FavorList'} component={FavorList}/>
      <Stack.Screen options={{headerShown: false}} name={'History'} component={History}/>
      <Stack.Screen options={{headerShown: false}} name={'TalkList'} component={TalkList}/>
      <Stack.Screen name={'알림'} component={Notification}/>
      <Stack.Screen name={'회원 탈퇴'} component={DeleteAccount}/>
      <Stack.Screen name={'광고문의'} component={Advertising}/>
      <Stack.Screen name={'공지사항'} component={Notice}/>
      <Stack.Screen name={'1:1문의하기'} component={Question}/>
      <Stack.Screen name={'개인정보처리방침'} component={PersonInfo}/>
      <Stack.Screen name={'약관및정책'} component={Policy}/>
    </Stack.Navigator>
  );
}
export default Navi_MyPage;
