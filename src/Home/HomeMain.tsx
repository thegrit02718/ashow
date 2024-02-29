import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, Linking, Modal } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MainURL from '../../MainURL';
import AsyncGetItem from '../AsyncGetItem'
import { Typography } from '../Components/Typography';
import {checkNotifications, requestNotifications} from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import Toast from 'react-native-toast-message';
import axios from 'axios';
import MainBannerCarousel from './HomeComponents/MainBannerCarousel';
import SpecialAptCarousel from './HomeComponents/SpecialAptCarousel';
import FavoritedAptlist from './HomeComponents/FavoritedAptList';
import ModelHouseCarousel from './HomeComponents/ModelHouseCarousel';
import LatestAptCarousel from './HomeComponents/LatestAptCarousel';
import BrandPage from './HomeComponents/BrandPage';
import YoutubeBox from './HomeComponents/YoutubeBox';
import MainSelectLocationModal from './MainSelectLocationModal';
import Loading from '../Loading';
import { useRecoilState } from 'recoil';
import { recoilMainAptViewlist, recoilMainAptlist, recoilSpecialCostAptlist, recoilMainSelectLocation } from '../RecoilStore';


function HomeMain(props : any) {

   // 알림 허용 여부 확인
   const handleCheckNotifications = async () => {
    const check = await checkNotifications();
    if (check.status === 'denied' || check.status === 'blocked'){
      requestNotifications(['alert', 'sound']).then(()=>{
        if (check.status === 'denied' || check.status === 'blocked') {
          Alert.alert('알림을 허용해주세요', '', [
            { text: '취소', onPress: () => {return }},
            { text: '허용', onPress: () => Linking.openSettings() }
          ]);
        }
      })
    } else if (check.status === 'granted') {
      props.navigation.navigate("마이페이지", {screen:"Notification"});
    } else {
      return
    }
  }  
  
  // background 상태일 때, 알림 받기
  useEffect(()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage) {
        props.navigation.navigate("Navi_Notifi", {screen:"Notification"});
      }
    });;
  }, []); 

  // quit 상태일 때, 알림 받기
  useEffect(()=>{
    messaging().getInitialNotification().then(remoteMessage => {
      if (remoteMessage) {
        props.navigation.navigate("Navi_Notifi", {screen:"Notification"});
      }
    });;
  }, []); 

  // forground 상태일 때, 알림 받기
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      if (remoteMessage) {
        Toast.show({
          type: 'success',
          text1: remoteMessage.notification?.title,
          text2: remoteMessage.notification?.body,
          onPress() {
            props.navigation.navigate("Navi_Notifi", {screen:"Notification"});
          }
        })
      }
    });;
    return unsubscribe
  }, []);

  // ------------------------------------------------------------------------------------------------

  const locationlist = ["전체", "남구", "달서구", "달성군", "동구", "북구", "서구", "수성구", "중구", "군위군"]
  const [selectLocation, setSelectLocation] = useRecoilState(recoilMainSelectLocation);

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

  interface mainAptlistProps {
    aptKey : number;
    aptName: string;
    inDate : string;
    AddressCity : string;
    AddressCounty : string;
    mainType : string;
    state : string;
    pyengName : string;
    houseHoldSum : number;
    houseHold : number;
    personalArea: number;
    priceDefaultHigh: number;
    priceDefaultLow: number;
    discountHigh: number; 
    discountLow: number; 
    explanation : string;
  }

  // 게시판 글 가져오기
  const [mainAptlist, setMainAptlist] = useRecoilState<mainAptlistProps[]>(recoilMainAptlist);
  const [mainAptViewlist, setMainAptViewlist] = useRecoilState<mainAptlistProps[]>(recoilMainAptViewlist);
  const [specialCostAptlist, setSpecialCostApt] = useRecoilState<mainAptlistProps[]>(recoilSpecialCostAptlist);

  const fetchPosts = () => {
    axios.get(`${MainURL}/buildings/pyenginfoall/${selectLocation}`).then((res) => {
      let copy: any = [...res.data];
      copy.reverse();
      const filteredData = copy.filter((e:any)=> e.mainType === 'true');
      setMainAptlist(filteredData);
      setMainAptViewlist(filteredData);
      const specialCostData = copy.filter((e:any)=> e.sort === 'special' && e.mainType === 'true');
      setSpecialCostApt(specialCostData);
    });
  };
    
  useEffect(()=>{
    asyncFetchData();
    fetchPosts();
  }, [selectLocation]);

  const [isSelectLocaionModalVisible, setSelectLocaionModalVisible] = useState(false);
  const selectLocaionToggleModal = () => {
    setSelectLocaionModalVisible(!isSelectLocaionModalVisible);
  }; 
  
  return (
    mainAptViewlist.length === 0
    ?
    <Loading />
    :
    <View style={styles.container}>

      <ScrollView showsVerticalScrollIndicator={false} style={{width: '100%'}}>
      <View style={styles.wrapper}>

        <View style={styles.container}>
          
          <View style={styles.header}>
            <View style={[styles.flexBox,{gap:12}]}>
              <Image style={styles.logo} source={require('../images/home/toplogo.png')} resizeMode='contain'/>
              <View style={styles.bar}></View>
              <TouchableOpacity style={[styles.flexBox ]} onPress={selectLocaionToggleModal}>
                <Typography fontSize={14} fontWeightIdx={1} color='#3D3D3D'>대구 {selectLocation}</Typography>
                <MaterialIcons style={{marginTop:1}}name="keyboard-arrow-down" size={19} color="#333" />
              </TouchableOpacity>
            </View>
            <TouchableOpacity 
              onPress={()=>{
                props.navigation.navigate('Navi_Search', {
                  screen: 'SearchMain',
                  params: { aptlist : mainAptViewlist, asyncGetData: asyncGetData}
                })
              }}>
              <Feather name="search" size={22} color="#333" />
            </TouchableOpacity>
          </View>

          <Modal
            animationType="slide"
            transparent={true}
            visible={isSelectLocaionModalVisible}
            onRequestClose={selectLocaionToggleModal}
          >
            <MainSelectLocationModal 
                locationlist={locationlist} selectLocation={selectLocation} setSelectLocation={setSelectLocation}
                selectLocaionToggleModal={selectLocaionToggleModal}/>
          </Modal>

          <View style={{height:350, backgroundColor:"#F5F4F3"}}>
            <MainBannerCarousel/>
          </View>

          <View style={styles.section}>
            <SpecialAptCarousel aptlist={specialCostAptlist} asyncGetData={asyncGetData} navigation={props.navigation}/>
          </View>
        </View>

        <View style={styles.section}>
          <BrandPage aptlist={mainAptViewlist} asyncGetData={asyncGetData} navigation={props.navigation}/>
        </View>
        
        <View style={styles.section} >
          {/* 신규 준공 아파트 */}
          <LatestAptCarousel aptlist={mainAptViewlist} asyncGetData={asyncGetData} navigation={props.navigation}/>
          <TouchableOpacity style={styles.p_horizon_24} onPress={()=>{
            props.navigation.navigate("아파트");
          }}>
            <View style={styles.latestAptBtn}>
              <Typography fontSize={14} fontWeightIdx={2}>전체보기</Typography>
            </View>
          </TouchableOpacity>
        </View>

        {/* 유투브 박스 */}
        <View style={styles.section}>
          <YoutubeBox />
        </View>

        {/* 전국 인기 급상승 단지 */}
        <View style={styles.section}>
          <FavoritedAptlist asyncGetData={asyncGetData} navigation={props.navigation}/>
        </View>

        {/* 사이버 모델하우스 */}
        <View style={styles.section}>
          <ModelHouseCarousel/>
        </View>

      </View>

      </ScrollView>
    </View> 
   );
}
export default HomeMain;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  wrapper:{
    flexDirection:'column',
    backgroundColor: "#FCF8F8",
    display:'flex',
    gap: 8
  },
  section:{
    backgroundColor:"#fff",
    paddingVertical:32,
  },
  p_horizon_24:{
    paddingHorizontal: 24,
  },
  p_vertical_18:{
    paddingVertical:32
  },
  
  header:{
    paddingVertical:18,
    paddingHorizontal: 24,
    display:'flex',
    alignItems:'flex-start',
    justifyContent:'space-between',
    flexDirection:'row',
    backgroundColor:'#fff',
   },
  logo:{
    width:40,
    height:20,
  },
  bar:{
    width:2,
    height:24,
    backgroundColor:"#EFEFEF",
  },
  flexBox: {
    display:'flex',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'center'
  },
  tab:{
    width:"100%",
    paddingVertical:10,
    borderBottomWidth:2,
    borderColor:'#FCF8F8',
    flexDirection:'row',
    gap: 10,
    paddingHorizontal:24,
    marginBottom:20
  },
  card:{
    flexDirection:'row',
    gap: 15,
    alignItems:'center',
  
  },
  brandImage:{
    height:95,
    width:95,
    borderRadius:10},
  textArea:{
    width:200
  },
   brandPrice:{
      flexDirection:'row',
      alignItems:'center',
      gap: 4, 
   },
   latestAptBtn:{
    borderWidth:1,
    borderColor:"#DFDFDF",
    paddingVertical:13,
    borderRadius:8,
    alignItems:'center',
    marginTop:26,
   }
  
  // notice
  // notice: {
  //   paddingHorizontal: 24,
  //   height: 100,
  //   marginBottom: 30
  // },
});

