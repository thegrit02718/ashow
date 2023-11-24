import React, { Component, useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, Alert, Linking } from 'react-native';
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
      setUserNickName(routeData.nickName);
      setUserURL(routeData.userURL);
      setCity(routeData.city);
      setCounty(routeData.county);
    }
  }

  useEffect(()=>{
    navi_dataSet();
  }, [])

  const [refreshToken, setRefreshToken] = useState('');
  const [userAccount, setUserAccount] = useState('');
  const [userNickName, setUserNickName] = useState('');
  const [userURL, setUserURL] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');

  const [isCheck1_upAge14, setIsCheck1_upAge14] = useState<boolean>(false);
  const [isCheck2_usingPolicy, setIsCheck2_usingPolicy] = useState<boolean>(false);
  const [isCheck3_personalInfo, setIsCheck3_personalInfo] = useState<boolean>(false);
  const [isCheck4_contentsRestrict, setIsCheck4_contentsRestrict] = useState<boolean>(false);
  const [isCheck5_infoToOthers, setIsCheck5_infoToOthers] = useState<boolean>(false);
  const [isAllCheck, setIsAllCheck] = useState<boolean>(false);
  
  const AgreeBox = (props: { choice: string, text: string, view: string, isCheck: boolean, setIsCheck: any, link: string }) => {
    return (
      <View style={styles.checkboxItem}>
        <TouchableOpacity onPress={()=>{props.setIsCheck(!props.isCheck)}}>
          { props.isCheck ? <AntDesign name="checkcircle" size={24} color="#333" style={styles.checkboxicon} />
          : <AntDesign name="checkcircle" size={20} color="#8C8C8C" style={styles.checkboxicon} /> }
        </TouchableOpacity>
        <View style={styles.checkboxContent}>
          <Text style={[styles.checkboxText, {color: '#6F6F6F'}]}>{props.text}</Text>
          <Text style={[styles.checkboxText, {color: '#B33936'}]}> {props.choice}</Text>
          {
            props.view
            && 
            <TouchableOpacity 
              style={styles.checkDetail}
              onPress={()=>{
                Linking.openURL(props.link);
              }}  
            >
              <Text style={styles.checkDetailText}>{props.view}</Text>
            </TouchableOpacity>
          }
          
        </View>
      </View>
    ) 
  }

  const handleAllAgree = () => {
    if (isAllCheck === true) {
      setIsAllCheck(false)
      setIsCheck1_upAge14(false);
      setIsCheck2_usingPolicy(false);
      setIsCheck3_personalInfo(false);
      setIsCheck4_contentsRestrict(false);
      setIsCheck5_infoToOthers(false);
    } else {
      setIsAllCheck(true);
      setIsCheck1_upAge14(true);
      setIsCheck2_usingPolicy(true);
      setIsCheck3_personalInfo(true);
      setIsCheck4_contentsRestrict(true);
      setIsCheck5_infoToOthers(true);
    }
  };

  // 회원가입하기
  const handleSignup = () => {
    
    if (isCheck1_upAge14 && isCheck2_usingPolicy && isCheck3_personalInfo && isCheck4_contentsRestrict) {
      axios
        .post(`${MainURL}/login/logisterdo`, {
          userAccount: userAccount,
          userNickName: userNickName,
          userURL: userURL,
          checkUpAge14: isCheck1_upAge14,
          checkUsingPolicy: isCheck2_usingPolicy,
          checkPersonalInfo: isCheck3_personalInfo,
          checkContentsRestrict: isCheck4_contentsRestrict,
          checkInfoToOthers: isCheck5_infoToOthers,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            AsyncSetItem(refreshToken, userAccount, userNickName, userURL, city, county);
            props.navigation.navigate('Result', {nickName : userNickName});
          } else {
            Alert.alert('다시 시도해 주세요.');
          }
        })
        .catch(() => {
          console.log('실패함');
        });
    } else {
      Alert.alert('필수 약관에 동의해주세요.');
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
          <View style={{marginTop:10}}>
            <AgreeBox choice={'[필수]'} text={'만 14세 이상입니다.'} view={''} isCheck={isCheck1_upAge14} setIsCheck={setIsCheck1_upAge14}link=''/> 
            <AgreeBox choice={'[필수]'} text={'위치정보 서비스 이용 약관에 동의합니다.'} view={'보기'} isCheck={isCheck2_usingPolicy} setIsCheck={setIsCheck2_usingPolicy} 
              link='https://www.ashow.co.kr/usingpolicy.html'/>
            <AgreeBox choice={'[필수]'} text={'개인정보 수집 및 이용에 동의합니다.'} view={'보기'} isCheck={isCheck3_personalInfo} setIsCheck={setIsCheck3_personalInfo} 
              link='http://www.ashow.co.kr/personalinfo.html'/>
            <AgreeBox choice={'[필수]'} text={'유해 컨텐츠에 대한 제재에 동의합니다.'} view={''} isCheck={isCheck4_contentsRestrict} setIsCheck={setIsCheck4_contentsRestrict} link=''/>
            <AgreeBox choice={'[선택]'} text={'개인정보 제3자 제공에 동의합니다.'} view={''} isCheck={isCheck5_infoToOthers} setIsCheck={setIsCheck5_infoToOthers} link=''/>
            
            <View style={styles.divider}></View>

            <View style={styles.allCheckbox}>
              <TouchableOpacity 
                  onPress={handleAllAgree}
                >
                { isAllCheck ? <AntDesign name="checkcircle" size={24} color="#333" style={styles.checkboxicon} />
                : <AntDesign name="checkcircle" size={20} color="#8C8C8C" style={styles.checkboxicon} /> }
              </TouchableOpacity>
              <Text style={styles.allCheckboxText}>모든 약관에 동의합니다.</Text>
            </View>      
          </View>
          
        </View>
      </View>
      <View style={{paddingHorizontal:24}}>
        <TouchableOpacity 
          onPress={handleSignup}
          style={
            isCheck1_upAge14 && isCheck2_usingPolicy && isCheck3_personalInfo && isCheck4_contentsRestrict
            ? [styles.nextBtnBox, { backgroundColor: '#E8726E'}] 
            : [styles.nextBtnBox, { backgroundColor: '#F0A3A1'}]
          }
          >
          <Text style={styles.nextBtnText}>가입하기</Text>
        </TouchableOpacity>
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
    width: 50,
    height: 50,
    marginBottom: 12,
    alignItems: 'center',
    justifyContent: 'center',
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
  checkboxItem: {
    height: 30,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  checkboxContent: {
    flexDirection: 'row',
    marginVertical: 3
  },
  checkboxicon: {
    marginRight: 10
  },
  checkboxText: {
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
