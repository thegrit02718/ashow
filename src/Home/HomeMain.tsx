import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView, Platform, TouchableNativeFeedback, TouchableWithoutFeedback, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Feather from 'react-native-vector-icons/Feather';
import { Typography } from '../Components/Typography';
import { Alert } from 'react-native';
import SpecialAptCarousel from '../Components/Home/SpecialAptCarousel';
import LatestAptCarousel from '../Components/Home/LatestAptCarousel';
import Tabs from '../Components/Tab/Tabs';
import { Divider } from '../Components/Divider';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FavoritedAptList from '../Components/Search/FavoritedAptList';
import ModelHouseCarousel from '../Components/Home/ModelHouseCarousel';
import MainBannerCarousel from '../Components/Home/MainBannerCarousel';

function HomeMain(props : any) {
  const brandAptDummy = [
    { 
      address: '대구 중구',
      name: '동인동 힐스테이트 동인', 
      image:require('../images/home/apt_1.png'),
      price: '6억 147 ~ 7억 2,003'
    },
    { 
      address: '대구 동구',
      name: '신천동 힐스테이트 동대구센트럴', 
      image:require('../images/home/apt_2.png'),
      price: '6억 3,480 ~ 12억 600'
    },
    { 
      address: '대구 서구',
      name: '비산동 힐스테이트 서대구역센트럴', 
      image:require('../images/home/apt_3.png'),
      price: '5억 6,839'
    }
  ]
  
  return (
    <ScrollView style={{flex:1,}}>
      <View style={styles.wrapper}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={[styles.flexBox,{gap:12}]}>
              <Image style={styles.logo} source={require('../images/home/toplogo.png')} resizeMode='contain'/>
              <View style={styles.bar}></View>
              <TouchableOpacity style={[styles.flexBox ]}>
                <Typography fontSize={14} fontWeightIdx={1} color='#3D3D3D'>대구 수성구</Typography>
                <MaterialIcons style={{marginTop:1 }}name="keyboard-arrow-down" size={19} color="#333333" />
              </TouchableOpacity>
            </View>
            <TouchableNativeFeedback onPress={()=>Alert.alert('click')}><Feather name="search" size={22} color="#333333" /></TouchableNativeFeedback>
          </View>
          <View style={{height:350, backgroundColor:"#F5F4F3"}}>
            <MainBannerCarousel/>
          </View>
          <View style={styles.section}>
            <View style={styles.p_horizon_24}>
              <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>특별 혜택 아파트</Typography>
            </View>
            <SpecialAptCarousel/>
          </View>
        </View>
        <View style={styles.section}>
          <View style={styles.p_horizon_24}>
            <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>브랜드관</Typography>
          </View>
          <Tabs defaultValue={1}>
            <ScrollView horizontal>
              <View style={[styles.tab]}>
                <Tabs.ImageTrigger value={1} text="힐스테이트"  source={require('../images/home/brand_logo_1.png')}/>
                <Tabs.ImageTrigger value={2} text="프루지오" source={require('../images/home/brand_logo_2.png')}/>
                <Tabs.ImageTrigger value={3} text="극동스타클래스" source={require('../images/home/brand_logo_3.png')}/>
                <Tabs.ImageTrigger value={4} text="서한이다음" source={require('../images/home/brand_logo_4.png')}/>
                <Tabs.ImageTrigger value={5} text="빌리브" source={require('../images/home/brand_logo_5.png')}/>
                <Tabs.ImageTrigger value={6} text="엘크루" source={require('../images/home/brand_logo_6.png')}/>
                <Tabs.ImageTrigger value={7} text="스위첸" source={require('../images/home/brand_logo_7.png')}/>
              </View>
            </ScrollView>
            {Array(7).fill(null).map((_, idx) =>{
              return (
              <Tabs.Panel value={idx+1} key={idx}>
                <View style={{flex:1, paddingTop:30, paddingHorizontal:30,}}>
                  {brandAptDummy.map((item,idx) => {
                    return (
                    <TouchableOpacity key={idx}>
                      <View style={styles.card}>
                        <Image style={styles.brandImage} source={item.image} alt="힐스테이트"resizeMode='contain'/>
                        <View style={ styles.textArea}>
                          <Typography fontSize={12} fontWeightIdx={2} color='#8B8B8B' marginBottom={1}>{item.address}</Typography>
                          <Typography fontSize={14} fontWeightIdx={1} color='#555' marginBottom={3}>{item.name}</Typography>
                          <View style={styles.brandPrice}>
                            <Typography fontSize={16} fontWeightIdx={0} color='#555' >분양가</Typography>
                            <Typography fontSize={16} fontWeightIdx={0} color='#E8726E'>{item.price}</Typography>
                          </View>
                        </View>
                         <SimpleLineIcons name="arrow-right" size={12} color="#DFDFDF" />  
                      </View>
                      {brandAptDummy.length !== idx+1 && <Divider height={2} marginVertical={16}/>}
                    </TouchableOpacity>)
                  })}
                </View>
              </Tabs.Panel>)
            })}
          </Tabs>
        </View>
        <View style={styles.section} >
          <LatestAptCarousel/>
          <TouchableOpacity style={styles.p_horizon_24}>
            <View style={styles.latestAptBtn}>
              <Typography fontSize={14} fontWeightIdx={2}>전체보기</Typography>
            </View>
          </TouchableOpacity>
        </View>
        <View style={styles.section}>
          <FavoritedAptList />
        </View>
        <View style={styles.section}>
          <View style={styles.p_horizon_24}>
            <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>사이버 모델하우스</Typography>
          </View>
          <ModelHouseCarousel/>
        </View>
      </View>
    </ScrollView>
  )
 

  

}
export default HomeMain;

const styles = StyleSheet.create({
  wrapper:{
    flexDirection:'column',
    backgroundColor: "#FCF8F8",
    display:'flex',
    gap: 8
  },
  container:{ },
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
    paddingHorizontal:24
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
});

