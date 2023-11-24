import React, { useState } from 'react';
import { View,Image,Text,TouchableOpacity, Dimensions } from "react-native";
import { Typography } from "../Components/Typography";
import { Alert } from "react-native";
import { StyleSheet, } from "react-native";
import {useRoute } from '@react-navigation/native'
import { Divider } from "../Components/Divider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EditNicknameModal from "./EditNicknameModal";
import ResidenceEditModal from "../Components/ResidenceEditModal";
import LogoutModal from "./LogoutModal";
import { SubTitle } from '../Components/SubTitle';
import axios from 'axios';
import MainURL from "../../MainURL";


export interface UserProfileProps{
    userNickName:string;
    address: string;
    isChange: boolean;
} 

export default function EditProfile(props:any){ 
  const route : any = useRoute();
  const {userInfo} = route.params;
 
  const [userData,setUserData] = useState<UserProfileProps>({
    userNickName: userInfo.userNickName,
    address: userInfo.userAddress ?? "",
    isChange: false,
  })
  const [modalPopup,setModalPopup] = useState({
    editNickNameModol: false,
    residenceModal:false,
    logoutModal: false,
  })
 
  const { width } = Dimensions.get('window');
  const subtractedWidth = width - 136;
 

  const toggleModal = (modalType: string ): void => {
    switch (modalType) {
        case 'editNickname':
            setModalPopup((prev)=>({...prev, editNickNameModol:!modalPopup.editNickNameModol}));
            break;
        case 'residence':
            setModalPopup((prev)=>({...prev, residenceModal:!modalPopup.residenceModal}));
       
            break;
        case 'logout':
            setModalPopup((prev)=>({...prev, logoutModal:!modalPopup.logoutModal}));
            break;  
        default:
            break;
    }
   }
  

  let icon, url;
  switch (userInfo.userURL) {
    case 'kakao':
      icon = require('../images/login/iconkakao.png'),
      url = '카카오톡';
      break;
    case 'google':
      icon = require('../images/login/icongoogle.png'),
      url = '구글';
      break;
    case 'naver':
      icon = require('../images/login/iconnaver.png'),
      url = '네이버';
      break;
  }
  
  const handleLogout = () => {
    AsyncStorage.removeItem('token');
    AsyncStorage.removeItem('account');
    AsyncStorage.removeItem('name');
    AsyncStorage.removeItem('nickname');
    AsyncStorage.removeItem('URL');
    Alert.alert('로그아웃 되었습니다.');
    props.navigation.replace("Navi_Login")
  };



  const saveEventHandler = async() =>{
    await AsyncStorage.setItem('address', userData.address);
    await AsyncStorage.setItem('nickname',userData.userNickName);
    
    axios
      .post(`${MainURL}/login/logisterdo`, {
        userAccount : userInfo.userAccount,
        // city:
        // county:
      })
      .then((res) => {
        
      })
      .catch(() => {
        console.log('실패함');
      });


    Alert.alert('저장되었습니다.');
    props.navigation.replace('메인');
  }

    return (
        <View style={styles.wrapper}>
            <SubTitle title='프로필 편집' navigation={props.navigation}/>
           <View style={{marginTop:24, paddingHorizontal: 24,}}>
                
                <Typography fontSize={16}>기본정보</Typography>    
                
                <View style={{marginTop: 24}}>
                    <View style={[styles.flexContainer,{alignItems:"flex-start"}]}>
                        <View style={styles.titleContainer}>
                            <Typography fontSize={16} fontWeightIdx={2} color="#1B1B1B">닉네임</Typography>
                        </View>
                        <TouchableOpacity  onPress={()=> toggleModal('editNickname')}>
                            <View style={[styles.inputContainer,styles.bolder,{width: subtractedWidth}]}>
                                <Typography fontSize={16} fontWeightIdx={2}>{userData.userNickName}</Typography>

                                <MaterialCommunityIcons name="pencil" size={16} color="#C1C1C1"  style={{width:14,height:16}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                 
                    <View style={{flexDirection:'row',marginTop:24}}>
                        <View style={styles.titleContainer}>
                            <Typography fontSize={16} fontWeightIdx={2} color="#1B1B1B">계정 정보</Typography>
                        </View>
                        <View style={[{width: subtractedWidth}]}>
                            <View style={[styles.inputContainer,{marginBottom:8}]} >
                                <View style={{borderRadius:4, backgroundColor:"#FDE500", padding:5, marginRight:8}}>
                                    <Image source={icon} style={{width:15,height:15}} />
                                </View>
                                <Typography fontSize={12}  color="#000" marginBottom={0}>{userInfo.userAccount}</Typography>
                            </View>
                            <Typography fontSize={12} color="#8B8B8B">SNS 간편 로그인 시 이메일 수정이 불가능합니다.</Typography>
                        </View>
                    </View>
                </View>
           </View>     
           <Divider marginVertical={32}/>
           <View style={{paddingHorizontal: 24, flex:1}}>
                <View style={{flexDirection:'row',alignItems:"baseline"}}>
                    <View style={{marginRight:12}}>
                        <Typography fontSize={16}>추가정보</Typography>
                    </View>
                    <Typography fontSize={12}color="#6F6F6F">멘트추가</Typography>
                </View>
                <View style={{marginTop: 24}}>
                    <View style={[styles.flexContainer,{alignItems:"flex-start"}]}>
                        <View style={styles.titleContainer}>
                            <Typography fontSize={16} fontWeightIdx={2} color="#1B1B1B">거주지역</Typography>
                        </View>
                        <TouchableOpacity  onPress={()=> toggleModal('residence')}>
                            <View style={[styles.inputContainer, styles.bolder,{width:subtractedWidth}]}>
                                <Typography fontSize={14} fontWeightIdx={2} color="#6F6F6F">{userData.address?? '거주지역을 선택해주세요'}</Typography>
                                <SimpleLineIcons name="arrow-down" size={16} color="#C1C1C1"  style={{width:24,height:16}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={()=>toggleModal('logout')} >
                    <View  style={styles.logoutButton}>
                        <Text style={{textDecorationLine: 'underline', fontSize:12}}>로그아웃</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity  onPress={ saveEventHandler}  disabled={!userData.isChange}>
                    <View style={[styles.saveButton, userData.isChange ? styles.enabled : styles.disabled]}>
                        <Typography fontSize={14} color="#fff" marginBottom={2}>저장하기</Typography>
                    </View>
                </TouchableOpacity>
            </View>
            <LogoutModal visible={modalPopup.logoutModal} toggle={()=> toggleModal('logout')} logout={handleLogout}/>
            <EditNicknameModal nickname={userInfo.userNickName} setUserData={setUserData} visible={modalPopup.editNickNameModol} toggle={()=>toggleModal('editNickname')} />
            <ResidenceEditModal visible={modalPopup.residenceModal} setUserData={setUserData} toggle={() => toggleModal('residence') }/>
        </View>
    )
}

 

const styles = StyleSheet.create({
    wrapper:{
        backgroundColor: '#fff',
        flex:1,
    },
    flexContainer: {
        flexDirection:"row",   
        alignItems:"center",
        width:"100%"
    },
    titleContainer:{
        width:"18%",marginRight:18
    },
  
    inputContainer:{
        flexDirection:'row',
        alignItems:'center',
    },
    bolder:{
        borderBottomWidth:1, borderColor: "#DFDFDF",justifyContent:"space-between",paddingHorizontal:8, paddingBottom:8},
    logoutButton:{
        textDecorationLine: 'underline',
        borderColor:"#555",
        justifyContent:"center",
        alignItems:"center",
        width:"100%",
        marginBottom:30
    },
    buttonContainer:{
        width:"100%",
        padding: 24
    }
    ,
    saveButton:{
        width:"100%",
        paddingVertical: 15,
        borderRadius:6,
        alignItems:"center",
    },
    enabled:{
        backgroundColor:"#E8726E",
    },
    disabled:{
        backgroundColor:"#DFDFDF"
    }
})