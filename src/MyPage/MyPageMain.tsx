import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncGetItem from '../AsyncGetItem'

function MyPageMain (props: any) {

  // AsyncGetData
  const [asyncGetData, setAsyncGetData] = useState<any>({});
  const asyncFetchData = async () => {
    try {
      const data = await AsyncGetItem();
      setAsyncGetData(data);
    } catch (error) {
      console.error(error);
    }
  };
  
  useEffect(() => {
    asyncFetchData();
  }, []);
  

  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('nickname');
    AsyncStorage.removeItem('URL');
    Alert.alert('로그아웃 되었습니다.');
    props.navigation.replace("Navi_Login")
  };

  const deleteAccount = () => {
    props.navigation.navigate("회원 탈퇴")
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.profileContainer}>

        <View style={styles.titleBox}>
          <View style={styles.titleTopIcon}> 
            <TouchableOpacity 
              onPress={() => {
                  // props.navigation.navigate('상담내역');
              }}
              >
              <Text><AntDesign name="setting" size={20} color="black" /></Text>
            </TouchableOpacity>
          </View>
          <View style={styles.titleMainTextBox}> 
            <Text style={{fontSize: 20, marginBottom: 10}}>안녕하세요!</Text>
            <Text style={styles.userName}>{asyncGetData.userNickName}님</Text>  
          </View>
        </View> 
        

        <View style={styles.linkbuttonBox}>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('상담내역');
            }}
            style={styles.linkbutton}
            >
            <View style={styles.linkbuttonContent}>
              <Image source={require('../images/mypage/favor.png')} style={styles.image}/> 
              <Text style={{fontSize: 13, marginTop: 8}}>관심단지</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('알림');
            }}
            style={styles.linkbutton}
            >
            <View style={styles.linkbuttonContent}>
              <Image source={require('../images/mypage/alram.png')} style={styles.image}/> 
              <Text style={{fontSize: 13, marginTop: 8}}>알림</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity 
            onPress={() => {
              props.navigation.navigate('관심단지');
            }}
            style={styles.linkbutton}
            >
            <View style={styles.linkbuttonContent}>
              <Image source={require('../images/mypage/chat.png')} style={styles.image}/> 
              <Text style={{fontSize: 13, marginTop: 8}}>상담내역</Text>
            </View>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          onPress={() => { 
            props.navigation.navigate('히스토리');
          }}
           style={styles.historyBox}
          >
          <View style={styles.historyText}>
            <Text style={{fontSize: 18, color: 'white', marginBottom: 7}}>상담내역</Text>
            <Text style={{fontSize: 12, color: 'white'}}>최근 본 단지와 게시물을 확인하세요!</Text>
          </View>
          <AntDesign name="right" size={15} color="white"/>
        </TouchableOpacity>
        
      </View> 

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>서비스 설정</Text>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          props.navigation.navigate('알림설정');
        }}>
          <Text style={styles.bottomButtonText}>알림 설정</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>관심정보 수정하기</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>회원정보 수정</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>공지사항</Text>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          props.navigation.navigate('공지사항');
        }}>
          <Text style={styles.bottomButtonText}>아쇼 공지사항</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>1:1 문의하기</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>광고 및 제휴 문의</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>불편사항 신고하기</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>자주 묻는 질문</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomTitle}>약관/운영정책</Text>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{

        }}>
          <Text style={styles.bottomButtonText}>서비스 이용 약관</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>개인정보 처리방침</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomButton} onPress={()=>{
          
        }}>
          <Text style={styles.bottomButtonText}>버전 정보</Text>
          <AntDesign name="right" size={15} color="black" />
        </TouchableOpacity>
      </View>
      
      <TouchableOpacity
        hitSlop={{ top: 15, bottom: 15 }}
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Text style={styles.logoutButtonText}>로그아웃</Text>
      </TouchableOpacity> 

      <TouchableOpacity
        hitSlop={{ top: 15, bottom: 15 }}
        style={styles.deleteAccountContainer}
        onPress={deleteAccount}
      >
        <Text style={styles.deleteAccountText}>회원탈퇴를 하시려면 여기를 눌러주세요</Text>
      </TouchableOpacity> 

      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },
  titleBox: {
    height: 150,
    alignItems: 'center',
    paddingTop: 20,
  },
  titleTopIcon : {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  titleMainTextBox: {
    flex:1,
    width: 300,
    justifyContent: 'center'
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  
  // linkbuttonBox
  linkbuttonBox: {
    width: '100%',
    height: 120,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  linkbutton: {
    width: 100,
    height: 100,
    margin: 20,
    backgroundColor: '#FCFCFC',
    shadowColor: 'gray',
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  linkbuttonContent: {
    width: 55,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: 23,
    height: 28,
    resizeMode: 'contain'
  },
  historyBox: {
    marginTop: 16,
    width: 342,
    height: 72,
    backgroundColor: '#E8726E',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18
  },
  historyText: {
    flex: 1
  },

  
  // bottomContainer
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
  bottomTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bottomButton: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 35
  },
  bottomButtonText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: '#555',
  },
  logoutButton: {
    padding: 10,
    borderRadius: 5,
    margin: 20,
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoutButtonText: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline'
  },

  deleteAccountContainer : {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginRight: 20,
    height: 50
  },
  deleteAccountText: {
    color: 'gray',
    textDecorationLine:'underline',
    fontSize: 12
  }
});

export default MyPageMain;
