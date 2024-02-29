import React,{ useState, useRef} from 'react'
import { View,Image, StyleSheet, Text, Dimensions } from 'react-native';
import { Typography } from '../../Components/Typography';
import Swiper from 'react-native-swiper'


export default function MainBannerCarousel( ) {

  const dummyData = [
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBRVP2YzORc4OpXntasvKFx5JLqtMEE1yoA&usqp=CAU',
      page : '1',
      notice : '이제, 아파트도 혜택받고 쇼핑하자!',
      subNotice: '기본 할인부터 아쇼에서 준비한 특별혜택까지'
    },
     { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBRVP2YzORc4OpXntasvKFx5JLqtMEE1yoA&usqp=CAU',
      page : '2',
      notice : '아파트 쇼핑은 아쇼에서!',
      subNotice: '누구나 알기 쉬운 분양 정보'
    },
    { image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTsBRVP2YzORc4OpXntasvKFx5JLqtMEE1yoA&usqp=CAU',
      page : '3',
      notice : '부동산 가이드를 활용하세요!',
      subNotice: '부동산 용어와 구매 과정 까지'
    },
  ]

  return (
    <View style={{ flex:1, position:'relative'}}>
      <Swiper 
        showsButtons={true}
        showsPagination={true}
        buttonWrapperStyle={{display:'none'}}
        activeDot={
          <View
            style={{
              backgroundColor: '#8B8B8B',
              width: 80,
              height: 5,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
        dot={
          <View
            style={{
              backgroundColor: '#BDBDBD',
              width: 80,
              height: 5,
              marginTop: 3,
              marginBottom: 3
            }}
          />
        }
      > 
        {
         dummyData.map((item:any, index:any)=>{
          return (
            <View style={styles.carouselWrapper} key={index}>
              <Image style={styles.image} source={{uri:item.image}} alt="배너 이미지" resizeMode='cover'/>
              <View style={styles.contentBox}>
                <View style={styles.pagination}>
                  <Typography fontSize={12} color='#6F6F6F'>{item.page}</Typography>
                  <Typography fontSize={12} color='#6F6F6F'>/</Typography>
                  <Typography fontSize={12} color='#6F6F6F'>{dummyData.length}</Typography>
                </View>
                <View>
                  <Typography fontSize={24} fontWeightIdx={0} color='#1B1B1B' marginBottom={6}>{item.notice}</Typography>
                  <Typography fontSize={14} fontWeightIdx={1} color='#1B1B1B'>{item.subNotice}</Typography>
                </View>
              </View>
            </View>
          )
         }) 
        }
      </Swiper>
    </View>
  )
}

const styles = StyleSheet.create({
  carouselWrapper: {
    width:"100%",
    height:"100%",
    paddingBottom:5,
  },
  image:{
    width:"100%",
    height:"100%",
  },
  contentBox:{
    position:'absolute',
    left:0,
    bottom: 50,
    backgroundColor:'rgba(0,0,0,0.0)',
    padding:24,
    justifyContent:'flex-end',
    zIndex:3,
    pointerEvents: 'none',
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
  dotConatainer:{
    position:'absolute',
    height:10,
    bottom:20,
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center'
  },
  dotPagination:{
    backgroundColor:'#D9D9D9',
    width:'80%',
    height:5,
    flexDirection:'row',
    alignItems:'flex-start',
    justifyContent:'flex-start'
  },
  dot:{
    height:5,
    backgroundColor:"#8B8B8B"
  }
})