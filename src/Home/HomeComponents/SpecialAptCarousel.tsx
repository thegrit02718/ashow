import React, {useEffect, useRef, useState} from 'react';
import {FlatList, View, Text,Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import {Typography} from '../../Components/Typography';
import MainImageURL from '../../../MainImageURL';
import { Shadow } from 'react-native-shadow-2';
import FormatNumber from '../../Components/FormatNumber';

const horizontalMargin = 30;
const screenWidth = Dimensions.get('window').width;

export default function Carousels(props : any) {
 
  const itemWidth = screenWidth - horizontalMargin / 2;

  function renderItem({item}: any) {

    const discountHighPer = 100 - (item.discountHigh / item.priceDefaultHigh * 100);
    const discountLowPer = 100 - (item.discountLow / item.priceDefaultLow * 100);
    const discountResultPer = discountHighPer > discountLowPer ? discountHighPer : discountLowPer;
   
    return (
      <TouchableOpacity
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
        <View style={[styles.carouselWrapper]}>
          <Shadow distance={5} startColor="#dfdfdf" style={{ borderRadius:10, overflow:'hidden'}}>
          <View style={{flexDirection:'row',gap:5}}>
            <View style={{width: itemWidth* 0.6  - 25}}>
              <Image style={[styles.mainImage,{width:"100%"}]} 
                 source={{uri: `${MainImageURL}/appimages/buildings/${item.aptKey}/default/mainimage.png`}}/>
            </View>
            <View style={[styles.flexBox, styles.flexColumn,{width: itemWidth* 0.4 - 25}]}>
              <Image
                style={[styles.subImage, ]}
                source={{uri: `${MainImageURL}/appimages/buildings/${item.aptKey}/default/3dview1.png`}}
                resizeMode="cover"/>
              <Image
                style={[styles.subImage, {width:"100%"}]}
                source={{uri: `${MainImageURL}/appimages/buildings/${item.aptKey}/default/airview.png`}}
                resizeMode="cover"/>
            </View>
          </View>
          <View style={styles.contentTextArea} >
            <View style={styles.promotionDetailsBox}>
              <View style={[styles.benefitsBox]}>
                <Typography fontSize={13} color="#fff" fontWeightIdx={2}>
                  {Math.floor(discountResultPer)}%할인
                </Typography>
              </View>
              {/* <View style={[styles.benefitsBox]}>
                {
                  item.benefits && 
                  <Typography fontSize={13} color="#fff" fontWeightIdx={2}>
                    {item.benefits}
                  </Typography>
                }
              </View> */}
            </View>
            <View style={{display:'flex',flexDirection:'column', gap:13}}>
              <View>
                <Typography
                  fontSize={17}
                  color="#555"
                  fontWeightIdx={0}
                  marginBottom={4}>
                  {item.title}
                </Typography>
                <Typography fontSize={13} color="#3D3D3D" fontWeightIdx={1} >
                  {item.explanation}
                </Typography>
              </View>
              <View style={styles.salePriceArea}>
                <Typography fontSize={14} fontWeightIdx={1} color='#424141'>혜택 분양가</Typography>
                <View style={styles.priceArea}>
                  <Text style={{color:"#8B8B8B", textDecorationLine:"line-through", fontSize:12}}>
                    {FormatNumber(item.priceDefaultLow)} ~ {FormatNumber(item.priceDefaultHigh)}</Text>
                  <Typography color='#1B1B1B' fontWeightIdx={0} fontSize={16}>
                    {FormatNumber(item.discountHigh)} ~ {FormatNumber(item.discountLow)}</Typography>
                </View>
              </View>
            </View>
          </View>
          </Shadow>
        </View>
      </TouchableOpacity>
    );
  }

  return (
    <View style={{ flex:1 }}>
      <View style={styles.p_horizon_24}>
        <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>특별 혜택 아파트</Typography>
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
    width: screenWidth - 70, 
    marginHorizontal:20,
    paddingBottom:10
  },
  p_horizon_24:{
    paddingHorizontal: 24,
  },
  flexBox: {
    display: 'flex',
    gap: 5,
  },
  flexRow: {
    flexDirection: 'row',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  mainImage: {
    height: 200,
  },
  subImage: {
     height:97,
    width:"100%"
  
  },
  contentTextArea:{
    padding:12,
    flex:1, 
  },
  promotionDetailsBox: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginBottom: 10,
  },
  benefitsBox: {
    backgroundColor: '#E8726E',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  salePriceArea: {
    flexDirection:'row',
    justifyContent:'space-between',
    borderRadius:4,
    paddingVertical:12,
    paddingHorizontal:10,
    backgroundColor:"#FAFAFA"
  },
  priceArea: {
    flexDirection:"column",
    alignItems:'flex-end',
    gap: 2,
  },


});