import React,{useState, useRef} from 'react'
import { View,Image, StyleSheet } from 'react-native';
import Carousel,{Pagination} from 'react-native-snap-carousel';
import {Dimensions} from 'react-native';
import { Typography } from '../Typography';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';

function MainBannerCarousel( ) {
  const horizontalMargin = 30;
  const sliderWidth = Dimensions.get('window').width;
  const itemWidth = sliderWidth - horizontalMargin / 2;
 
  const [activeSlide, setActiveSlide] = useState(1);
  const handleSnapToItem = (index: number) => {
    setActiveSlide(index+1);
  };
  const dummyData = [
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBRVP2YzORc4OpXntasvKFx5JLqtMEE1yoA&usqp=CAU'
    },
     { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBRVP2YzORc4OpXntasvKFx5JLqtMEE1yoA&usqp=CAU'
    },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBRVP2YzORc4OpXntasvKFx5JLqtMEE1yoA&usqp=CAU'
    },
  ]
  function renderItem({item}: any) {
    return (
        <View style={styles.carouselWrapper}>
          <Image style={styles.image} source={{uri:item.image}} alt="배너 이미지" resizeMode='cover'/>
        </View>
      );
  }
  return (
    <View style={{ flex:1, position:'relative'}}>
      <View style={styles.contentBox}>
        <View style={styles.pagination}>
          <Typography fontSize={12} color='#6F6F6F'>{activeSlide}</Typography>
          <Typography fontSize={12} color='#6F6F6F'>/</Typography>
          <Typography fontSize={12} color='#6F6F6F'>{dummyData.length}</Typography>
        </View>
        <View>
          <Typography fontSize={24} fontWeightIdx={0} color='#1B1B1B'>이제,</Typography>
          <Typography fontSize={24} fontWeightIdx={0} color='#1B1B1B' marginBottom={6}>아파트도 혜택받고 쇼핑하자!</Typography>
          <Typography fontSize={14} fontWeightIdx={1} color='#1B1B1B'>기본 할인부터 아쇼에서 준비한 특별혜택까지</Typography>
        </View>
        <View style={[styles.dotPagination, {width: sliderWidth - 48}]}>
          {dummyData.map((_,idx)=>{
            return(
             <View style={[styles.dotConatainer, ]}>
              <View style={[styles.dot, activeSlide-1 == idx ? styles.active : {}, {width: (sliderWidth - 48) / dummyData.length }]} /> 
             </View>
           )
          })}
         </View>
      </View>
      <Carousel
        data={dummyData}
        vertical={undefined}
        renderItem={renderItem}
        sliderWidth={sliderWidth}
        itemWidth={itemWidth + 15}
        loop
        layout="default"
        activeSlideAlignment='center'
        onSnapToItem={handleSnapToItem}
      />
    </View>
  )
}

export default MainBannerCarousel

const styles = StyleSheet.create({
  carouselWrapper: {
    width: "100%", 
    paddingBottom:5,
 
  },
  image:{
    width:"100%",
    height:"100%",
  },
  pagination:{
    flexDirection:'row',
    gap: 1,
    width: 40,
    paddingHorizontal:12,
    paddingVertical:2,
    backgroundColor:"#DFDFDF",
    justifyContent:'center',
    borderRadius:22,
    marginBottom:10,
  },
  dotPagination:{
    flexDirection:'row',
 
    
 
  },
  dotConatainer:{
    backgroundColor:'#D9D9D9',
    height:4,
    marginTop: 28,
    marginBottom:5,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start'
   
  },
  dot:{
    
    height:4,
    borderRadius:3,
  },
  active:{
    backgroundColor:"#8B8B8B"
  },
  contentBox:{
    position:'absolute',
    top:0,
    left:0,
    height:'100%',
    width:"100%",
    backgroundColor:'rgba(0,0,0,0.0)',
    padding:24,
    justifyContent:'flex-end',
    zIndex:3,
    pointerEvents: 'none'
  }
})