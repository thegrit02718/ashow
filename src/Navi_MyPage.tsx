import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { Component } from "react";
import Main from './MyPage/MyPageMain';
import Page1 from './MyPage/Page1';
import Page2 from './MyPage/Page2';
import Page3 from './MyPage/Page3';
import Page4 from './MyPage/Page4';
import Page5 from './MyPage/Page5';
import Page6 from './MyPage/Page6';
import DeleteAccount from "./MyPage/DeleteAccount";

const Stack = createNativeStackNavigator();

function Navi_MyPage() {
  return (
    <Stack.Navigator >
      <Stack.Screen options={{headerShown: false}} name={'Main'} component={Main}/>
      <Stack.Screen name={'상담내역'} component={Page1}/>
      <Stack.Screen name={'알림'} component={Page2}/>
      <Stack.Screen name={'관심단지'} component={Page3}/>
      <Stack.Screen name={'히스토리'} component={Page4}/>
      <Stack.Screen name={'알림설정'} component={Page5}/>
      <Stack.Screen name={'공지사항'} component={Page6}/>
      <Stack.Screen name={'회원 탈퇴'} component={DeleteAccount}/>
    </Stack.Navigator>
  );
}
export default Navi_MyPage;
