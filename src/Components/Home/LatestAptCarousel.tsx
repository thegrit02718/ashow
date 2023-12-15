import React, {useRef, useState} from 'react';
import {FlatList, View, Text,Image, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {Typography} from '../Typography';
import {Dimensions} from 'react-native';
import Carousel,{ Pagination } from 'react-native-snap-carousel';
import { dummyData as pages } from '../../Home/dummyData2';
import dayjs from 'dayjs'; 

export default function LatestAptCarousel() {
  const carouselRef = useRef<Carousel<any>>(null);
  const [activeSlide, setActiveSlide] = useState(1);
  const horizontalMargin = 30;
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth - horizontalMargin / 2;
   
  const handleNextPress = () => {
    if (carouselRef.current) {
      const newActiveSlide = (activeSlide % pages.length) + 1;
      carouselRef.current.snapToItem(newActiveSlide - 1);
      setActiveSlide(newActiveSlide);
    }
  };
  const handlePrevPress = () => {
    if (carouselRef.current) {
      const newActiveSlide = (activeSlide - 2 + pages.length) % pages.length + 1;
      carouselRef.current.snapToItem(newActiveSlide - 1);
      setActiveSlide(newActiveSlide );
    }
  };
  const handleSnapToItem = (index: number) => {
    setActiveSlide(index);
  };
  function renderItem({item}: any) {
    const year = item.inDate.split('.')[0];
    const month = item.inDate.split('.')[1];
    return (
      <View style={[styles.carouselWrapper]}>
        <View>
          <Image style={[styles.mainImage,{width:"100%"}]} source={{uri: item.image}} />
        </View>
        <View style={{padding: 5}}>
          <Typography fontSize={13} color='#6F6F6F' fontWeightIdx={2}>{item.address}</Typography>
          <Typography
           fontSize={14}
           color="#333"
           fontWeightIdx={1}
           marginBottom={4}>
            {item.name}
          </Typography>
          <View style={styles.inDateArea}>
            <Text style={styles.inDateBtn}>입주시기</Text>
            <Typography fontSize={14} color="#333" fontWeightIdx={1} >
              {`${year}년 ${month}월`}
            </Typography>
          </View>
          
        </View>
      </View>
    );
  }
 
  return (
    <View style={{ flex:1 }}>
      <View style={styles.p_horizon_24}>
        <Typography fontSize={20} fontWeightIdx={0} marginBottom={16}>신규 준공 아파트</Typography>
      </View>
      <Carousel
        ref={carouselRef}
        data={pages}
        vertical={undefined}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth - 70}
        layout="default"
        loop
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
    flexDirection:'column',
    gap: 8,
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
