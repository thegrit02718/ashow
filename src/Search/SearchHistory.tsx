import React,{useEffect, useState} from 'react'
import { View,Text, TouchableOpacity } from 'react-native'
import { Typography } from '../Components/Typography'
import { StyleSheet } from 'react-native'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Divider } from '../Components/Divider'
import { Alert } from 'react-native'
import axios from 'axios'
import MainURL from '../../MainURL'



type BuildingsProps = {
  addressLocal: string;
  addressRest: string;
  aptName:string;
  inDate: string;
  aptKey: string;
  houseHoldSum: string;
}

type FavorBuildingsProps = {
  addressCity: string;
  addressLocal: string;
  addressRest: string;
  aptName:string;
  inDate: string;
  aptKey: string;
  houseHoldSum: string;
  discountPer: number;
  priceLow: number;
}

export default function SearchHistory(props:any) {

 
  const [refresh, setRefresh] = useState<boolean>(false);
  const [lastViewedBuildingList, setLastViewedBuildingList] = useState<BuildingsProps[]>([]);
  const [favorList, setFavorList] = useState<FavorBuildingsProps[]>([]);

  const getUserLastViewedList = async() =>{
    try{
      const res_buliding = await axios.get(`${MainURL}/mypage/getlastviewedbuilding/${props.asyncGetData.userAccount}`);
      getBuildingsData(res_buliding.data)
    }catch(err){
      console.log(err);
    }
  }
 
  const getBuildingsData = async( list : any) =>{
    try{
      const res = await axios.get(`${MainURL}/buildings/buildingsall`);
      const filteredData = res.data.filter((item:any) => list.includes(item.aptKey.toString()));
      setLastViewedBuildingList(filteredData);
    }catch(err){
      console.log(err);
    }
  }


  const getUserFavorList = async() =>{
    try{
      const res = await axios.get(`${MainURL}/mypage/getfavorlist/${props.asyncGetData.userAccount}`);
      getFavorBuildingsData(res.data)
    }catch(err){
      console.log(err);
    }
  }
 
  const getFavorBuildingsData = async( list : any) =>{
    try{
      const res = await axios.get(`${MainURL}/buildings/buildingsall`);
      const filteredData = res.data.filter((item:any) => list.includes(item.aptKey.toString()));
      setFavorList(filteredData);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUserFavorList();
    getUserLastViewedList();
  },[refresh]);


  // 최근본 방문 매물 선택 삭제하기
  const lastViewBuildingDelete = async (aptKey : string) => {
    axios
      .post(`${MainURL}/mypage/lastviewbuildingdelete`, {
        userAccount : props.asyncGetData.userAccount,
        aptKey : aptKey
      })
      .then((res) => {
        if (res.data) {
          Alert.alert('삭제되었습니다.');
          setRefresh(!refresh);
        }        
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 최근본 방문 매물 전체 삭제하기
  const lastViewBuildingDeleteAll = async () => {
    axios
      .post(`${MainURL}/mypage/lastviewbuildingdeleteall`, {
        userAccount : props.asyncGetData.userAccount,
      })
      .then((res) => {
        if (res.data) {
          Alert.alert('삭제되었습니다.');
          setRefresh(!refresh);
        }        
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  return (
    <View style={styles.wrapper}>
      <View>
          <View style={[styles.titleBox,{  flexDirection:'row', justifyContent:'space-between', alignItems:'center'}]}>
            <Typography color='#333' fontSize={16} fontWeightIdx={0}>최근 방문</Typography>
            <TouchableOpacity 
              onPress={lastViewBuildingDeleteAll} 
            >
              <Text style={styles.deleteAllBtn}>전체삭제</Text>
            </TouchableOpacity>
          </View>
          <View>
            { lastViewedBuildingList.length > 0 ?
            lastViewedBuildingList.map((item, index) => {

              const copy = item.addressRest.split(' ');
              const addressRestCopy = copy[0];

              return (
              <View key={index} style={[styles.flexBox, styles.align_center,{justifyContent:'space-between', marginVertical:8}]}> 
                <TouchableOpacity 
                  style={[styles.flexBox, styles.align_center]}
                  onPress={()=>{}} 
                >
                  <Entypo  name="location-pin" size={18} color="#555555" style={{marginRight:8}}/> 
                  <View style={[styles.flexBox, styles.align_center ]}>
                    <Typography fontSize={14} fontWeightIdx={1} color='#1B1B1B'>{item.aptName} ・</Typography> 
                    <Typography fontSize={12} fontWeightIdx={1} color='#6F6F6F'>{addressRestCopy}</Typography> 
                  </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {lastViewBuildingDelete(item.aptKey)}}>
                  <EvilIcons  name="close" size={22} color="#555555" style={{marginBottom: 4}}/> 
                </TouchableOpacity>
              </View>)
            }) : 
            <View style={[styles.align_center,{justifyContent:'center', marginVertical:20}]}>
                <Typography color='#8B8B8B' fontSize={14} fontWeightIdx={1}>최근 방문한 곳이 없어요.</Typography>
            </View>
            }
          </View>
      </View>
      <View >
        <View style={styles.titleBox}>
          <Typography fontSize={16}>관심단지</Typography>
        </View>
          <View>
            {
            favorList.length > 0 ? 
            favorList.map((item:any, index:any) => {
              return (
                <TouchableOpacity 
                  onPress={()=>{
                    props.navigation.navigate('Navi_Detail', {
                      screen: 'DetailMain',
                      params: {
                        aptKey : item.aptKey,
                        pyengKey : 1,
                        userAccount : props.asyncGetData.userAccount,
                        userNickName : props.asyncGetData.userNickName
                      }
                    })
                  }}
                  style={{marginVertical:8}} 
                  key={index}
                >
                  <View style={[styles.flexBox,{alignItems:"center", justifyContent:"space-between", marginVertical:8}]}>
                    <View>
                      <Typography fontSize={12} color='#8B8B8B' fontWeightIdx={2}>{item.addressCity} {item.addressCounty}</Typography>
                      <Typography fontSize={16} color='#1B1B1B' fontWeightIdx={1}>{item.aptName}</Typography>
                    </View>
                    <SimpleLineIcons name="arrow-right" size={12} color="#555555"/> 
                  </View>
                  <Divider height={1}/>
                </TouchableOpacity>
              )
            }) : 
            <Typography color='#8B8B8B' fontSize={14}>관심 단지가 없어요.</Typography>
            }
          </View>
      </View>      
    </View>
  )
}



const styles = StyleSheet.create({
    wrapper:{
        paddingHorizontal:24,
    },
    flexBox: {
        flexDirection:'row',
    },
    align_center:{
      alignItems:"center"
    },
    titleBox:{
        marginTop:24,
        marginBottom:8,
    },
    deleteAllBtn:{
        fontFamily: "Pretendard-Regular",
        textDecorationLine: 'underline',
        color:"#3D3D3D",
        fontSize:14,
    }
})