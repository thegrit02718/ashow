import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Platform } from 'react-native';
import { login } from '@react-native-seoul/kakao-login';
import NaverLogin from '@react-native-seoul/naver-login';
import axios from "axios";
import MainURL from '../../MainURL';
import AsyncSetItem from '../AsyncSetItem'
import { appleAuth } from '@invertase/react-native-apple-authentication';
import jwt_decode from 'jwt-decode';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import GoogleWebClientID from "./GoogleWebClientID";

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
              AsyncSetItem(res.data.refreshToken, res.data.userAccount, res.data.userName, res.data.userNickName, res.data.userURL);
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
            AsyncSetItem(res.data.refreshToken, res.data.userAccount, res.data.userName, res.data.userNickName, res.data.userURL);
            props.navigation.replace('Navi_Main');
          } else if (res.data.isUser === false) {
            props.navigation.navigate("Logister", {data: res.data});
          }
        }).catch((err : string)=>{
          console.log('naver토큰요청_err :', err)
        });
    }
  };

  // // 공지
  // const handelAction = () => {
  //   Alert.alert('정말 네이버로 로그인 하시겠습니까?', '네이버로 로그인시, 카카오톡 채널을 통한 알림을 받아볼 수 없습니다.', [
  //     { text: '네이버로 로그인', onPress: () => signInWithNaver() },
  //     { text: '카카오로 로그인', onPress: () => signInWithKakao() }
  //   ]);
  // };

  // Apple 로그인
  async function appleLoginButtonPress() {
    
    const appleAuthRequestResponse = await appleAuth.performRequest({
      nonceEnabled: false,
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    const credentialState = await appleAuth.getCredentialStateForUser(appleAuthRequestResponse.user);
    if (credentialState === appleAuth.State.AUTHORIZED) {
      
      if (appleAuthRequestResponse.identityToken) {
        const user = jwt_decode(appleAuthRequestResponse.identityToken);
        axios
        .post(`${MainURL}/login/loginsocial/apple`, {
          userInfo: user,
          userFullName : appleAuthRequestResponse.fullName,
          AccessToken : appleAuthRequestResponse.identityToken,
        })
        .then((res: any)=>{
          if (res.data.isUser === true) {
            AsyncSetItem(res.data.refreshToken, res.data.userAccount, res.data.userName, res.data.userNickName, res.data.userURL);
            props.navigation.replace('Navi_Main');
          } else if (res.data.isUser === false) {
            props.navigation.navigate("Logister", {data: res.data});
          }
        }).catch((err : string)=>{
          console.log('applelogin_err :', err)
        });
      }
    }
  }

  // google 로그인
  async function googleLoginButtonPress() {
    GoogleSignin.configure({
      webClientId: GoogleWebClientID,
      offlineAccess: true,
    });
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const {idToken} = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
      if (res) {
        axios
          .post(`${MainURL}/login/loginsocial/google`, {
            user: res.user,
            AccessToken: idToken,
          })
          .then((res: any)=>{
            if (res.data.isUser === true) {
              AsyncSetItem(res.data.refreshToken, res.data.userAccount, res.data.userName, res.data.userNickName, res.data.userURL);
              props.navigation.replace('Navi_Main');
            } else if (res.data.isUser === false) {
              props.navigation.navigate("Logister", {data: res.data});
            }
          }).catch((err : string)=>{
            console.log('applelogin_err :', err)
          });
      }
    } catch (error) {
      console.log('google_error', error);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.mainimgbox}>
        <Image style={styles.mainimg} source={require('../images/login/mainbackimg.png')}/>
      </View>

      <View style={styles.emptyBox}>
      </View>

      <TouchableOpacity 
            style={styles.loginButtonSocial}
            onPress={()=>{
              props.navigation.replace('Navi_Main');
            }}>
              <Text style={styles.loginButtonText}>데모 버전 로그인</Text>
      </TouchableOpacity>

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
          onPress={signInWithNaver}>
          <View style={styles.loginButtonImg}>
            <Image source={require('../images/login/iconnaver.png')}/>
          </View>
          <Text style={styles.loginButtonText}>네이버로 간편 로그인</Text>
        </TouchableOpacity>
        
        {/* 애플 로그인 */}
        { 
          Platform.OS === 'ios' &&
          <TouchableOpacity 
          style={styles.loginButtonSocial}
          onPress={appleLoginButtonPress}>
            <View style={styles.loginButtonImg}>
              <Image source={require('../images/login/iconapple.png')}/>
            </View>
            <Text style={styles.loginButtonText}>apple로 간편 로그인</Text>
          </TouchableOpacity>
        }

        {/* 구글 로그인 */}
        { 
          Platform.OS === 'android' &&
          <TouchableOpacity 
          style={styles.loginButtonSocial}
          onPress={googleLoginButtonPress}>
            <View style={styles.loginButtonImg}>
              <Image source={require('../images/login/icongoogle.png')}/>
            </View>
            <Text style={styles.loginButtonText}>google로 간편 로그인</Text>
          </TouchableOpacity>
        }  
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
    marginVertical: 3
  },
  loginButtonNaver : {
    height: 50,
    backgroundColor: '#03C75A',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 3
  },
  loginButtonSocial : {
    height: 50,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%',
    paddingVertical: 10,
    borderRadius: 5,
    marginVertical: 3
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