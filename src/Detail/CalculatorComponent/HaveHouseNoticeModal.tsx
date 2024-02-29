import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { Typography } from '../../Components/Typography';

export default function HaveHouseNoticeModal (props : any) {
  
  return (
    <View style={{ width: '100%', position: 'absolute', bottom:0, borderRadius: 20, backgroundColor: 'white', padding: 20 }}>
      <View style={{flexDirection:'row', alignItems: 'center', justifyContent:'space-between'}}>
        <Typography>세금 - 1가구 무주택자가 1주택 구매시 기준</Typography>
        <TouchableOpacity onPress={props.HaveHouseNoticeToggleModal} style={{padding:5}}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <View style={{padding:10}}>
        <View style={{flexDirection:'row', marginVertical:5}}>
          <View style={{width:20, height:20, alignItems: 'center', justifyContent: 'center'}}>
            <Entypo name="dot-single" size={15} color="black" />
          </View>
          <View style={{width:'95%',}}>
            <Typography fontWeightIdx={2}>세금은 개인별 주택 보유수와 생애 최초 주택 구매 여부에 따라 취득세 감면 등 상이할 수 있습니다.</Typography>
          </View>
        </View>
        <View style={{flexDirection:'row', marginVertical:5}}>
          <View style={{width:20, height:20, alignItems: 'center', justifyContent: 'center'}}>
            <Entypo name="dot-single" size={15} color="black" />
          </View>
          <View style={{width:'95%',}}>
            <Typography fontWeightIdx={2}>조정 대상 지역 등 규제지역에 따라 세금이 달라질 수 있습니다.</Typography>
          </View>
        </View>
        <View style={{flexDirection:'row', marginVertical:5}}>
          <View style={{width:20, height:20, alignItems: 'center', justifyContent: 'center'}}>
            <Entypo name="dot-single" size={15} color="black" />
          </View>
          <View style={{width:'95%',}}>
            <Typography fontWeightIdx={2}>주택 수에 따라 변동되는 세율은 자금 스케줄 상세 내역에서 확인하실 수 있습니다.</Typography>
          </View>
        </View>


     
        
        
      
      
      </View>


    </View>
  )
    
};


const styles = StyleSheet.create({
  textBox: {
    flex: 1,
    paddingHorizontal: 15,
    flexDirection: 'row', 
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10
  },
  HaveHouseNoticeSelectBox : {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 20,
    borderWidth: 1,
    borderColor : '#DFDFDF',
    borderRadius: 15
  },
  HaveHouseNoticeSelectTextRow : {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    padding: 15,
    backgroundColor : '#F5F4F3',
    borderRadius: 10,
    marginVertical: 7
  },

})