import React,{ useState, useRef, useCallback} from 'react'
import { View,Image, StyleSheet, Alert, ImageBackground, Dimensions, TouchableOpacity, Linking} from 'react-native';
import { Typography } from '../../Components/Typography';
import Swiper from 'react-native-swiper'
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Link } from '@react-navigation/native';
import MainImageURL from '../../../MainImageURL';

export default function YoutubeBox () {
  
  const screenWidth = Dimensions.get('window').width;
  const youtubeWidth = screenWidth * 85 / 100;
  const youtubeHeight = youtubeWidth * 0.58


  const youtubeData = [
    { id:1,
      videoId: "tyrIUQYSZbk",
      title : "힐스테이트 동인 센트럴 아파트 상가..",
      date : "2024년 1월 10일"
    },
    { id:2,
      videoId: "nYFgiwQHT_g",
      title : "반값 파격 분양! 절대 놓치지 마세요",
      date : "2024년 1월 12일"
    },
    { id:3,
      videoId: "wVrx5cVdNt4",
      title : "대구 분양아파트 인기TOP10",
      date : "2023년 10월 6일"
    },     
  ]

  return (
    <View style={{ height:550 }}>
        <ImageBackground 
          source={require("../../images/home/youtubeBox.png")}
          style={{width:"100%",height:550}}>

        <View style={{height:100, alignItems:'center', justifyContent:'center'}}>
          <Typography fontSize={24} color='#fff'>ASHOW TV</Typography>
          <Typography fontSize={14} color='#fff' fontWeightIdx={2}>아쇼TV에 대한 간단한 설명</Typography>
        </View>
        
        <View style={{height:450}}>
          <Swiper 
            showsButtons={true}
            showsPagination={true}
            buttonWrapperStyle={{display:'none'}}
            activeDot={
              <View
                style={{
                  backgroundColor: '#fff',
                  width: 30,
                  height: 10,
                  borderRadius:5,
                  marginTop: 3,
                  marginBottom: 3,
                  marginHorizontal:5
                }}
              />
            }
            dot={
              <View
                style={{
                  backgroundColor: '#BDBDBD',
                  opacity:0.6,
                  width: 10,
                  height: 10,
                  borderRadius:5,
                  marginTop: 3,
                  marginBottom: 3,
                  marginHorizontal:5
                }}
              />
            }
          > 
          {
            youtubeData.map((item:any, index:any)=>{
              return (
                <TouchableOpacity
                  activeOpacity={0.9}
                  style={styles.container} key={index}
                  onPress={()=>{Linking.openURL('https://m.youtube.com/@TV-yy6ko');}}
                >
                    <Image
                      source={require("../../images/home/youtubeCover.png")}
                      style={{width:youtubeWidth, height:youtubeWidth*13.2/10, position:'absolute', top:0}}/>
                    <Image source={{uri: `${MainImageURL}/appimages/home/youtube1.png`}}
                                style={{width:youtubeWidth, height:youtubeHeight, resizeMode:'cover', borderRadius:25, marginTop:70 }}/>
                    <View style={{width:'100%', height:70, alignItems:'center', flexDirection:'row', justifyContent:'center'}}>
                      <View style={{width:40, height:40, borderWidth:1, borderColor:"#fff", borderRadius:25, overflow:'hidden',
                                    backgroundColor:"#EE5D6D", alignItems:'center', justifyContent:'center'
                                }}>
                        <Image  source={require("../../images/mainlogomini.png")}
                                style={{width:30,height:30, resizeMode:'cover', borderRadius:25}}/>
                      </View>
                      <View style={{marginLeft:10}}>
                        <Typography fontSize={14} marginBottom={3}>{item.title}</Typography>
                        <Typography fontSize={12} fontWeightIdx={2}>{item.date}</Typography>
                      </View>
                    </View>
                </TouchableOpacity>
              )
            }) 
          }
          </Swiper>
        </View>

        {/* <View style={{height:50, alignItems:'center', justifyContent:'center'}}>
          <TouchableOpacity 
            activeOpacity={0.9}
            style={{padding:10, backgroundColor:'#fff', alignItems:'center', flexDirection:'row', justifyContent:'center', borderRadius:10}}
            onPress={()=>{Linking.openURL('https://m.youtube.com/@TV-yy6ko');}}
          >
            <Typography fontSize={14} color='#F15566'>아쇼채널 보러가기</Typography>
            <AntDesign name='right' color='#F15566' size={12} style={{marginLeft:3}} />
          </TouchableOpacity>
        </View> */}
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems:'center',
    justifyContent:'center',
  }
})