import React, {useRef, useState} from 'react';
import {FlatList, View, Text,Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {Typography} from '../../Components/Typography';
import {Dimensions} from 'react-native';
import MainImageURL from '../../../MainImageURL';

const screenWidth = Dimensions.get('window').width;

export default function LatestAptCarousel(props:any) {
   
  function renderItem({item}: any) {
    const year = item.inDate.split('.')[0];
    const month = item.inDate.split('.')[1];
    return (
      <TouchableOpacity style={[styles.carouselWrapper]}
        activeOpacity={0.9}
        onPress={()=>{
          props.navigation.navigate('Navi_Detail', {
            screen: 'DetailMain',
            params: {
              aptKey : item.aptKey,
              pyengKey : item.pyengKey,
              userAccount : props.asyncGetData.userAccount,
              userNickName : props.asyncGetData.userNickName
            }
          })
        }}
      >
        <View>
          <Image style={[styles.mainImage,{width:"100%"}]} source={{uri: `${MainImageURL}/appimages/buildings/${item.aptKey}/default/mainimage.png`}} />
        </View>
        <View style={{padding: 5}}>
          <Typography fontSize={12} color='#6F6F6F' fontWeightIdx={2} marginBottom={5}>{item.addressCity} {item.addressCounty} ∙ {item.houseHoldSum}세대</Typography>
          <Typography fontSize={14} color="#333" fontWeightIdx={1} marginBottom={7}>{item.aptName}</Typography>
          <View style={styles.inDateArea}>
            <Text style={styles.inDateBtn}>입주시기</Text>
            <Typography fontSize={14} color="#333" fontWeightIdx={1} >
              {`${year}년 ${month}월`}
            </Typography>
          </View>
          
        </View>
      </TouchableOpacity>
    );
  }
 
  return (
    <View style={{ flex:1 }}>
      <View style={styles.p_horizon_24}>
        <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>신규 준공 아파트</Typography>
      </View>
      <FlatList
        horizontal
        data={props.aptlist}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false} 
      />
    </View>
    
  );
}


const styles = StyleSheet.create({
  carouselWrapper: {
    width: screenWidth - 150, 
    marginHorizontal:10,
    paddingBottom:10
  },  
  mainImage: {
    borderRadius: 10,
    overflow:'hidden',
    height: 150,
  },
  p_horizon_24:{
    paddingHorizontal: 24,
  },
  inDateArea:{
    flexDirection:'row',
    alignItems:'center',
    gap: 8
  },

  inDateBtn: {
    backgroundColor: '#E8726E',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 4,
    fontSize:12,
    fontFamily:"Pretendard-SemiBold",
    color:"#fff",
  },
});
