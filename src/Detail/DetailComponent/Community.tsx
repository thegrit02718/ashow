import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { Typography } from '../../Components/Typography';
import { Divider } from '../../Components/Divider';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import Swiper from 'react-native-swiper'
import MainImageURL from "../../../MainImageURL";

export default function Community (props: any) {

  const communityData = props.community ? JSON.parse(props.community) : null;
  const communityImagesData = props.communityImages ? JSON.parse(props.communityImages) : null;
  
  const [community, setCommunity] = useState<any>([]);
 
  const handleCommunityData = async (communitylist: any) => {
    if (!communitylist) return;
    const uniqueLocations = [...new Set(communitylist.map((e: any) => e.location))];
    const promises = await uniqueLocations.map(location => {
      const dataCopy = communitylist.filter((item: any) => item.location === location);
      return dataCopy; // 'data' 속성을 제외하고 배열만 반환
    });
    setCommunity(promises);
  };

  useEffect(() => {
    handleCommunityData(communityData);
  }, []);

  const [communityButton, setCommunityButton] = useState(Array(community.length).fill(false));  
  const handleCommunityButton = (index:number) => {
    const copy = [...communityButton]
    copy[index] = !copy[index];
    setCommunityButton(copy);
  };
  
  interface CommunityProps {
    name : string;
    notice : string;
  }
  const CommunityBox: React.FC<CommunityProps> = ({ name, notice}) => {
    return (
      <View style={{paddingVertical:10, flexDirection:'row'}}>
        <View style={{width:'5%', alignItems:'center'}}>
          <View style={{width:2, height:15, backgroundColor:'#F0A3A1'}}></View>
        </View>
        <View style={{width:'95%'}}>
          <Typography fontSize={14} marginBottom={10}>{name}</Typography>
          <View style={{flexWrap:'wrap', flexDirection:'row', justifyContent:'space-between'}}>
            <Typography fontSize={12} color='#8B8B8B' marginBottom={5}>{notice}</Typography>
          </View>
        </View>
      </View>
    )    
  };


  return (
    <View style={styles.container}>
      <View style={styles.sectionTitle}>
        <Image source={require('../../images/buildings/titleImage6.png')} style={styles.sectionTitleImage}/>
        <Typography fontSize={20}>커뮤니티 시설</Typography>  
      </View>
      <View style={{height: 200, marginTop: 10, marginBottom:30}}>
        <Swiper 
          showsButtons={true}
          showsPagination={true}
          paginationStyle={{position:'absolute', bottom:-15}}
          buttonWrapperStyle={{display:'none'}}
          activeDot={
            <View
              style={{
                backgroundColor: '#E8726E',
                width: 25,
                height: 5,
                marginTop: 3,
                marginBottom: 3,
                marginHorizontal:3,
                borderRadius: 5
              }}
            />
          }
          dot={
            <View
              style={{
                backgroundColor: '#F0A3A1',
                opacity:0.3,
                width: 25,
                height: 5,
                marginTop: 3,
                marginBottom: 3,
                marginHorizontal:3,
                borderRadius: 5
              }}
            />
          }
        > 
          {
          communityImagesData.map((item:any, index:any)=>{
            return (
              <View key={index}>
                <Image source={{uri: `${MainImageURL}/appimages/buildings/${props.aptKey}/default/${item}`}} style={styles.communityImage}/>
                <TouchableOpacity 
                  style={{position:'absolute', right:0, top:0}}
                  onPress={() => {
                    props.navigation.navigate('CommunityImageDetail', 
                    { aptKey : props.aptKey, imageFiles : item });
                  }}
                >
                  <View style={[styles.selectBox, {width: 40, marginLeft: 10, alignItems: 'center', justifyContent: 'center'}]}>
                    <Image source={require('../../images/buildings/magnifyGlass.png')} style={{width: '90%', resizeMode:'contain'}}/>
                  </View>
                </TouchableOpacity>
              </View>
            )
          }) 
          }
        </Swiper>
      </View>
      {
        community.map((item:any, index:any)=>{

          return(
            <View key={index}>
              <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={()=>{handleCommunityButton(index)}}
                >
                <View style={{flexDirection:'row', justifyContent:'space-between', paddingVertical:10}}>
                  <Typography>{item[0].location}</Typography>
                  
                    { !communityButton[index]
                      ? <AntDesign name="minus" size={20} color='#E8726E'/>
                      : <AntDesign name="plus" size={20} color='#E8726E'/>}
                </View>
              </TouchableOpacity>
              <Divider height={2} marginVertical={5}/>
              {
                !communityButton[index]
                ?
                item.map((item:any, index:any)=>{
                  return (
                    <CommunityBox name={item.name} notice={item.notice} key={index}/>
                  )
                })
                :
                null
              }
              <View style={{marginVertical:5}}></View>
            </View>
          )
        })
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sectionTitle: {
    flexDirection: 'row',
    height: 30,
    alignItems: 'center',
    marginVertical: 10
  },
  sectionTitleImage : {
    width: 24, 
    height: 16,
    marginRight: 10
  },
  selectBox: {
    height: 40,
    backgroundColor: '#fff',
    borderColor: '#DFDFDF',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 15,
  },
  communityImage : {
    width: '100%',
    height: '100%',
    borderRadius:10,
    resizeMode:'cover',
  },
});
