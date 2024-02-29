import React, {useState,useEffect,useCallback} from 'react';
import { View, TouchableOpacity, FlatList, Image, Modal,Dimensions,Text} from 'react-native';
import { StyleSheet } from 'react-native';
import MainImageURL from '../../MainImageURL';
import FavoritedAptList from '../Home/HomeComponents/FavoritedAptList';
import { Typography } from '../Components/Typography';
import SimpleLineIcons  from 'react-native-vector-icons/SimpleLineIcons'

const screenWidth = Dimensions.get('window').width;

export default function SearchRecommendations(props: any) {

  const dummyData = [{image: require('../images/home/recommendImage.png')},{image: require('../images/home/recommendImage.png')}]
  function renderItem({item}: any) {
   return (
      <View style={styles.carouselWrapper}>
        <Image style={{ width:"100%", height:'100%', resizeMode:'cover', borderRadius:10}} source={item.image} alt="모델하우스 이미지"/>
      </View>
     );
   }

  return (
    <View>
      {/* 대구 조회 급상승 단지 */}
      <FavoritedAptList asyncGetData={props.asyncGetData} navigation={props.navigation}/>

      {/* 광고 */}
      <View style={{paddingHorizontal:10, marginVertical:10}}>
        <FlatList
          horizontal
          data={dummyData}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false} 
        />
      </View>

      
      {/* 추천 매물 */}
      <View style={styles.section}>
      <View style={{flexDirection:'row', alignItems:'center', marginBottom:10}}>
        <Image source={require('../images/home/magnifyGlass.png')} style={{width:20, marginRight:10}}/>
        <Typography>이 단지 어떠세요?</Typography>
      </View>
      { 
        props.aptlist?.slice(0,5).map((item:any ,idx:any) => {

           return (
              <TouchableOpacity key={idx}
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
                <View style={styles.card}>
                  <Image style={styles.brandImage} source={{uri: `${MainImageURL}/appimages/buildings/${item.aptKey}/default/mainimage.png`}}
                    alt="힐스테이트" resizeMode='cover'/>
                  <View style={styles.textArea}>
                    <Typography fontSize={12} fontWeightIdx={2} color='#8B8B8B' marginBottom={1}>{item.addressCity} {item.addressCounty}</Typography>
                    <Typography fontSize={14} fontWeightIdx={1} color='#333' marginBottom={3}>{item.aptName}</Typography>
                    <View style={styles.brandPrice}>
                      <Typography fontSize={14} fontWeightIdx={2} color='#333'>{item.houseHoldSum}세대 ・ {item.inDate}입주</Typography>
                    </View>
                  </View>
                  <SimpleLineIcons name="arrow-right" size={16} color="#BBB" />  
                </View>
                {/* {brandAptDummy?.length !== idx+1 && <Divider height={2} marginVertical={16}/>} */}
              </TouchableOpacity>)
            }
          )
        }
        </View>
      
    </View> 
  )
}



export const styles = StyleSheet.create({
  section : {
    padding: 20
  },
  carouselWrapper: {
    width: screenWidth - 100, 
    height: 80,
    marginHorizontal: 10,
    borderRadius:10,
  },
  card:{
    flexDirection:'row',
    justifyContent :'space-between',
    alignItems:'center',
    marginVertical:10
  },
  brandImage:{
    height:95,
    width:95,
    resizeMode:'cover',
    borderRadius:10,
    marginRight:20
  },
  textArea:{
    flex:1
  },
  brandPrice:{
    flexDirection:'row',
    alignItems:'center',
    gap: 4, 
  },

}) 