import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AsyncGetItem from '../AsyncGetItem'
import { Typography } from '../Components/Typography';
import { TouchableWithoutFeedback } from 'react-native';
import Layout  from '../Components/Layout';
import { Divider } from '../Components/Divider';
import LinkItem from '../Components/LinkItem';
import MenuItem from '../Components/MenuItem';


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
  
  const menuData = [
    { key: '1', source: require("../images/mypage/buildings.png"), name: "매물" },
    { key: '2', source: require("../images/mypage/guide.png"), name: "부동산 가이드" },
    { key: '3', source: require("../images/mypage/calculator.png"), name: "세금 계산기" },
    { key: '4', source: require("../images/mypage/method.png"), name: "아쇼 사용법" },
    { key: '5', source: require("../images/mypage/enroll.png"), name: "아파트 등록 요청" },
  ];
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <Layout>
          <View style={styles.titleBox}>
            <View style={styles.titleMainTextBox}> 
              <Typography fontSize={20} fontWeightIdx={2} marginBottom={8}>안녕하세요!</Typography>
              <Typography fontSize={28}>{asyncGetData.userNickName}님</Typography>  
            </View>
            {/* <TouchableWithoutFeedback onPress={()=> props.navigation.navigate('EditProfile', {userInfo: asyncGetData})} > 
              <View style={styles.profileEditBtn}>
                <Typography fontSize={12} color="#595959">프로필 편집하기 </Typography>
                <MaterialIcons name="keyboard-arrow-right" size={20} color="#595959" style={{marginTop:2}} />
              </View>
            </TouchableWithoutFeedback> */}
          </View> 
          
          <View style={styles.linkbuttonBox}>
            <TouchableOpacity 
              onPress={() => {
                props.navigation.navigate('FavorList', {userAccount : asyncGetData.userAccount});
              }}
              style={styles.linkbutton}
              >
              <View style={styles.linkbuttonContent}>
                <Image source={require('../images/mypage/favor.png')} style={styles.image}/> 
                 <Typography fontSize={14}>관심단지</Typography>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                props.navigation.navigate("Navi_Notifi", {screen:"Notification"});
              }}
              style={styles.linkbutton}
              >
              <View style={styles.linkbuttonContent}>
                <Image source={require('../images/mypage/alram.png')} style={styles.image}/> 
                <Typography fontSize={14}>알림</Typography>
              </View>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                props.navigation.navigate('TalkList');
              }}
              style={styles.linkbutton}
              >
              <View style={styles.linkbuttonContent}>
                <Image source={require('../images/mypage/chat.png')} style={styles.image}/> 
                <Typography fontSize={14}>상담 내역</Typography>
              </View>
            </TouchableOpacity>
           </View>

          <TouchableOpacity 
            onPress={() => { 
              props.navigation.navigate('History', {userAccount : asyncGetData.userAccount});
            }}
            style={styles.historyBox}
            >
            <View style={styles.historyText}>
              <Typography fontSize={18} color='white' marginBottom={8}>히스토리</Typography>
              <Text style={{fontSize: 12, color: 'white'}}>최근 본 단지와 게시물을 확인하세요!</Text>
            </View>
            <AntDesign name="right" size={15} color="white"/>
          </TouchableOpacity>
        </Layout>
       
        {/* <Divider marginVertical={24}/> */}
        {/* <View style={{ width:"100%",flexDirection:"row" ,flexWrap: 'wrap', justifyContent:"space-between",paddingHorizontal:24,}}>
        {menuData.map(item=>{
          return <MenuItem key={item.key} name={item.name} source={item.source} />
        })}
        </View> */}
          
        <Divider marginVertical={32} height={8}/>

        <Layout>
          <Typography fontSize={20}>서비스 설정</Typography>
          <View style={{marginTop:32}}>
            <LinkItem text="알림 설정" onPress={()=>props.navigation.navigate('Navi_Notifi', {screen: 'NotificationSetting'})}/>
            <LinkItem text="프로필 설정" onPress={()=>props.navigation.navigate('EditProfile', {userInfo : asyncGetData})}/>
          </View>
          <Divider marginVertical={32}/>
          <View>
            <Typography fontSize={20}>고객센터</Typography> 
            <View style={{marginTop:32}}>
              <LinkItem accent text="공지사항" onPress={()=>props.navigation.navigate('Notice')}/>
              <LinkItem accent text="1:1 문의하기" onPress={()=>props.navigation.navigate('Question')}/>
              <LinkItem text="사업 제휴 및 광고 문의" onPress={()=> props.navigation.navigate('Advertising')}/>
              <LinkItem text="사업자 정보" onPress={()=> props.navigation.navigate('BusinessInfo')}/>
            </View>
            </View>
            <Divider marginVertical={32}/>
            <View style={{}}>
              <Typography fontSize={20}>약관 및 운영정책</Typography>
              <View style={{marginTop:32}}>
                <LinkItem text="약관 및 서비스 이용 동의" onPress={()=>props.navigation.navigate('Policy')}/>
                <LinkItem text="개인정보 처리 방침" onPress={()=> props.navigation.navigate('PersonInfo')}/>          
                <LinkItem text="버전정보" onPress={()=> props.navigation.navigate('VersionInfo')}/>
              </View>
          </View>
          <TouchableOpacity
            hitSlop={{ top: 15, bottom: 15 }}
            style={styles.deleteAccountContainer}
            onPress={()=>{
              props.navigation.navigate("DeleteAccount");
            }}
          >
            <Text style={styles.deleteAccountText}>회원탈퇴를 하시려면 여기를 눌러주세요</Text>
          </TouchableOpacity> 
        </Layout>
      </ScrollView>
    </View>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
 
  titleIcon:{
    width:24,
    height:24,
    position:"absolute",
    right:24,
    transform: [{translateY: 16}],
  },
  titleBox: {
    
    flexDirection:"row",
    alignItems: 'flex-end',
    justifyContent:"space-between"
    
  },
  titleTopIcon : {
    width: 300,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  titleMainTextBox: {
    flex:1,
    alignItems: "flex-start",
    justifyContent: 'center'
  },
 
  
  // linkbuttonBox
  linkbuttonBox: {
    width: '100%',
    height: 120,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    marginTop:21,
  },
  linkbutton: {
    width: 100,
    height: 100,
    margin: 20,
    backgroundColor: '#FCFCFC',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    shadowColor: 'gray',
  },
  linkbuttonContent: {
    width: 66,
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
   
    width: "100%",
    height: 72,
    backgroundColor: '#E8726E',
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    
  },
  historyText: {
    flex: 1
  },

  profileEditBtn:{
    flexDirection:"row", 
    alignItems:"center",
    borderBottomWidth: 1,
    borderColor:"#595959",  
  },
 
  // bottomContainer
  bottomContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 24,
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
  },
  bottomButtonText: {
    flex: 1,
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
  },
  columnWrapper:{
    flex:1,
    justifyContent:"space-between",
   
  }
});

export default MyPageMain;