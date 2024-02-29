import React, { useRef }  from 'react'
import { View,Image, StyleSheet, FlatList } from 'react-native';
// import Carousel from 'react-native-snap-carousel';
import { Dimensions } from 'react-native';
import { Typography } from '../../Components/Typography';

const screenWidth = Dimensions.get('window').width;

function ModelHouseCarousel() {
  
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
       <FlatList
        horizontal
        data={dummyData}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false} 
      />
    </View>
  )
}

export default ModelHouseCarousel

const styles = StyleSheet.create({
  carouselWrapper: {
    width: screenWidth - 100, 
    marginHorizontal: 10,
    paddingBottom:10
  },
  p_horizon_24:{
    paddingHorizontal: 24,
  },
  image:{
    width:"100%",
    height:160,
   }
})