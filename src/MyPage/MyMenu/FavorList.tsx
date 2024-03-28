import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Typography } from '../../Components/Typography';
import axios from 'axios';
import FormatNumber from '../../Components/FormatNumber';
import MainURL from '../../../MainURL';
import { SubTitle } from '../../Components/SubTitle';
import { Divider } from '../../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';


type BuildingsProps = {
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


export default function FavorList (props : any) {

  const [refresh, setRefresh] = useState<boolean>(false);
  const [favorList, setFavorList] = useState<BuildingsProps[]>([]);
  const [settingMenuView, setSettingMenuView] = useState<boolean>(false);

  const getUserFavorList = async() =>{
    try{
      const res = await axios.get(`${MainURL}/mypage/getfavorlist/${props.route.params.userAccount}`);
      getBuildingsData(res.data)
    }catch(err){
      console.log(err);
    }
  }
 
  const getBuildingsData = async( list : any) =>{
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
  },[refresh]);


  const [selectedDeleteBoolean, setSelectedDeleteBoolean] = useState(Array(favorList.length).fill(false));  
  const [selectedDeleteList, setSelectedDeleteList] = useState<string[]>([]);
  const [selectedDeleteAll, setSelectedDeleteAll] = useState<boolean>(false);

  const selectDelete = (index : any) => {
    const updatedSelections = [...selectedDeleteBoolean];
    updatedSelections[index] = !updatedSelections[index];
    setSelectedDeleteBoolean(updatedSelections);
    
    const selectedDeleteCopy = 
      favorList
        .filter((_, i) => updatedSelections[i])
        .map((item) => (JSON.stringify(item.aptKey)));
    setSelectedDeleteList(selectedDeleteCopy);
  };


  // 선택 매물 삭제하기
  const favorListDelete = async () => {
    axios
      .post(`${MainURL}/mypage/favorlistdelete`, {
        userAccount : props.route.params.userAccount,
        selectedDeleteList : selectedDeleteList
      })
      .then((res) => {
        if (res.data) {
          Alert.alert('삭제되었습니다.');
          setSelectedDeleteBoolean(Array(favorList.length).fill(false));
          setRefresh(!refresh);
        }        
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  // 매물 전체선택
  const selectAllFavorList = () => {
    if (selectedDeleteAll) {
      setSelectedDeleteAll(false)
      setSelectedDeleteBoolean(Array(favorList.length).fill(false));
      setSelectedDeleteList([]);
    } else {
      setSelectedDeleteAll(true)
      setSelectedDeleteBoolean(Array(favorList.length).fill(true));
      const selectedDeleteAll =  favorList.map((item) => (JSON.stringify(item.aptKey)));
      setSelectedDeleteList(selectedDeleteAll);
    }
  };

   // 편집취소
  const settingCancel = () => {
    setSettingMenuView(false)
    setSelectedDeleteBoolean(Array(favorList.length).fill(false));
    setSelectedDeleteList([]);
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <SubTitle title='관심단지' navigation={props.navigation}/>
        <Divider height={2} />
        {
          settingMenuView
          ?
          <View style={{paddingHorizontal:20, paddingTop:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{flexDirection:'row'}}>
              <TouchableOpacity
                style={{marginRight:10}}
                onPress={selectAllFavorList}
              >
                <View style={{padding:3, borderWidth:1,  borderRadius:5}}>
                  <Typography fontSize={14} fontWeightIdx={1}>전체선택</Typography>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={favorListDelete}
              >
                <View style={{padding:3, borderWidth:1,  borderRadius:5}}>
                  <Typography fontSize={14} fontWeightIdx={1}>선택삭제</Typography>
                </View>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              onPress={settingCancel}
            >
              <View style={{padding:3, borderWidth:1,  borderRadius:5, borderColor:'#E5625D'}}>
                <Typography fontSize={14} fontWeightIdx={1} color='#E5625D'>편집취소</Typography>
              </View>
            </TouchableOpacity>
          </View>
          :
          <View style={{paddingHorizontal:20, paddingTop:20, flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <Typography>전체 <Typography color='#E5625D'>{favorList.length}</Typography>건</Typography>
            <TouchableOpacity
              onPress={()=>{setSettingMenuView(true)}}
            >
              <View style={{padding:3, borderWidth:1, borderColor:'#6F6F6F', borderRadius:5}}>
                <Typography fontSize={14} fontWeightIdx={1} color='#6F6F6F'>편집</Typography>
              </View>
            </TouchableOpacity>
          </View>
        }
        <View style={styles.section}>
          { favorList.length > 0 ?
             favorList.map((item, index) => {
              const isSelected = selectedDeleteBoolean[index];
              return (
                <View key={index} style={{marginVertical:10}}>
                  <TouchableOpacity 
                      onPress={() => {
                        settingMenuView 
                        ?
                        null
                        :
                        props.navigation.navigate('Navi_Detail', {
                          screen: 'DetailMain',
                          params: {
                            aptKey : item.aptKey,
                            pyengKey : 1,
                            userAccount : props.route.params.userAccount,
                            userNickName : props.route.params.userNickName
                          }
                        })
                    }}
                  >
                    <View style={styles.contentBox}>
                      <View style={{width:'60%', padding:5}}>
                        <View style={{height:20}}>
                          <Typography fontSize={12} color="#6F6F6F" fontWeightIdx={2}>{item.addressCity} {item.addressLocal} {item.addressRest}</Typography>
                        </View>
                        <Text style={styles.buildingName} numberOfLines={2} ellipsizeMode='tail'>{item.aptName}</Text>
                        <Typography fontSize={14} color='#555' fontWeightIdx={2}>{item.houseHoldSum}세대 • {item.inDate} 입주</Typography>
                      </View>

                      <View style={[styles.contentOption, {top: -15, left: 15}]}>
                        <Typography fontSize={12} color='#E5625D'>29평 · 77㎡</Typography>
                      </View>
                    </View>
                  </TouchableOpacity>
                  {
                    settingMenuView 
                    &&
                    <TouchableOpacity
                      style={[styles.contentOption, {top: -25, right: 15}]}
                      onPress={()=>{
                        selectDelete(index);
                      }}
                    >
                      <View style={{padding:5, backgroundColor:'#fff'}}>
                        <AntDesign name={isSelected ? 'checkcircle' : 'checkcircleo'} size={18} color={isSelected ? '#E5625D' : '#BDBDBD'}/>
                      </View>
                    </TouchableOpacity>
                  }
                </View>
              );
              
            })
            :
            <View style={{alignItems:'center'}}>
              <Typography>선택된 관심단지가 없습니다.</Typography>
            </View>
            
          }
        </View>
      </ScrollView>
    </View>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"#fff",
    justifyContent:"space-between"
  },
  section : {
    padding:20
  },
  contentBox:{
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"space-between",
    position:"relative",
    borderWidth:1,
    borderColor:"#EFEFEF",
    paddingVertical:16,
    paddingHorizontal:12,
    borderRadius:3,
  },
  contentOption:{                       
    position:"absolute",
    padding:10,
    backgroundColor:"#fff",
  },
  buildingName: {
    fontWeight:"600",
    color:"#000",
    marginBottom:3,
    letterSpacing:1,
    marginLeft:-1
  },
  confirmButton:{
    backgroundColor: "#E8726E",
    borderRadius:16,
    paddingVertical:18,
    paddingHorizontal:25,
    marginBottom:20,
    alignItems:"center"
  },
  discountBox:{
    backgroundColor:"rgba(232, 114, 110, 0.10)",
    borderRadius:4, 
    paddingVertical:2,
    paddingHorizontal:4,
    lineHeight:18,
  }
});
