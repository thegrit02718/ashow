import React, { Component, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Animated } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import MainURL from '../../MainURL';
import AsyncSetItem from '../AsyncSetItem'
 
export default function Agree (props : any) {
  
  // 전송된 데이터 셋팅
  const navi_dataSet = () => {
    if(props.route.params === null || props.route.params === undefined) {
      return
    } else {
      const routeData = props.route.params.data;
      setRefreshToken(routeData.refreshToken);
      setUserAccount(routeData.email);
      setUserName(routeData.name);
      setUserNickName(routeData.nickName);
      setUserURL(routeData.userURL);
    }
  }

  useEffect(()=>{
    navi_dataSet();
  }, [])

  const [refreshToken, setRefreshToken] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userName, setUserName] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userURL, setUserURL] = useState('');

  console.log(refreshToken, userAccount, userName, userNickName);

  const [isCheck1, setIsCheck1] = useState<boolean>(false);
  const [isCheck2, setIsCheck2] = useState<boolean>(false);
  const [isCheck3, setIsCheck3] = useState<boolean>(false);
  const [isCheck4, setIsCheck4] = useState<boolean>(false);
  const [isCheck5, setIsCheck5] = useState<boolean>(false);
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);
  
  const AgreeBox = (props: { text: string, view: string, isCheck: boolean, setIsCheck: any }) => {
    return (
      <View style={styles.checkboxItem}>
        <TouchableOpacity onPress={()=>{props.setIsCheck(!props.isCheck)}}>
          { props.isCheck ? <AntDesign name="checkcircle" size={24} color="black" style={styles.checkboxicon} />
          : <AntDesign name="checkcircleo" size={20} color="black" style={styles.checkboxicon} /> }
        </TouchableOpacity>
        <Text style={styles.checkboxText}>{props.text}</Text>
        <TouchableOpacity style={styles.checkDetail}>
          <Text style={styles.checkDetailText}>{props.view}</Text>
        </TouchableOpacity>
      </View>
    ) 
  }

  const handleAllAgree = () => {
    if (isAllCheck === true) {
      setIsAllCheck(false)
      setIsCheck1(false);
      setIsCheck2(false);
      setIsCheck3(false);
      setIsCheck4(false);
      setIsCheck5(false);
    } else {
      setIsAllCheck(true);
      setIsCheck1(true);
      setIsCheck2(true);
      setIsCheck3(true);
      setIsCheck4(true);
      setIsCheck5(true);
    }
  };

  // 회원가입하기
  const handleSignup = () => {

    if (userName !== null && userAccount !== null ) {
      axios
        .post(`${MainURL}/login/logisterdo`, {
          userAccount: userAccount,
          userName: userName,
          userNickName: userNickName,
          userURL: userURL
        })
        .then((res) => {
          if (res.data === userName) {
            Alert.alert('회원가입이 완료되었습니다!');
            AsyncSetItem(refreshToken, userName, userNickName, userURL);
            props.navigation.navigate('Result', {nickName : userNickName});
          } else {
            Alert.alert('다시 시도해 주세요.');
          }
        })
        .catch(() => {
          console.log('실패함');
        });
    } else {
      Alert.alert('빈칸을 입력해주세요');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressBarBox}>
        <View style={styles.progressBar}>
          <View style={styles.progress}></View>
        </View>
      </View>
      <View style={styles.mainContainer}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={()=>{
            props.navigation.goBack();
          }}
          >
          <AntDesign name="arrowleft" size={24} color="black" />
        </TouchableOpacity>
        <View style={styles.inputContainer}>
          <Text style={styles.titleTextBox}>
            마지막으로,{'\n'}아쇼 서비스 제공을 위해{'\n'}
            <Text style={styles.boldText}>이용약관에 동의</Text>해주세요.
          </Text>
          <View style={styles.inputFieldBox}>
            
            <AgreeBox text={'만 14세 이상입니다. (필수)'} view={''} isCheck={isCheck1} setIsCheck={setIsCheck1}/>
            <AgreeBox text={'위치정보 서비스 이용 약관에 동의합니다. (필수)'} view={'보기'} isCheck={isCheck2} setIsCheck={setIsCheck2}/>
            <AgreeBox text={'개인정보 수집 및 이용에 동의합니다. (필수)'} view={'보기'} isCheck={isCheck3} setIsCheck={setIsCheck3}/>
            <AgreeBox text={'개인정보 제3자 제공에 동의합니다.'} view={''} isCheck={isCheck4} setIsCheck={setIsCheck4}/>
            <AgreeBox text={'부동산 정보와 혜택 알림 수신에 동의합니다.'} view={''} isCheck={isCheck5} setIsCheck={setIsCheck5}/>
            
            <View style={styles.divider}></View>

            <View style={styles.allCheckbox}>
              <TouchableOpacity 
                  onPress={handleAllAgree}
                >
                { isAllCheck ? <AntDesign name="checkcircle" size={24} color="black" style={styles.checkboxicon} />
                : <AntDesign name="checkcircleo" size={20} color="black" style={styles.checkboxicon} /> }
              </TouchableOpacity>
              <Text style={styles.allCheckboxText}>모든 약관에 동의합니다.</Text>
            </View>      
          </View>
          <TouchableOpacity 
            onPress={handleSignup}
            style={
              isAllCheck ? [styles.nextBtnBox, { backgroundColor: '#E8726E'}] 
              : [styles.nextBtnBox, { backgroundColor: '#F0A3A1'}]
            }
            >
            <Text style={styles.nextBtnText}>가입하기</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: getStatusBarHeight()
  },
  progressBarBox: {
    marginTop: 50,
    width: '100%',
    justifyContent: 'center',
  },
  progressBar: {
    backgroundColor: '#EFEFEF',
  },
  progress: {
    width: '100%',
    height: 6,
    backgroundColor: '#F0A3A1',
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 24,
  },
  backButton: {
    width: 24,
    height: 24,
    marginTop: 24,
    marginBottom: 42
  },
  inputContainer: {
    flex: 6,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  titleTextBox: {
    justifyContent: 'center',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
  },
  boldText: {
    fontWeight: '600',
  },
  inputFieldBox: {
    height: 300,
    marginBottom: 30,
  },
  checkboxGroup: {
    marginTop: 16,
  },
  checkboxItem: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkboxicon: {
    marginRight: 10
  },
  checkboxText: {
    color: '#6F6F6F',
    fontSize: 14,
    letterSpacing: -0.075,
  },
  checkDetail: {
    marginLeft: 8,
  },
  checkDetailText: {
    fontSize: 12,
    textDecorationLine: 'underline',
    color: '#3d3d3d',
    fontWeight: '500',
  },
  divider: {
    width: '100%',
    height: 3,
    backgroundColor: '#F5F4F3',
    marginBottom: 16,
  },
  allCheckbox: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  allCheckboxText: {
    fontSize: 18,
    color: '#1B1B1B',
  },
  nextBtnBox: {
    borderRadius: 16,
    width: '100%',
    marginBottom: 50,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center'
  },
  nextBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  }
});
