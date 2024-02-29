import React, { useEffect, useState } from 'react';
import { View,Image,Text,TouchableOpacity, Dimensions, Modal } from "react-native";
import { Typography } from "../Components/Typography";
import { Alert } from "react-native";
import { StyleSheet, } from "react-native";
import {useRoute } from '@react-navigation/native'
import { Divider } from "../Components/Divider";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import EditNicknameModal from "./EditNicknameModal";
import EditResidenceModal from "./EditResidenceModal";
import { SubTitle } from '../Components/SubTitle';
import axios from 'axios';
import MainURL from "../../MainURL";

export interface UserProfileProps{
	userNickName: string;
  city: string;
	county: string;
} 

export default function EditProfile(props:any){ 
    
  const route : any = useRoute();
	const userInfo = route.params.userInfo;
	const userAccount = route.params.userInfo.userAccount;
	const [userData, setUserData] = useState<UserProfileProps | null>(null);
	const [isChanged, setIsChanged] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const fetchPosts = () => {
    axios.get(`${MainURL}/mypage/getprofile/${userAccount}`).then((res) => {
			setUserData(res.data[0]);
    });
  };

	useEffect(() => {
    fetchPosts();
  }, [refresh]);

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
  
  const handleEditProfile = async() =>{
		if (isChanged) {
			axios
      .post(`${MainURL}/mypage/editprofile`, {
        userAccount : userInfo.userAccount,
				userNickName: userData?.userNickName,
        city: userData?.city,
        county: userData?.county
      })
      .then(async (res) => {
        setRefresh(!refresh);
				if (userData) {
					await AsyncStorage.setItem('city', userData.city);
					await AsyncStorage.setItem('county', userData.county);
					await AsyncStorage.setItem('nickname', userData.userNickName);
				}
				Alert.alert('수정되었습니다', '', [
					{ text: '확인', onPress: () => props.navigation.goBack() }
				]);
      })
      .catch(() => {
				Alert.alert('다시 시도하세요');
      });
		} else {
			return
		}
  }

	const handleLogout = () => {
		Alert.alert('로그아웃 하시겠습니까?', '', [
			{ text: '취소', onPress: () => { return }},
			{ text: '확인', onPress: () => {
				AsyncStorage.removeItem('token');
				AsyncStorage.removeItem('account');
				AsyncStorage.removeItem('name');
				AsyncStorage.removeItem('nickname');
				AsyncStorage.removeItem('URL');
				AsyncStorage.removeItem('city');
				AsyncStorage.removeItem('county');
				Alert.alert('로그아웃 되었습니다.');
				props.navigation.replace("Navi_Login")
			}}
		]);
  };

	const [isEditNickNameModalVisible, setEditNickNameModalVisible] = useState(false);
  const editNickNameToggleModal = () => {
    setEditNickNameModalVisible(!isEditNickNameModalVisible);
  }; 

	const [isEditLocationModalVisible, setEditLocationModalVisible] = useState(false);
  const editLocationToggleModal = () => {
    setEditLocationModalVisible(!isEditLocationModalVisible);
  }; 
  

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
						<TouchableOpacity  onPress={editNickNameToggleModal}>
							<View style={[styles.inputContainer,styles.bolder,{width: subtractedWidth}]}>
								<Typography fontSize={16} fontWeightIdx={2}>{userData?.userNickName}</Typography>
								<MaterialCommunityIcons name="pencil" size={16} color="#C1C1C1"  style={{width:14,height:16}}/>
							</View>
						</TouchableOpacity>
					</View>
						
					<View style={{flexDirection:'row',marginTop:24}}>
						<View style={styles.titleContainer}>
							<Typography fontSize={16} fontWeightIdx={2} color="#1B1B1B">계정</Typography>
						</View>
						<View style={[{width: subtractedWidth}]}>
							<View style={[styles.inputContainer,{marginBottom:8}]} >
								<View style={{borderRadius:4, backgroundColor:"#FDE500", padding:5, marginRight:8}}>
									<Image source={icon} style={{width:15,height:15}} />
								</View>
								<Typography fontSize={12}  color="#000" marginBottom={0}>{userInfo.userAccount}</Typography>
							</View>
							{/* <Typography fontSize={12} color="#8B8B8B">SNS 간편 로그인 시 이메일 수정이 불가능합니다.</Typography> */}
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
					{/* <Typography fontSize={12}color="#6F6F6F">멘트추가</Typography> */}
				</View>
				<View style={{marginTop: 24}}>
					<View style={[styles.flexContainer,{alignItems:"flex-start"}]}>
						<View style={styles.titleContainer}>
							<Typography fontSize={16} fontWeightIdx={2} color="#1B1B1B">거주지역</Typography>
						</View>
						<TouchableOpacity  onPress={editLocationToggleModal}>
							<View style={[styles.inputContainer, styles.bolder,{width:subtractedWidth}]}>
								<Typography fontSize={14} fontWeightIdx={2} color="#6F6F6F">
									{userData?.city === 'undefined' || userData?.county === 'undefined' ? '거주지역을 선택해주세요' : `${userData?.city} ${userData?.county}` }
								</Typography>
								<SimpleLineIcons name="arrow-down" size={16} color="#C1C1C1"  style={{width:24,height:16}}/>
							</View>
						</TouchableOpacity>
					</View>
				</View>
			</View>

			<View style={styles.buttonContainer}>
				<TouchableOpacity onPress={handleLogout} >
					<View  style={styles.logoutButton}>
						<Text style={{textDecorationLine: 'underline', fontSize:12}}>로그아웃</Text>
					</View>
				</TouchableOpacity>
				<TouchableOpacity  onPress={handleEditProfile}>
					<View style={[styles.saveButton, isChanged ? styles.enabled : styles.disabled]}>
						<Typography fontSize={14} color="#fff" marginBottom={2}>저장하기</Typography>
					</View>
				</TouchableOpacity>
			</View>

			<Modal
				animationType="slide"
				transparent={true}
				visible={isEditNickNameModalVisible}
				onRequestClose={editNickNameToggleModal}>
					<EditNicknameModal 
						userNickName={userData?.userNickName}
						userData={userData}
						setUserData={setUserData}
						setIsChanged={setIsChanged}
						editNickNameToggleModal={editNickNameToggleModal}
					/>
			</Modal>

			<Modal
				animationType="slide"
				transparent={true}
				visible={isEditLocationModalVisible}
				onRequestClose={editLocationToggleModal}>
					<EditResidenceModal 
						userData={userData}
						setUserData={setUserData}
						setIsChanged={setIsChanged}
						editLocationToggleModal={editLocationToggleModal}
					/>
			</Modal>
					
			<View style={isEditLocationModalVisible ? styles.modalBackCover :  { display: 'none'}}></View>

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
    },
		modalBackCover : {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: '#333',
      opacity: 0.8,
      zIndex: 1
    },
})