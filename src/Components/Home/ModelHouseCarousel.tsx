import React from 'react'
import { View,Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import { Typography } from '../Typography';

function ModelHouseCarousel() {
  const horizontalMargin = 30;
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth - horizontalMargin / 2;
  const dummyData = [{image: require('../../images/home/model_house_01.png')},{image: require('../../images/home/model_house_01.png')}]

  function renderItem({item}: any) {
   return (
      <View style={styles.carouselWrapper}>
        <Image style={styles.image} source={item.image} alt="모델하우스 이미지" resizeMode='contain'/>
      </View>
    
     );
   }
   
   return (
   <View style={{ flex:1}}>
    <View style={styles.p_horizon_24}>
      <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>사이버 모델하우스</Typography>
    </View>
    <Carousel
       data={dummyData}
       vertical={undefined}
       renderItem={renderItem}
       sliderWidth={sliderWidth}
       itemWidth={itemWidth - 50 }
       loop
       layout="default"
       activeSlideAlignment='start'
     />
    </View>
  )
}

export default ModelHouseCarousel

const styles = StyleSheet.create({
  carouselWrapper: {
    width: "100%", 
    marginHorizontal:24,
  },  
  p_horizon_24:{
    paddingHorizontal: 24,
  },
  image:{
    width:"100%",
    height:160,
    
  }
})