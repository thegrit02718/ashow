import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Typography } from '../../Components/Typography';
import { TouchableWithoutFeedback } from 'react-native';
import { Divider } from '../../Components/Divider';
import AsyncGetItem from '../../AsyncGetItem';
import axios from 'axios';
import { SubTitle } from '../../Components/SubTitle';
import MainURL from '../../../MainURL';

type BuildingsProps = {
  addressLocal: string;
  addressRest: string;
  aptName:string;
  inDate: string;
  aptKey: string;
  houseHoldSum: string;
}

type PostsProps = {
  id: string;
  sort: string;
  title: string;
}

export default function History (props : any) {

  const [refresh, setRefresh] = useState<boolean>(false);
  const [isClicked,setIsClicked] = useState(0);
  const [lastViewedBuildingList, setLastViewedBuildingList] = useState<BuildingsProps[]>([]);
  const [lastViewedPostList, setLastViewedPostList] = useState<PostsProps[]>([]);

  const getUserLastViewedList = async() =>{
    try{
      const res_buliding = await axios.get(`${MainURL}/mypage/getlastviewedbuilding/${props.route.params.userAccount}`);
      getBuildingsData(res_buliding.data)
      const res_post = await axios.get(`${MainURL}/mypage/getlastviewedpost/${props.route.params.userAccount}`);
      getPostsData(res_post.data)
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

  const getPostsData = async( list : any) =>{
    try{
      const res = await axios.get(`${MainURL}/board/postsall`);
      const filteredData = res.data.filter((item:any) => list.includes(item.id.toString()));
      setLastViewedPostList(filteredData);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getUserLastViewedList();
  },[refresh]);

  // 최근본 매물 선택 삭제하기
  const lastViewBuildingDelete = async (aptKey : string) => {
    axios
      .post(`${MainURL}/mypage/lastviewbuildingdelete`, {
        userAccount : props.route.params.userAccount,
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

    // 최근본 매물 전체 삭제하기
    const lastViewBuildingDeleteAll = async () => {
      axios
        .post(`${MainURL}/mypage/lastviewbuildingdeleteall`, {
          userAccount : props.route.params.userAccount,
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

  // 최근본 게시물 선택 삭제하기
  const lastViewPostDelete = async (postKey : string) => {
    axios
      .post(`${MainURL}/mypage/lastviewpostdelete`, {
        userAccount : props.route.params.userAccount,
        postKey : postKey
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

    // 최근본 게시물 전체 삭제하기
    const lastViewPostDeleteAll = async () => {
      axios
        .post(`${MainURL}/mypage/lastviewpostdeleteall`, {
          userAccount : props.route.params.userAccount,
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
    <View style={styles.container}>

      <SubTitle title='히스토리' navigation={props.navigation}/>
      
      <View style={{paddingHorizontal:20}}>
        <View style={styles.title}>
          <TouchableOpacity 
            style={[styles.tabButton, isClicked === 0 ? { borderBottomColor: "#E8726E"} : {borderBottomColor: "#8C8C8C", }]} 
            onPress={()=> setIsClicked(0)} 
          >
            <Text style={[styles.titleText, isClicked === 0 ? { color:"#E8726E" } : {color: "#8C8C8C"}]}>최근 본 단지</Text >
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tabButton, isClicked === 1 ? { borderBottomColor: "#E8726E"} : {borderBottomColor: "#8C8C8C", }]} 
            onPress={()=> setIsClicked(1)}
          >
            <Text style={[styles.titleText, isClicked === 1 ? { color:"#E8726E" } : {color: "#8C8C8C"}]}>최근 본 게시물</Text>
            </TouchableOpacity>
        </View>
      </View>
      
      <View style={{flex:1, padding:20}}>
     
          {/* 최근 본 단지 클릭 했을 떄 */}
          {isClicked === 0 && 
          <>
            {
              lastViewedBuildingList.length > 0
              ?
              <>
                <View style={{alignItems:'flex-end', marginBottom:10}}>
                  <TouchableWithoutFeedback 
                    onPress={lastViewBuildingDeleteAll}
                  >
                    <Text style={styles.clearAllButton}>전체삭제</Text>
                  </TouchableWithoutFeedback>
                </View>
                {
                lastViewedBuildingList?.map((item:any, index:any)=>{

                  const copy = item.addressRest.split(' ');
                  const addressRestCopy = copy[0];

                  return (
                  <View key={index} style={{marginVertical:10}}>
                    <View style={styles.flexBox}>
                      <View style={{flexDirection:'row'}}>
                        <Image style={{width:41,height:55}} source={require('../../images/mypage/historybuildings.png')}/> 
                        <View style={styles.contentInfo}>
                          <Typography fontSize={10} color='#E8726E'>할인 분양 • 즉시입주</Typography>
                          <Typography fontSize={18} marginBottom={2}>{item.aptName}</Typography>
                          <Typography fontSize={12} color='#878787' fontWeightIdx={2}>{item.addressCounty} {addressRestCopy} • {item.houseHoldSum}세대</Typography>
                        </View>
                      </View>
                      <TouchableOpacity 
                        onPress={() => {lastViewBuildingDelete(item.aptKey)}} 
                      >
                        <Ionicons  name="close-outline" size={24} color="#000" /> 
                      </TouchableOpacity>
                    </View>
                    <Divider/>
                  </View>
                  )
                  })
                }
              </>
              :
              <View style={{alignItems:'center'}}>
                <Typography fontWeightIdx={2}>최근 본 매물이 없습니다.</Typography>
              </View>
            }
          </>
          }


          {/* 최근 본 게시물 클릭했을때   */}
          {isClicked === 1 && 
          <>
            {
              lastViewedPostList.length > 0
              ?
              <>
                <View style={{alignItems:'flex-end', marginBottom:10}}>
                  <TouchableWithoutFeedback 
                    onPress={lastViewPostDeleteAll}
                  >
                    <Text style={styles.clearAllButton}>전체삭제</Text>
                  </TouchableWithoutFeedback>
                </View>
                {
                lastViewedPostList?.map((item:any, index:any)=>{

                  return (
                  <View key={index} style={{marginVertical:10}}>
                    <View style={styles.flexBox}>
                      <View style={{flexDirection:'row'}}>
                      <Image style={{width:41,height:55}} source={require('../../images/mypage/posts.png')}/> 
                        <View style={styles.contentInfo}>
                          <Typography fontSize={10} color='#E8726E'>{item.sort}</Typography>
                          <Typography fontSize={18}>{item.title}</Typography>
                        </View>
                      </View>
                      <TouchableOpacity 
                        onPress={() => {lastViewPostDelete(item.id)}} 
                      >
                        <Ionicons  name="close-outline" size={24} color="#000" /> 
                      </TouchableOpacity>
                    </View>
                    <Divider/>
                  </View>
                  )
                  })
                }
              </>
              :
              <View style={{alignItems:'center'}}>
                <Typography fontWeightIdx={2}>최근 본 게시물이 없습니다.</Typography>
              </View>
            }
          </>
          }
      </View>
    </View>
    
   );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  flexBox:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between',
    marginBottom:15
  },
  title:{
    flexDirection:'row',
  },
  titleText:{
    fontSize:16,
    color: '#1B1B1B',
    fontWeight:'bold',
  },
  tabButton:{
    width:"50%",
    borderBottomWidth:2,
    paddingVertical:10,
    alignItems:"center"
  },
 clearAllButton:{
  fontSize:12,
  color:'#595959',
  fontWeight: "500",
  marginTop:12,
  textDecorationLine: "underline"
 },
 contentInfo:{
  marginLeft:18,
 },
 confirmButton:{
    backgroundColor: "#E8726E",
    borderRadius:16,
    paddingVertical:18,
    paddingHorizontal:20,
    marginBottom:20,
    alignItems:"center"
  
 }
});
