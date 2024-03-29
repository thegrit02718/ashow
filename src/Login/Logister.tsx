import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import { getStatusBarHeight } from "react-native-status-bar-height";
import Feather from 'react-native-vector-icons/Feather';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import axios from 'axios';
import MainURL from "../../MainURL";
import { Typography } from '../Components/Typography';

function Logister (props : any) {

  const [routeData, setRouteData] = useState({});
  
  const navi_dataSet = () => {
    if(props.route.params === null || props.route.params === undefined) {
      return
    } else {
      const copy = props.route.params.data;
      setRouteData(copy);
    }
  }

  const generateRandomNickName = async () => {
    const list = ["아쇼", "아파트", "분양", "부동산"]
    const randomIndex = Math.floor(Math.random() * list.length);
    const randomNumber = `${Math.floor(Math.random() * 1000000)}`;
    const randomNickName = `${list[randomIndex]}${randomNumber}`;
    try {
      const res = await axios.post(`${MainURL}/login/nicknamecheck`, {
        userNickName : randomNickName
      });
      if (res.data) {
        generateRandomNickName();
      } else {
        setUserNickName(randomNickName);
        setCountText(randomNickName.length);
        setErrorMessageNickName('랜덤 추천 닉네임을 사용해보세요');
      }
    } catch (error) {
      console.error('랜덤 생성 닉네임 중복 확인 중 에러 발생:', error);
    }
  };

  useEffect(()=>{
    navi_dataSet();
    generateRandomNickName();
  }, [])


  const [userNickName, setUserNickName] = useState('');
  const [isUserNickName, setIsUserNickName] = useState<boolean>(true);
  const [errorMessageNickName, setErrorMessageNickName] = useState<string>('');
  const [countText, setCountText] = useState<number>(0);

  const onChangeUserNickName = (text : string) => {
    setUserNickName(text);
    const copy = text.length;
    setCountText(copy);

    if (text.length >= 2 && text.length <= 10 && text !== '') {
      setIsUserNickName(true)
      setErrorMessageNickName('올바른 형식의 닉네임입니다');
    } else {
      setIsUserNickName(false)
      setErrorMessageNickName('닉네임은 최소 2자 이상 10자 이하로 사용 가능합니다');
    }
  };

  const nickNameTextCancel = () => {
    setUserNickName('');
    setIsUserNickName(false);
    setCountText(0);
    setErrorMessageNickName('');
  };


  const isValidUserName = async ()=>{
    try{
      if (userNickName !== '' && userNickName.length >= 2 && userNickName.length <= 10 ) {
        const res = await axios.post(`${MainURL}/login/nicknamecheck`, {
          userNickName : userNickName
        });
        if (res.data) {
          setErrorMessageNickName('이미 사용 중입니다. 다른 닉네임을 시도해 주세요.');
          setIsUserNickName(false);
        } else {
          setErrorMessageNickName('사용 가능한 닉네임입니다.');
          setIsUserNickName(true);
        }
      } else if (userNickName === '') {
        setErrorMessageNickName('빈칸을 입력해주세요');
        setIsUserNickName(false);
      } else if (userNickName.length < 2 || userNickName.length > 10) {
        setErrorMessageNickName('글자수가 최소 2자 이상 10자 이하여야 합니다');
        setIsUserNickName(false);
      }
    } catch (error){
        console.log(error);
    }
  }

  const moveAgreePage = () => {
    if (userNickName && isUserNickName) {
      const updatedData = { ...routeData, nickName: userNickName };
      props.navigation.navigate('Agree', { data: updatedData });
    } else {
      Alert.alert('올바른 형식으로 입력해주세요');
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.progressBarBox}>
        <View  style={styles.progressBar}>
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
        
        <>
          <Typography fontSize={24} marginBottom={5} fontWeightIdx={2}>안녕하세요!</Typography>
          <Typography fontSize={24} marginBottom={5} fontWeightIdx={2}>아쇼에서 사용하실</Typography>
          <Typography fontSize={24} marginBottom={30}  fontWeightIdx={2} >
            <Typography fontSize={24}>닉네임</Typography>을 입력해주세요.
          </Typography>
        </>

        {/* 닉네임 */}
        <View style={{flex:1}}>
          <View style={styles.inputFieldRow}>
            <TextInput
              style={styles.inputFieldText}
              placeholder="예) 아쇼123"
              placeholderTextColor="#8C8C8C"
              onChangeText={onChangeUserNickName}
              defaultValue={userNickName}
              onEndEditing={isValidUserName}
            />
            {userNickName ?
            <View style={styles.inputFieldButton}>
              <View style={styles.inputFieldCheck}>
              {isUserNickName ? <Entypo name="check" size={24} color="black" style={{color: 'green'}}/>
                : <AntDesign name="warning" size={20} color="red" />}
              </View>
              <TouchableOpacity 
                style={styles.inputFieldCancel}
                onPress={nickNameTextCancel}
                >
                <Text style={{ fontSize: 20}}>
                  <Feather name="x" size={24} color="black" /> 
                </Text> 
              </TouchableOpacity>
            </View>
            : null
            }
          </View>
          <View style={styles.inputHelperCounter}>
            <Text style={isUserNickName ? styles.successText : styles.errorText}>
              <Text>{errorMessageNickName}</Text>
            </Text>  
            <Text>{countText}/10</Text>
          </View>
        </View>
        <TouchableOpacity 
          onPress={moveAgreePage}
          style={
            isUserNickName
            ? [styles.nextBtnBox, { backgroundColor: '#E8726E'}] 
            : [styles.nextBtnBox, { backgroundColor: '#F0A3A1'}] 
          }>
          <Text style={styles.nextBtnText}>다음</Text>
        </TouchableOpacity>
      </View> 
    </View>
  );
};

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
    width: '50%',
    height: 6,
    backgroundColor: '#F0A3A1',
  },
  mainContainer: {
    flex: 1,
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
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  inputFieldTitle: {
    height: 30,
    fontSize: 20,
    fontWeight: '400',
  },
  inputFieldRow: {
    flexDirection: 'row'
  },
  inputFieldText : {
    flex:1,
    height: 50,
    fontSize: 18,
    fontWeight: '400',
    borderBottomWidth: 1,
    borderColor: '#DFDFDF',
  },
  inputFieldButton: {
    flexDirection: 'row'
  },
  inputFieldCancel : {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFieldCheck: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHelperCounter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    color: '#555',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
  successText: {
    color: 'green',
    fontSize: 12,
    marginTop: 5,
  },
  nextBtnBox: {
    backgroundColor: '#F0A3A1',
    borderRadius: 16,
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

export default Logister;
