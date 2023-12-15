import React,{useState,useEffect,useCallback} from 'react';
import { View, TouchableOpacity, Image,} from 'react-native';
import { Typography } from '../../Components/Typography';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons'
import { Alert } from 'react-native';
import dayjs from 'dayjs'
import { StyleSheet } from 'react-native';


function FavoritedAptList() {
    const today = dayjs();
    const formattedToday = today.format('YYYY.MM.DD')
    const dummyData = [
        {
          name: "평촌자이아이파크",
          address:"경기도 안양시 동안구 비산동",
        },
        {
          name:"동탄레이크파크자연앤e편한세상(민영)",
          address:"경기도 화성시 장지동",
        },
        {
          name: "동탄레이크파크자연앤e편한세상(국민)",
          address: "경기도 화성시 장지동",
        },
        {
          name: "탕정푸르지오리버파크",
          address: "충청남도 아산시 탕정면 갈산리"
        },
        {
          name: "이문아이파크자이",
          address: "서울 동대문구 이문동"
        }]
     
    return (
        <View style={{paddingHorizontal:24}}>
          <View style={[styles.flexBox,styles.justi_between,{alignItems:'flex-start'}]}>
            <View style={styles.titleContainer}>
              <Image style={styles.titleImage} source={require('../../images/search/title.png')} resizeMode='contain'/> 
              <Typography fontSize={18} color='#1B1B1B'>전국 인기 급상승 단지</Typography>
            </View>
            {/* <TouchableOpacity style={[styles.flexBox,styles.align_center,styles.selectButton]} onPress={toggle}>
              <Typography color='#1B1B1B' fontSize={14} fontWeightIdx={1}>{currentRegion}</Typography>
              <SimpleLineIcons  name="arrow-down" size={10} color="#3D3D3D" style={{marginLeft:8}}/> 
            </TouchableOpacity> */}
          </View>
          <View style={styles.topTrendingSections}>
            {dummyData.map((item,idx)=> {
              return (
                <TouchableOpacity onPress={()=>Alert.alert('click')} style={[styles.flexBox,]} key={idx}>
                  {/* onPress에 navigation 입력해야함*/} 
                  <View style={{width:30, alignItems:"center"}}> 
                    <Typography fontSize={16} color={idx < 3 ? "#E8726E" : "#8B8B8B"} fontWeightIdx={0}>{idx+1}</Typography>
                  </View>
                  <View style={{marginLeft:5}}>
                    <Typography fontSize={16} color='#1B1B1B' fontWeightIdx={1} >{item.name}</Typography>  
                    <Typography fontSize={12} color='#8B8B8B' fontWeightIdx={2}>{item.address}</Typography>
                  </View>
                </TouchableOpacity>
              )
            })}
            <View style={{position:"absolute",right:0, bottom:0}}>
              <Typography color='#8B8B8B' fontSize={12} fontWeightIdx={2}>{formattedToday} 기준</Typography>
            </View>
          </View>
        </View>
    )
}

export default FavoritedAptList
export const styles = StyleSheet.create({
    wrapper:{
        flex:1,
        backgroundColor:"#fff"
    },
    flexBox:{
      flexDirection:'row',
   
    },
    align_center:{
      alignItems:"center",
    },
    justi_between:{
      justifyContent:'space-between'
    },
    titleImage:{
      height: 30,
      width:30,
      marginRight:4,
    },
    selectButton:{
      paddingVertical:6, 
      paddingHorizontal:12,
      minWidth:70,
      borderWidth:1,
      borderColor:"#DFDFDF",
      borderRadius: 8
    },
  
    topTrendingSections:{
       marginVertical:16,
       position:'relative',
       flexDirection:'column',
       gap: 14
    },
    titleContainer:{
      flexDirection:'row',
      alignItems:"center",
      marginBottom: 5,
    },
    topImgSwifeBox: {
      width: '100%',
      justifyContent: 'center',
      marginTop:20
    },
    scrollImages: {
      width: "180%",
      height: 100,
      borderRadius: 20,
   
    },
    locationData:{
      alignItems:"center",
      marginVertical:8
    },
    locationDataContent:{
      flex:1,
      flexDirection:'row',
      alignItems:'center',
      justifyContent:'space-between',
       marginLeft: 16 
    },
    curtain:{
      height:"100%",
      backgroundColor:"rgba(0,0,0,0.8)",
      position:'relative',
    },
    modalInner:{
      position:'absolute',
      bottom:0,
      left:0,
      minHeight:"50%",
      width:"100%",
      backgroundColor:"#fff",
      borderTopLeftRadius: 16,
      borderTopRightRadius:16,
      alignItems:'center'
    },
    resizeIcon:{
      width:36,
      height:5,
      backgroundColor: "#DFDFDF",
      borderRadius:5,
      alignItems:"center",
      marginVertical:15
    },
    selectedItem:{
      width:"33%",
      alignItems:"center",
      justifyContent:"center",
      paddingVertical:23,
      paddingHorizontal:12,
      borderWidth:1,
      borderColor:"#DFDFDF",
    },noBorderRight: {
      borderRightWidth: 0,
    },
    noBorderBottom: {
      borderBottomWidth: 0,
    },

}) 