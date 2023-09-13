import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import axios from "axios";
import MainURL from '../../MainURL';
import AsyncSetItem from '../AsyncSetItem'
 
export default function Login (props : any) {

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      axios
          .post(`${MainURL}/login/login/kakao`, {
            AccessToken: token.accessToken,
          })
          .then((res: any)=>{
            if (res.data.isUser === true) {
              AsyncSetItem(res.data.refreshToken, res.data.userName, res.data.userNickName, res.data.userURL);
              props.navigation.replace('Navi_Main');
            } else if (res.data.isUser === false) {
              props.navigation.navigate("Logister", {data: res.data});
            }
          }).catch((err : string)=>{
            console.log('kakao토큰요청_err :', err)
          });
    } catch (err) {
      console.error('login err', err);
    }
  };

  // 네이버 로그인
  const consumerKey = 'cIPtzvvlX1yC_UcFjo3L';
  const consumerSecret = 'iqO0Lt8iUu';
  const appName = 'com.ashow.app';
  const serviceUrlScheme = 'com.ashow.app';

  const signInWithNaver = async () => {
    const {failureResponse, successResponse} = await NaverLogin.login({
      appName,
      consumerKey,
      consumerSecret,
      serviceUrlScheme,
    })
    if (successResponse) {
      axios
        .post(`${MainURL}/login/login/naver`, {
          AccessToken: successResponse.accessToken
        })
        .then((res: any)=>{
          if (res.data.isUser === true) {
            AsyncSetItem(res.data.refreshToken, res.data.userName, res.data.userNickName, res.data.userURL);
            props.navigation.replace('Navi_Main');
          } else if (res.data.isUser === false) {
            props.navigation.navigate("Logister", {data: res.data});
          }
        }).catch((err : string)=>{
          console.log('naver토큰요청_err :', err)
        });
    }
  };

  // 공지
  const handelAction = () => {
    Alert.alert('정말 네이버로 로그인 하시겠습니까?', '네이버로 로그인시, 카카오톡 채널을 통한 알림을 받아볼 수 없습니다.', [
      { text: '네이버로 로그인', onPress: () => signInWithNaver() },
      { text: '카카오로 로그인', onPress: () => signInWithKakao() }
    ]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainimgbox}>
        <Image style={styles.mainimg} source={require('../images/login/mainbackimg.png')}/>
      </View>

      <View style={styles.emptyBox}>
      </View>

      <View style={styles.mainBox}>
        <View style={styles.mainBoxImg}>
          <Image source={require('../images/login/logo.png')}/>
        </View>
        <View style={styles.mainBoxText}>
          <Text style={styles.mainBoxText_text}>간편하게 로그인 하시고</Text>
          <Text style={styles.mainBoxText_text}>아파트 구매에 필요한</Text>
          <Text style={styles.mainBoxText_text}>혜택과 다양한 정보를 확인하세요</Text>
        </View>
      </View>

      <View style={styles.buttonBox}>
        <TouchableOpacity 
          style={styles.loginButtonkakao} 
          onPress={()=>{
            signInWithKakao();
          }}>
          <View style={styles.loginButtonImg}>
            <Image source={require('../images/login/iconkakao.png')}/>
          </View>
          <Text style={styles.loginButtonText}>카카오로 간편 로그인</Text>
        </TouchableOpacity>

       
        <TouchableOpacity 
          style={styles.loginButtonNaver} 
          onPress={handelAction}>
          <View style={styles.loginButtonImg}>
            <Image source={require('../images/login/iconnaver.png')}/>
          </View>
          <Text style={styles.loginButtonText}>네이버로 간편 로그인</Text>
        </TouchableOpacity>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mainimgbox: {
    position: 'absolute',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mainimg: {
    height: '100%',
    width: '100%'
  },
  emptyBox: {
    flex: 1,
  },
  mainBox: {
    flex: 2,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center'
  },
  mainBoxImg: {
    marginTop: 50
  },
  mainBoxText: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 30
  },
  mainBoxText_text: {
    color: 'white',
    fontWeight: 'bold',
    lineHeight: 25
  },
  buttonBox: {
    flex: 2,
    width: '100%',
    height: 200,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loginButtonImg: {
    position: 'absolute',
    left: 30,
  },
  loginButtonkakao : {
    height: 50,
    backgroundColor: '#fef01b',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  loginButtonNaver : {
    height: 50,
    backgroundColor: '#03C75A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 10
  },
  loginButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
  },
  ButtonWithoutlogin : {
    color: 'white',
    marginVertical: 27,
    textDecorationLine: 'underline'
  }
});