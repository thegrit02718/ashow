import React,{useState, useEffect} from "react";
import { View,Image, Modal,Text,TouchableOpacity, Dimensions } from "react-native";
import Layout from "../Components/Layout";
import { Typography } from "../Components/Typography";
import { Alert } from "react-native";
import { StyleSheet, TextInput, } from "react-native";
import {useRoute } from '@react-navigation/native'
import { Divider } from "../Components/Divider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EditNicknameModal from "./EditNicknameModal";
import ResidenceEditModal from "./ResidenceEditModal";
import LogoutModal from "./LogoutModal";
import AsyncGetItem from "../AsyncGetItem";

export interface UserProfileProps{
    userNickName:string;
    address: string;
} 


export default function EditProfile(props:any){ 
  const route : any = useRoute();
  const {userInfo} = route.params;
 
  // 버튼의 활성화 여부 상태 변수
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const [userData,setUserData] = useState<UserProfileProps>({
    userNickName: userInfo.userNickName,
    address: userInfo.userAddress ?? ""
  })
  const [modalPopup,setModalPopup] = useState({
    editNickNameModol: false,
    residenceModal:false,
    logoutModal: false,
  })
 console.log(userData,'userData')
  const { width } = Dimensions.get('window');
  const subtractedWidth = width - 136;
   
 
   
 const [asyncGetData, setAsyncGetData] = useState<any>({});
  
  
  const toggleModal = (modalType: string): void => {
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
  const saveEventHandler = () =>{
        Alert.alert('click');
  
  }

    return (
        <View style={styles.wrapper}>
           <View style={{marginTop:24}}>
                
                <Typography fontSize={16}>기본정보</Typography>    
                
                <View style={{marginTop: 24}}>
                    <View style={[styles.flexContainer,{alignItems:"flex-start"}]}>
                        <View style={styles.titleContainer}>
                            <Typography fontSize={16} fontWeight="normal" color="#1B1B1B">닉네임</Typography>
                        </View>
                        <TouchableOpacity  onPress={()=> toggleModal('editNickname')}>
                            <View style={[styles.inputContainer,styles.bolder,{width: subtractedWidth}]}>
                                <Typography fontSize={16} fontWeight="normal">{userData.userNickName}</Typography>

                                <MaterialCommunityIcons name="pencil" size={16} color="#C1C1C1"  style={{width:14,height:16}}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                 
                    <View style={{flexDirection:'row',marginTop:24}}>
                        <View style={styles.titleContainer}>
                            <Typography fontSize={16} fontWeight="normal" color="#1B1B1B">계정 정보</Typography>
                        </View>
                        <View style={[{width: subtractedWidth}]}>
                            <View style={[styles.inputContainer,{marginBottom:8}]} >
                                <View style={{borderRadius:4, backgroundColor:"#FDE500", padding:5, marginRight:8}}>
                                    <Image source={icon} style={{width:15,height:15}} />
                                </View>
                                <Typography fontSize={12} fontWeight="bold" color="#000" marginBottom={0}>{userInfo.userAccount}</Typography>
                            </View>
                            <Typography fontSize={12} fontWeight="bold" color="#8B8B8B">SNS 간편 로그인 시 이메일 수정이 불가능합니다.</Typography>
                        </View>
                    </View>
                </View>
           </View>     
           <Divider marginVertical={32}/>
           <View >
                <View style={{flexDirection:'row',alignItems:"baseline"}}>
                    <View style={{marginRight:12}}>
                        <Typography fontSize={16}>추가정보</Typography>
                    </View>
                    <Typography fontSize={12}color="#6F6F6F">멘트추가</Typography>
                </View>
                <View style={{marginTop: 24}}>
                    <View style={[styles.flexContainer,{alignItems:"flex-start"}]}>
                        <View style={styles.titleContainer}>
                            <Typography fontSize={16} fontWeight="normal" color="#1B1B1B">거주지역</Typography>
                        </View>
                        <TouchableOpacity  onPress={()=> toggleModal('residence')}>
                            <View style={[styles.inputContainer, styles.bolder,{width:subtractedWidth}]}>
                                <Typography fontSize={14} fontWeight="normal" color="#6F6F6F">{userData.address?? '거주지역을 선택해주세요'}</Typography>
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
                <TouchableOpacity  onPress={()=> saveEventHandler()}  disabled={!isButtonEnabled}>
                    <View style={styles.saveButton}>
                        <Typography fontSize={14} color="#F0A3A1" fontWeight="normal" marginBottom={2}>저장하기</Typography>
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
        paddingHorizontal: 24,
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
        position: "absolute",
        bottom:20,
        left:24,
        width:"100%"
    }
    ,
    saveButton:{
        borderWidth:0.5,
        borderColor: "#C1C1C1",
        width:"100%",
        paddingVertical: 15,
        borderRadius:6,
        alignItems:"center",
      
      
    }
})