import React, {useRef, useState} from 'react';
import {FlatList, View, Text,Image} from 'react-native';
import {StyleSheet} from 'react-native';
import {Typography} from '../Typography';
import {Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { dummyData as pages } from '../../Home/dummyData';
import { Shadow } from 'react-native-shadow-2';

export default function Carousels() {
  const horizontalMargin = 30;
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth - horizontalMargin / 2;
  
  function renderItem({item}: any) {
   
    return (
      <View style={[styles.carouselWrapper]}>
        <Shadow distance={4} startColor="#dfdfdf" style={{ borderRadius:10, overflow:'hidden'}}>
          <View style={{flexDirection:'row',gap:5}}>
            <View style={{width: itemWidth* 0.6  - 25}}>
              <Image style={[styles.mainImage,{width:"100%"}]} source={{uri: item.image[0]}} />
            </View>
            <View style={[styles.flexBox, styles.flexColumn,{width: itemWidth* 0.4 - 25}]}>
              <Image
                style={[styles.subImage, ]}
                source={{uri: item.image[1]}}
                resizeMode="cover"/>
              <Image
                style={[styles.subImage, {width:"100%"}]}
                source={{uri: item.image[2]}}
                resizeMode="cover"/>
            </View>
          </View>
          <View style={styles.contentTextArea} >
            <View style={styles.promotionDetailsBox}>
              <View style={[styles.benefitsBox]}>
                <Typography fontSize={13} color="#fff" fontWeightIdx={2}>
                  {item.discount}할인
                </Typography>
              </View>
              <View style={[styles.benefitsBox]}>
                <Typography fontSize={13} color="#fff" fontWeightIdx={2}>
                  {item.benefits}
                </Typography>
              </View>
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
                  <Text style={{color:"#8B8B8B", textDecorationLine:"line-through", fontSize:12}}>9억 1,234 ~ 14억 700</Text>
                  <Typography color='#1B1B1B' fontWeightIdx={0} fontSize={16}>6억 3,480 ~ 12억 600</Typography>
                </View>
              </View>
            </View>
          </View>
        </Shadow>
      </View>
    );
  }
  return (
    <View style={{ flex:1}}>
      <View style={styles.p_horizon_24}>
        <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>특별 혜택 아파트</Typography>
      </View>
      <Carousel
        data={pages}
        vertical={undefined}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth - 40 }
        loop
        layout="default"
        activeSlideAlignment='start'
      />
    </View>
    
  );
}


const styles = StyleSheet.create({
  carouselWrapper: {
    width: "100%", 
    paddingBottom:5,
    marginHorizontal:24,
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
  }
   
});
