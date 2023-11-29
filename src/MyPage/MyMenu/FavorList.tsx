import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import { Typography } from '../../Components/Typography';
import Layout from '../../Components/Layout';
import { TouchableWithoutFeedback } from 'react-native';
import { Divider } from '../../Components/Divider';
import AsyncGetItem from '../../AsyncGetItem';
import { instance } from '../../api/baseApi';
import axios from 'axios';
import FormatNumber from '../../Components/FormatNumber';

type BuildingsProps = {
  addressCity: string;
  addressLocal: string;
  addressRest: string;
  name:string;
  inDate: string;
  aptKey: string;
  houseHoldSum: string;
  discountPer: number;
  priceLow: number;
}

export default function History (props : any) {
  const [buildingsInfo,setBuildingsInfo] = useState<BuildingsProps[]>([]);
  const getHistoryData = async() =>{
    try{
      const res = await instance.get('/buildings/buildings');
      console.log(res.data)
      setBuildingsInfo(res.data);
    }catch(err){
      console.log(err);
    }
  }

  useEffect(()=>{
    getHistoryData();
  },[])

  const dummyUserLikeList = {
    aptKey:[1,2,3,4]
  }
  
  return (
    <View style={styles.container}>
        <ScrollView>
          <Layout>
              <View style={{marginTop:16,marginBottom:25}}>
                <Typography fontSize={24} marginBottom={16}>관심 단지</Typography>
              { buildingsInfo && buildingsInfo.map((item,idx) => {
                
                  const filteredItem = dummyUserLikeList.aptKey.find(likes => {
                    return item.aptKey == String(likes)
                  });
              
                  if (filteredItem) {
                    return (
                      <View key={item.aptKey} style={styles.wrapper}>
                        <TouchableOpacity onPress={() => Alert.alert('클릭')}>
                          <View style={styles.contentBox}>
                            <View style={{width:200}}>
                              <View>
                                <Typography fontSize={12} color="#6F6F6F" fontWeight='normal'>{item.addressCity} {item.addressLocal} {item.addressRest}</Typography>
                              </View>
                              <Text style={styles.buildingName} numberOfLines={2} ellipsizeMode='tail'>{item.name}</Text>
                              <Typography fontSize={14} color='#555' fontWeight='normal'>{item.houseHoldSum}세대 • {item.inDate} 입주</Typography>
                            </View>
                            <View style={styles.contentTitle}>
                              <Typography fontSize={12} color='#E5625D'>29평 · 77㎡</Typography>
                            </View>
                            <View style={styles.flexEnd}>
                              <View style={styles.discountBox}>
                                <Typography fontSize={13} color='#E5625D' fontWeight='normal' marginBottom={1}>{item.discountPer}% 할인</Typography>
                              </View>
                              <Typography fontSize={18}>{FormatNumber(item.priceLow)}</Typography>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    );
                  }
                })
              }
            </View>
          </Layout>
        </ScrollView>
      </View>
    
   );
}


const styles = StyleSheet.create({
  wrapper:{
    marginVertical:18
  },
  container: {
    flex: 1,
    backgroundColor:"#fff",
    justifyContent:"space-between"
  },
  contentBox:{
    flexDirection:"row",
    alignItems:"flex-end",
    justifyContent:"space-between",
    position:"relative",
    borderWidth:1,
    borderColor:"#EFEFEF",
    paddingVertical:16,
    paddingHorizontal:12,
    borderRadius:3,
  },
  contentTitle:{                       
    position:"absolute",
    top:-17,
    left: 15,
    paddingVertical:5,
    paddingHorizontal:10,
    backgroundColor:"#fff",
    
  },
  buildingName: {
    fontWeight:"600",
    color:"#000",
    marginBottom:3,
    letterSpacing:1,
    marginLeft:-1
  },
  flexEnd:{
    alignItems:'flex-end'
  }, 
  
 confirmButton:{
    backgroundColor: "#E8726E",
    borderRadius:16,
    paddingVertical:18,
    paddingHorizontal:25,
    marginBottom:20,
    alignItems:"center"
  
 },
 discountBox:{
    backgroundColor:"rgba(232, 114, 110, 0.10)",
    borderRadius:4, 
    paddingVertical:2,
    paddingHorizontal:4,
    lineHeight:18,
   
 },

});

